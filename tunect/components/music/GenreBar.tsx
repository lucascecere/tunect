import { View, Text, StyleSheet } from 'react-native'
import { colors } from '@/constants/Colors'

interface Props {
  genres: { genre: string; pct: number }[]
}

export function GenreBar({ genres }: Props) {
  if (!genres.length) return null
  return (
    <View style={styles.container}>
      {genres.map(({ genre, pct }) => (
        <View key={genre} style={styles.row}>
          <Text style={styles.genre} numberOfLines={1}>{genre}</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${pct}%` }]} />
          </View>
          <Text style={styles.pct}>{pct}%</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { gap: 10 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  genre: {
    color: colors.textSecondary,
    fontSize: 12,
    width: 100,
  },
  barTrack: {
    flex: 1,
    height: 4,
    backgroundColor: colors.bgBorder,
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  pct: {
    color: colors.textMuted,
    fontSize: 11,
    width: 30,
    textAlign: 'right',
  },
})
