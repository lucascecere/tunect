import { useEffect } from 'react'
import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated'
import { colors } from '@/constants/Colors'

export interface GenreItem {
  name: string
  percentage: number
}

interface ItemProps {
  name: string
  percentage: number
  index: number
}

const BAR_COLORS = [colors.primary, colors.primaryMid, colors.primaryLight, colors.primaryLight]

function GenreBarItem({ name, percentage, index }: ItemProps) {
  const fillWidth = useSharedValue(0)

  const fillStyle = useAnimatedStyle(() => ({ width: fillWidth.value }))

  function handleLayout(e: LayoutChangeEvent) {
    const trackW = e.nativeEvent.layout.width
    fillWidth.value = withDelay(
      index * 150,
      withTiming(trackW * (percentage / 100), {
        duration: 600,
        easing: Easing.out(Easing.ease),
      }),
    )
  }

  const barColor = BAR_COLORS[index] ?? colors.primaryLight

  return (
    <View style={styles.row}>
      <Text style={styles.label} numberOfLines={1}>{name}</Text>
      <View style={styles.track} onLayout={handleLayout}>
        <Animated.View style={[styles.fill, { backgroundColor: barColor }, fillStyle]} />
      </View>
      <Text style={styles.pct}>{percentage}%</Text>
    </View>
  )
}

interface Props {
  genres: GenreItem[]
}

export function GenreBar({ genres }: Props) {
  if (!genres.length) return null
  return (
    <View style={styles.container}>
      {genres.map((g, i) => (
        <GenreBarItem key={g.name} name={g.name} percentage={g.percentage} index={i} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12,
    width: 96,
  },
  track: {
    flex: 1,
    height: 4,
    backgroundColor: colors.bgBorder,
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
  },
  pct: {
    color: colors.textMuted,
    fontSize: 11,
    width: 30,
    textAlign: 'right',
  },
})
