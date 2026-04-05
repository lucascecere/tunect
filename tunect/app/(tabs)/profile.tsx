import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NowPlayingCard } from '@/components/music/NowPlayingCard'
import { MusicPersonalityCard } from '@/components/music/MusicPersonalityCard'
import { ArtistRow } from '@/components/profile/ArtistRow'
import { TrackRow } from '@/components/profile/TrackRow'
import { colors } from '@/constants/Colors'
import { layout } from '@/constants/layout'

type Timeframe = 'Week' | 'Month' | 'All time'
const TIMEFRAMES: Timeframe[] = ['Week', 'Month', 'All time']

const mockProfile = {
  displayName: 'Jamie M.',
  username: 'jamiem',
  bio: 'music is how i process everything',
  personalityLabel: 'Indie Nocturnal',
  nowPlaying: {
    track: 'Mardy Boo',
    artist: 'Arctic Monkeys',
    albumArt: 'https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526',
    platform: 'spotify' as const,
  },
  topArtists: [
    { name: 'Arctic Monkeys', image: 'https://i.scdn.co/image/ab6761610000e5ebb27cedad6b515a5f020b4b6a' },
    { name: 'The 1975', image: 'https://i.scdn.co/image/ab6761610000e5eb4696c75d74a0e3dcb283b76e' },
    { name: 'Frank Ocean', image: 'https://i.scdn.co/image/ab6761610000e5eb040ed8c8a5e47e6cf7e79a8b' },
    { name: 'Clairo', image: 'https://i.scdn.co/image/ab6761610000e5eb7de8048f4cb7fe32cc9f1c98' },
    { name: 'Rex Orange County', image: 'https://i.scdn.co/image/ab6761610000e5eb7de8048f4cb7fe32cc9f1c98' },
  ],
  topTracks: [
    { name: '505', artist: 'Arctic Monkeys', albumArt: 'https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526' },
    { name: 'Somebody Else', artist: 'The 1975', albumArt: 'https://i.scdn.co/image/ab67616d0000b27360cfb200118c95e6f0dae2b9' },
    { name: 'Bags', artist: 'Clairo', albumArt: 'https://i.scdn.co/image/ab67616d0000b2730d98a0ae7c78a3a9babaf8af' },
    { name: 'Pyramids', artist: 'Frank Ocean', albumArt: 'https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526' },
    { name: 'Loving Is Easy', artist: 'Rex Orange County', albumArt: 'https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526' },
  ],
  genres: [
    { name: 'Indie Rock', percentage: 68 },
    { name: 'R&B', percentage: 42 },
    { name: 'Electronic', percentage: 26 },
    { name: 'Pop', percentage: 18 },
  ],
}

export default function ProfileScreen() {
  const [timeframe, setTimeframe] = useState<Timeframe>('Month')

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.wordmark}>tunect</Text>
            <Text style={styles.settingsIcon}>⚙</Text>
          </View>

          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarLetter}>
                {mockProfile.displayName[0].toUpperCase()}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.displayName}>{mockProfile.displayName}</Text>
              <Text style={styles.username}>@{mockProfile.username}</Text>
              <Text style={styles.bio}>{mockProfile.bio}</Text>
            </View>
            <View style={styles.editBtn}>
              <Text style={styles.editBtnText}>Edit</Text>
            </View>
          </View>
        </View>

        {/* ── Now Playing ── */}
        <View style={styles.section}>
          <NowPlayingCard nowPlaying={mockProfile.nowPlaying} />
        </View>

        {/* ── Timeframe toggle ── */}
        <View style={styles.timeframeRow}>
          {TIMEFRAMES.map((t) => (
            <Pressable
              key={t}
              style={[styles.pill, timeframe === t && styles.pillActive]}
              onPress={() => setTimeframe(t)}
            >
              <Text style={[styles.pillText, timeframe === t && styles.pillTextActive]}>
                {t}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* ── Top Artists ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Artists</Text>
          {mockProfile.topArtists.map((a, i) => (
            <ArtistRow key={a.name} name={a.name} image={a.image} rank={i + 1} />
          ))}
        </View>

        {/* ── Top Tracks ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Tracks</Text>
          {mockProfile.topTracks.map((t, i) => (
            <TrackRow key={t.name} name={t.name} artist={t.artist} albumArt={t.albumArt} rank={i + 1} />
          ))}
        </View>

        {/* ── Music Personality ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Music Personality</Text>
          <MusicPersonalityCard
            label={mockProfile.personalityLabel}
            genres={mockProfile.genres}
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBase },
  scroll: { flex: 1 },
  content: { paddingBottom: 20 },

  // Header
  header: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: 12,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.bgBorder,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  wordmark: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  settingsIcon: { fontSize: 18, color: colors.textMuted },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  avatar: {
    width: layout.avatarSizes.xl,
    height: layout.avatarSizes.xl,
    borderRadius: layout.avatarSizes.xl / 2,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '700',
  },
  profileInfo: { flex: 1, gap: 3 },
  displayName: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  username: { color: colors.textSecondary, fontSize: 14 },
  bio: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4,
    fontStyle: 'italic',
  },
  editBtn: {
    borderWidth: 1,
    borderColor: colors.bgBorder,
    borderRadius: layout.pillRadius,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  editBtnText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },

  // Timeframe
  timeframeRow: {
    flexDirection: 'row',
    paddingHorizontal: layout.screenPadding,
    paddingTop: 20,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: layout.pillRadius,
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderColor: colors.bgBorder,
  },
  pillActive: {
    backgroundColor: colors.primaryGhost,
    borderColor: colors.primary,
  },
  pillText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  pillTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },

  // Section
  section: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: 24,
    gap: 14,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
})
