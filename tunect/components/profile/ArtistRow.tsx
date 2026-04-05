import { View, Text, Image, StyleSheet } from 'react-native'
import { colors } from '@/constants/Colors'

interface Props {
  name: string
  image: string
  rank: number
}

export function ArtistRow({ name, image, rank }: Props) {
  return (
    <View style={styles.row}>
      {image
        ? <Image source={{ uri: image }} style={styles.thumb} />
        : <View style={[styles.thumb, styles.fallback]}>
            <Text style={styles.fallbackText}>{name[0]}</Text>
          </View>
      }
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
      <Text style={styles.rank}>#{rank}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  thumb: {
    width: 44,
    height: 44,
    borderRadius: 6,
    backgroundColor: colors.bgElevated,
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.bgBorder,
  },
  fallbackText: {
    color: colors.textMuted,
    fontSize: 16,
    fontWeight: '600',
  },
  name: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '500',
  },
  rank: {
    color: colors.textMuted,
    fontSize: 12,
  },
})
