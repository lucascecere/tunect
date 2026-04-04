import { useState, useEffect, useCallback } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, Pressable, RefreshControl, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useAuthStore } from '@/stores/authStore'
import { useMusicStore, Timeframe } from '@/stores/musicStore'
import { NowPlayingCard } from '@/components/profile/NowPlaying'
import { GenreBar } from '@/components/music/GenreBar'
import { colors } from '@/constants/Colors'
import { config } from '@/constants/config'

const TIMEFRAME_LABELS: { key: Timeframe; label: string }[] = [
  { key: 'short_term', label: 'Week' },
  { key: 'medium_term', label: 'Month' },
  { key: 'long_term', label: 'All time' },
]

export default function ProfileScreen() {
  const { user, spotifyConnected, signOut } = useAuthStore()
  const { topArtists, topTracks, nowPlaying, timeframe, personalityLabel, topGenres, loading, setTimeframe, syncMusic, pollNowPlaying } = useMusicStore()
  const [refreshing, setRefreshing] = useState(false)

  // Demo token — replace with real token from authStore when Supabase is wired
  const token = ''

  useEffect(() => {
    if (spotifyConnected && token) {
      syncMusic(token)
    }
  }, [timeframe, spotifyConnected])

  const onRefresh = useCallback(async () => {
    if (!token) return
    setRefreshing(true)
    await Promise.all([syncMusic(token), pollNowPlaying(token)])
    setRefreshing(false)
  }, [token])

  const displayName = user?.user_metadata?.display_name ?? user?.email?.split('@')[0] ?? 'You'
  const username = user?.user_metadata?.username ?? user?.email?.split('@')[0] ?? 'user'
  const avatarUrl = user?.user_metadata?.avatar_url

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.wordmark}>tunect</Text>
            <Pressable onPress={signOut} style={styles.settingsBtn}>
              <Text style={styles.settingsIcon}>⚙</Text>
            </Pressable>
          </View>

          <View style={styles.profileRow}>
            <View style={styles.avatarWrap}>
              {avatarUrl
                ? <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                : <View style={[styles.avatar, styles.avatarFallback]}>
                    <Text style={styles.avatarLetter}>{displayName[0]?.toUpperCase()}</Text>
                  </View>
              }
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.displayName}>{displayName}</Text>
              <Text style={styles.username}>@{username}</Text>
              <Text style={styles.bio}>Music is how I speak.</Text>
            </View>
            <Pressable style={styles.editBtn}>
              <Text style={styles.editBtnText}>Edit</Text>
            </Pressable>
          </View>
        </View>

        {/* ── Connect Spotify CTA (if not connected) ── */}
        {!spotifyConnected && (
          <Pressable
            style={styles.connectCard}
            onPress={() => router.push('/(auth)/connect-spotify')}
          >
            <Text style={styles.connectTitle}>Connect Spotify to bring your profile to life</Text>
            <Text style={styles.connectCta}>Connect now →</Text>
          </Pressable>
        )}

        {/* ── Now Playing ── */}
        {spotifyConnected && (
          <View style={styles.section}>
            <NowPlayingCard nowPlaying={nowPlaying} />
          </View>
        )}

        {/* ── Timeframe toggle ── */}
        {spotifyConnected && (
          <View style={styles.timeframeRow}>
            {TIMEFRAME_LABELS.map(({ key, label }) => (
              <Pressable
                key={key}
                style={[styles.timeframePill, timeframe === key && styles.timeframePillActive]}
                onPress={() => setTimeframe(key)}
              >
                <Text style={[styles.timeframeText, timeframe === key && styles.timeframeTextActive]}>
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* ── Top Artists ── */}
        {spotifyConnected && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Top Artists</Text>
            {loading
              ? <ActivityIndicator color={colors.primary} style={{ marginTop: 12 }} />
              : topArtists.length === 0
                ? <Text style={styles.emptyState}>Connect Spotify to see your top artists</Text>
                : topArtists.slice(0, config.profileDisplayLimit).map((artist, i) => (
                    <View key={artist.id} style={styles.artistRow}>
                      {artist.images?.[0]?.url
                        ? <Image source={{ uri: artist.images[0].url }} style={styles.artistThumb} />
                        : <View style={[styles.artistThumb, styles.thumbFallback]}>
                            <Text style={styles.thumbFallbackText}>{artist.name[0]}</Text>
                          </View>
                      }
                      <Text style={styles.artistName} numberOfLines={1}>{artist.name}</Text>
                      <Text style={styles.artistRank}>#{i + 1}</Text>
                    </View>
                  ))
            }
          </View>
        )}

        {/* ── Top Tracks ── */}
        {spotifyConnected && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Top Tracks</Text>
            {loading
              ? <ActivityIndicator color={colors.primary} style={{ marginTop: 12 }} />
              : topTracks.length === 0
                ? <Text style={styles.emptyState}>Connect Spotify to see your top tracks</Text>
                : topTracks.slice(0, config.profileDisplayLimit).map((track, i) => (
                    <View key={track.id} style={styles.trackRow}>
                      {track.album?.images?.[0]?.url
                        ? <Image source={{ uri: track.album.images[0].url }} style={styles.trackThumb} />
                        : <View style={[styles.trackThumb, styles.thumbFallback]}>
                            <Text style={styles.thumbFallbackText}>♪</Text>
                          </View>
                      }
                      <View style={styles.trackInfo}>
                        <Text style={styles.trackName} numberOfLines={1}>{track.name}</Text>
                        <Text style={styles.trackArtist} numberOfLines={1}>{track.artists[0]?.name}</Text>
                      </View>
                      <Text style={styles.trackRank}>#{i + 1}</Text>
                    </View>
                  ))
            }
          </View>
        )}

        {/* ── Music Personality ── */}
        {spotifyConnected && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Music Personality</Text>
            <View style={styles.personalityCard}>
              {personalityLabel
                ? <>
                    <Text style={styles.personalityLabel}>{personalityLabel}</Text>
                    {topGenres.length > 0 && <GenreBar genres={topGenres.slice(0, 3)} />}
                  </>
                : <Text style={styles.emptyState}>Sync your music to discover your personality</Text>
              }
            </View>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bgBase },
  scroll: { flex: 1 },
  content: { paddingBottom: 20 },

  // Header
  header: {
    paddingHorizontal: 20,
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
  settingsBtn: { padding: 4 },
  settingsIcon: { fontSize: 18, color: colors.textMuted },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  avatarWrap: {},
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },
  avatarFallback: {
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.bgBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    color: colors.textSecondary,
    fontSize: 26,
    fontWeight: '600',
  },
  profileInfo: { flex: 1, gap: 3 },
  displayName: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  username: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  bio: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4,
    fontStyle: 'italic',
  },
  editBtn: {
    borderWidth: 1,
    borderColor: colors.bgBorder,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  editBtnText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },

  // Connect card
  connectCard: {
    margin: 20,
    backgroundColor: colors.bgSurface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.primary + '40',
    gap: 8,
  },
  connectTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  connectCta: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },

  // Section
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 14,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  emptyState: {
    color: colors.textMuted,
    fontSize: 14,
    fontStyle: 'italic',
    paddingVertical: 8,
  },

  // Timeframe
  timeframeRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 8,
  },
  timeframePill: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderColor: colors.bgBorder,
  },
  timeframePillActive: {
    backgroundColor: colors.primaryGhost,
    borderColor: colors.primary,
  },
  timeframeText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  timeframeTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },

  // Artists
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  artistThumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
  },
  thumbFallback: {
    backgroundColor: colors.bgElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.bgBorder,
  },
  thumbFallbackText: {
    color: colors.textMuted,
    fontSize: 16,
    fontWeight: '600',
  },
  artistName: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '500',
  },
  artistRank: {
    color: colors.textMuted,
    fontSize: 12,
  },

  // Tracks
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  trackThumb: {
    width: 44,
    height: 44,
    borderRadius: 6,
  },
  trackInfo: { flex: 1, gap: 3 },
  trackName: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  trackArtist: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  trackRank: {
    color: colors.textMuted,
    fontSize: 12,
  },

  // Personality
  personalityCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.bgBorder,
    gap: 16,
  },
  personalityLabel: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
})
