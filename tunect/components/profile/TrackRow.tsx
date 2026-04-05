import { View, Text, Image, StyleSheet } from 'react-native'
import { colors } from '@/constants/Colors'

interface Props {
  name: string
  artist: string
  albumArt: string
  rank: number
}

export function TrackRow({ name, artist, albumArt, rank }: Props) {
  return (
    <View style={styles.row}>
      {albumArt
        ? <Image source={{ uri: albumArt }} style={styles.thumb} />
        : <View style={[styles.thumb, styles.fallback]}>
            <Text style={styles.fallbackText}>♪</Text>
          </View>
      }
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.artist} numberOfLines={1}>{artist}</Text>
      </View>
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
  },
  info: {
    flex: 1,
    gap: 3,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  artist: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  rank: {
    color: colors.textMuted,
    fontSize: 12,
  },
})
