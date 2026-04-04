import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { colors, colors as c } from '@/constants/Colors'
import { matchColor } from '@/lib/compatibility'

export interface UserCardData {
  id: string
  displayName: string
  username: string
  avatarUrl?: string
  compatibilityScore: number
  topArtists: string[]
  isPlaying?: boolean
  nowPlayingTrack?: string
}

interface Props {
  user: UserCardData
  onPress: (id: string) => void
}

export function UserCard({ user, onPress }: Props) {
  const scoreColor = matchColor(user.compatibilityScore)

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={() => onPress(user.id)}
    >
      {/* Avatar */}
      <View style={styles.avatarWrap}>
        {user.avatarUrl
          ? <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
          : <View style={[styles.avatar, styles.avatarFallback]}>
              <Text style={styles.avatarLetter}>{user.displayName[0]?.toUpperCase()}</Text>
            </View>
        }
        {user.isPlaying && <View style={styles.playingDot} />}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{user.displayName}</Text>
        <Text style={styles.username} numberOfLines={1}>@{user.username}</Text>
        {user.topArtists.length > 0 && (
          <Text style={styles.artists} numberOfLines={1}>
            {user.topArtists.slice(0, 3).join(' · ')}
          </Text>
        )}
        {user.isPlaying && user.nowPlayingTrack && (
          <Text style={styles.nowPlaying} numberOfLines={1}>▶ {user.nowPlayingTrack}</Text>
        )}
      </View>

      {/* Score */}
      <View style={[styles.scorePill, { borderColor: scoreColor + '40', backgroundColor: scoreColor + '15' }]}>
        <Text style={[styles.scoreText, { color: scoreColor }]}>{user.compatibilityScore}%</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgSurface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.bgBorder,
    gap: 12,
  },
  pressed: { opacity: 0.8, transform: [{ scale: 0.99 }] },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  avatarFallback: {
    backgroundColor: colors.bgElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.bgBorder,
  },
  avatarLetter: {
    color: colors.textSecondary,
    fontSize: 20,
    fontWeight: '600',
  },
  playingDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.bgSurface,
  },
  info: { flex: 1, gap: 2 },
  name: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  username: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  artists: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 3,
  },
  nowPlaying: {
    color: colors.primary,
    fontSize: 11,
    marginTop: 2,
  },
  scorePill: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minWidth: 50,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 13,
    fontWeight: '700',
  },
})
