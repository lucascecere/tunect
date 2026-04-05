import { View, Text, StyleSheet } from 'react-native'
import { GenreBar, GenreItem } from '@/components/music/GenreBar'
import { colors } from '@/constants/Colors'
import { layout } from '@/constants/layout'

interface Props {
  label: string
  genres: GenreItem[]
}

export function MusicPersonalityCard({ label, genres }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.subtitle}>Your taste in music</Text>
      <View style={styles.bars}>
        <GenreBar genres={genres.slice(0, 3)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgSurface,
    borderRadius: layout.cardRadius,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.bgBorder,
    gap: 4,
  },
  label: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 8,
  },
  bars: {
    marginTop: 4,
  },
})
