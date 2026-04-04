import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useMusicStore } from '@/stores/musicStore'
import { colors } from '@/constants/Colors'

export default function NowPlayingScreen() {
  const { nowPlaying } = useMusicStore()

  if (!nowPlaying?.is_playing) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>♪</Text>
          <Text style={styles.emptyTitle}>Nothing playing right now</Text>
          <Text style={styles.emptyBody}>Open Spotify or Apple Music and start listening</Text>
        </View>
      </SafeAreaView>
    )
  }

  const albumArt = nowPlaying.item?.album?.images?.[0]?.url
  const trackName = nowPlaying.item?.name
  const artistName = nowPlaying.item?.artists?.[0]?.name
  const albumName = nowPlaying.item?.album?.name
  const progress = nowPlaying.progress_ms

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Album art */}
        <View style={styles.artContainer}>
          <View style={styles.artGlow} />
          {albumArt
            ? <Image source={{ uri: albumArt }} style={styles.art} />
            : <View style={[styles.art, styles.artFallback]}>
                <Text style={styles.artFallbackText}>♪</Text>
              </View>
          }
        </View>

        {/* Track info */}
        <View style={styles.info}>
          <Text style={styles.track} numberOfLines={2}>{trackName}</Text>
          <Text style={styles.artist}>{artistName}</Text>
          <Text style={styles.album} numberOfLines={1}>{albumName}</Text>
        </View>

        {/* Progress bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '40%' }]} />
        </View>

        {/* Platform badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Playing on Spotify</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bgBase },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyIcon: { fontSize: 48, marginBottom: 8 },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  emptyBody: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 40,
    gap: 24,
  },
  artContainer: { position: 'relative', marginBottom: 8 },
  artGlow: {
    position: 'absolute',
    inset: -20,
    backgroundColor: colors.primary,
    borderRadius: 30,
    opacity: 0.2,
    transform: [{ scale: 1.1 }],
  },
  art: {
    width: 260,
    height: 260,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 16,
  },
  artFallback: {
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderColor: colors.bgBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artFallbackText: { fontSize: 64 },
  info: { alignItems: 'center', gap: 6, width: '100%' },
  track: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  artist: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
  album: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
  },
  progressTrack: {
    width: '100%',
    height: 3,
    backgroundColor: colors.bgBorder,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  badge: {
    backgroundColor: colors.spotifyGreen + '18',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: colors.spotifyGreen + '30',
  },
  badgeText: { color: colors.spotifyGreen, fontSize: 13, fontWeight: '600' },
})
