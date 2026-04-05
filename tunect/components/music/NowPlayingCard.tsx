import { useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import { colors } from '@/constants/Colors'
import { layout } from '@/constants/layout'

export interface NowPlayingData {
  track: string
  artist: string
  albumArt: string
  platform: 'spotify' | 'apple'
}

interface Props {
  nowPlaying: NowPlayingData | null
}

export function NowPlayingCard({ nowPlaying }: Props) {
  const scale = useSharedValue(1)

  useEffect(() => {
    if (!nowPlaying) {
      scale.value = 1
      return
    }
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    )
  }, [nowPlaying])

  const dotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  if (!nowPlaying) return null

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.dot, dotStyle]} />
      <Image source={{ uri: nowPlaying.albumArt }} style={styles.albumArt} />
      <View style={styles.info}>
        <Text style={styles.track} numberOfLines={1}>{nowPlaying.track}</Text>
        <Text style={styles.artist} numberOfLines={1}>{nowPlaying.artist}</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {nowPlaying.platform === 'spotify' ? 'SPT' : 'AM'}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgSurface,
    borderRadius: layout.cardRadius,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.bgBorder,
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primaryMid,
    shadowColor: colors.primaryMid,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  albumArt: {
    width: 48,
    height: 48,
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
