-- =============================================
-- Tunect Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Users ──────────────────────────────────────────────────────────────
create table public.users (
  id            uuid primary key default gen_random_uuid(),
  spotify_id    text unique,
  email         text unique,
  display_name  text,
  username      text unique,
  avatar_url    text,
  bio           text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table public.users enable row level security;

create policy "Users can read any profile"
  on public.users for select using (true);

create policy "Users can update own profile"
  on public.users for update using (auth.uid() = id);

-- ── Spotify tokens (server-side only via Edge Function) ────────────────
create table public.spotify_tokens (
  user_id       uuid primary key references public.users(id) on delete cascade,
  access_token  text not null,
  refresh_token text not null,
  expires_at    timestamptz not null,
  scope         text,
  updated_at    timestamptz default now()
);

-- Only accessible via service role (Edge Functions) — no RLS public access
alter table public.spotify_tokens enable row level security;

create policy "Users can read own tokens"
  on public.spotify_tokens for select using (auth.uid() = user_id);

-- ── Music data snapshots ───────────────────────────────────────────────
create table public.user_music_data (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references public.users(id) on delete cascade,
  timeframe   text not null check (timeframe in ('short_term','medium_term','long_term')),
  top_artists jsonb,
  top_tracks  jsonb,
  top_genres  jsonb,
  synced_at   timestamptz default now(),
  unique(user_id, timeframe)
);

alter table public.user_music_data enable row level security;

create policy "Users can read any music data"
  on public.user_music_data for select using (true);

create policy "Users can upsert own music data"
  on public.user_music_data for insert with check (auth.uid() = user_id);

create policy "Users can update own music data"
  on public.user_music_data for update using (auth.uid() = user_id);

-- ── Now playing (real-time) ────────────────────────────────────────────
create table public.now_playing (
  user_id     uuid primary key references public.users(id) on delete cascade,
  track_name  text,
  artist_name text,
  album_name  text,
  album_art   text,
  is_playing  boolean default false,
  updated_at  timestamptz default now()
);

alter table public.now_playing enable row level security;

create policy "Anyone can read now playing"
  on public.now_playing for select using (true);

create policy "Users can update own now playing"
  on public.now_playing for all using (auth.uid() = user_id);

-- ── Compatibility scores ───────────────────────────────────────────────
create table public.compatibility_scores (
  id           uuid primary key default gen_random_uuid(),
  user_a       uuid references public.users(id) on delete cascade,
  user_b       uuid references public.users(id) on delete cascade,
  score        integer not null check (score >= 0 and score <= 100),
  breakdown    jsonb,
  calculated_at timestamptz default now(),
  unique(user_a, user_b),
  check (user_a < user_b)  -- enforce canonical ordering
);

alter table public.compatibility_scores enable row level security;

create policy "Users can read scores involving them"
  on public.compatibility_scores for select
  using (auth.uid() = user_a or auth.uid() = user_b);

-- ── Connections (follow + connect) ────────────────────────────────────
create table public.connections (
  id           uuid primary key default gen_random_uuid(),
  follower_id  uuid references public.users(id) on delete cascade,
  following_id uuid references public.users(id) on delete cascade,
  status       text not null default 'following'
                 check (status in ('following', 'connect_requested', 'connected')),
  created_at   timestamptz default now(),
  updated_at   timestamptz default now(),
  unique(follower_id, following_id)
);

alter table public.connections enable row level security;

create policy "Users can read connections involving them"
  on public.connections for select
  using (auth.uid() = follower_id or auth.uid() = following_id);

create policy "Users can manage own connections"
  on public.connections for all using (auth.uid() = follower_id);

-- ── Messages ──────────────────────────────────────────────────────────
create table public.conversations (
  id           uuid primary key default gen_random_uuid(),
  user_a       uuid references public.users(id) on delete cascade,
  user_b       uuid references public.users(id) on delete cascade,
  last_message text,
  last_message_at timestamptz,
  created_at   timestamptz default now(),
  unique(user_a, user_b),
  check (user_a < user_b)
);

alter table public.conversations enable row level security;

create policy "Users can read own conversations"
  on public.conversations for select
  using (auth.uid() = user_a or auth.uid() = user_b);

create table public.messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.conversations(id) on delete cascade,
  sender_id       uuid references public.users(id) on delete cascade,
  content         text not null,
  created_at      timestamptz default now()
);

alter table public.messages enable row level security;

create policy "Users can read messages in their conversations"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id
      and (c.user_a = auth.uid() or c.user_b = auth.uid())
    )
  );

create policy "Users can send messages"
  on public.messages for insert
  with check (auth.uid() = sender_id);

-- ── Enable Realtime on messages and now_playing ────────────────────────
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.now_playing;

-- ── Helper: get or create conversation between two users ──────────────
create or replace function get_or_create_conversation(user_id_a uuid, user_id_b uuid)
returns uuid language plpgsql security definer as $$
declare
  conv_id uuid;
  a uuid := least(user_id_a, user_id_b);
  b uuid := greatest(user_id_a, user_id_b);
begin
  select id into conv_id from public.conversations
  where user_a = a and user_b = b;

  if conv_id is null then
    insert into public.conversations (user_a, user_b)
    values (a, b)
    returning id into conv_id;
  end if;

  return conv_id;
end;
$$;
