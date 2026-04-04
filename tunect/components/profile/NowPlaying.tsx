import { useEffect, useRef } from 'react'
import { View, Text, Image, StyleSheet, Animated } from 'react-native'
import { NowPlaying as NowPlayingType } from '@/lib/spotify'
import { colors } from '@/constants/Colors'

interface Props {
  nowPlaying: NowPlayingType | null
}

export function NowPlayingCard({ nowPlaying }: Props) {
  const pulse = useRef(new Animated.Value(1)).current

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.3, duration: 900, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    )
    if (nowPlaying?.is_playing) {
      anim.start()
    } else {
      anim.stop()
      pulse.setValue(1)
    }
    return () => anim.stop()
  }, [nowPlaying?.is_playing])

  if (!nowPlaying?.is_playing) {
    return (
      <View style={[styles.card, styles.empty]}>
        <Text style={styles.emptyText}>Nothing playing right now</Text>
      </View>
    )
  }

  const albumArt = nowPlaying.item?.album?.images?.[0]?.url
  const trackName = nowPlaying.item?.name ?? 'Unknown track'
  const artistName = nowPlaying.item?.artists?.[0]?.name ?? 'Unknown artist'

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.dot, { transform: [{ scale: pulse }] }]} />
      {albumArt
        ? <Image source={{ uri: albumArt }} style={styles.albumArt} />
        : <View style={styles.albumArtPlaceholder} />
      }
      <View style={styles.info}>
        <Text style={styles.track} numberOfLines={1}>{trackName}</Text>
        <Text style={styles.artist} numberOfLines={1}>{artistName}</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>♫</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgSurface,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.bgBorder,
    gap: 10,
  },
  empty: {
    justifyContent: 'center',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 13,
    fontStyle: 'italic',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  albumArt: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.bgElevated,
  },
  albumArtPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.bgElevated,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  track: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  artist: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  badge: {
    backgroundColor: colors.spotifyGreen + '22',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  badgeText: {
    color: colors.spotifyGreen,
    fontSize: 11,
    fontWeight: '700',
  },
})
