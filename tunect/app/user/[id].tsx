import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, router } from 'expo-router'
import { colors } from '@/constants/Colors'
import { matchColor } from '@/lib/compatibility'
import { GenreBar } from '@/components/music/GenreBar'
import { NowPlayingCard } from '@/components/profile/NowPlaying'

// Mock data for demo
const MOCK_USER = {
  id: '1',
  displayName: 'Jamie Chen',
  username: 'jamiechen',
  bio: 'music is the only language i speak fluently',
  compatibilityScore: 91,
  sharedArtists: 12,
  sharedGenres: ['Indie R&B', 'Neo-Soul', 'Alternative'],
  topArtists: [
    { name: 'Frank Ocean', imageUrl: null },
    { name: 'Tyler, the Creator', imageUrl: null },
    { name: 'SZA', imageUrl: null },
    { name: 'Solange', imageUrl: null },
    { name: 'Daniel Caesar', imageUrl: null },
  ],
  topGenres: [
    { genre: 'Indie R&B', pct: 68 },
    { genre: 'Neo-Soul', pct: 49 },
    { genre: 'Alternative', pct: 34 },
  ],
  personalityLabel: 'Soul Keeper',
  nowPlaying: null,
}

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams()
  const user = MOCK_USER
  const scoreColor = matchColor(user.compatibilityScore)

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Back */}
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        {/* Profile header */}
        <View style={styles.profileHeader}>
          <View style={[styles.avatar, styles.avatarFallback]}>
            <Text style={styles.avatarLetter}>{user.displayName[0]}</Text>
          </View>
          <Text style={styles.displayName}>{user.displayName}</Text>
          <Text style={styles.username}>@{user.username}</Text>
          <Text style={styles.bio}>{user.bio}</Text>
        </View>

        {/* Action buttons */}
        <View style={styles.actions}>
          <Pressable style={styles.followBtn}>
            <Text style={styles.followBtnText}>Follow</Text>
          </Pressable>
          <Pressable style={styles.messageBtn}>
            <Text style={styles.messageBtnText}>Message</Text>
          </Pressable>
        </View>

        {/* Compatibility card */}
        <View style={[styles.compatCard, { borderColor: scoreColor + '30' }]}>
          <View style={styles.compatScoreRow}>
            <Text style={[styles.compatScore, { color: scoreColor }]}>{user.compatibilityScore}%</Text>
            <Text style={styles.compatLabel}>compatible</Text>
          </View>
          <View style={styles.compatBar}>
            <View style={[styles.compatBarFill, { width: `${user.compatibilityScore}%`, backgroundColor: scoreColor }]} />
          </View>
          <View style={styles.compatStats}>
            <Text style={styles.compatStat}>{user.sharedArtists} shared artists</Text>
            <Text style={styles.compatDot}>·</Text>
            <Text style={styles.compatStat}>{user.sharedGenres.join(', ')}</Text>
          </View>
        </View>

        {/* Now playing */}
        <View style={styles.section}>
          <NowPlayingCard nowPlaying={user.nowPlaying} />
        </View>

        {/* Top Artists */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Artists</Text>
          {user.topArtists.map((artist, i) => (
            <View key={artist.name} style={styles.artistRow}>
              <View style={[styles.thumb, styles.thumbFallback]}>
                <Text style={styles.thumbText}>{artist.name[0]}</Text>
              </View>
              <Text style={styles.artistName} numberOfLines={1}>{artist.name}</Text>
              <Text style={styles.rank}>#{i + 1}</Text>
            </View>
          ))}
        </View>

        {/* Music Personality */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Music Personality</Text>
          <View style={styles.personalityCard}>
            <Text style={styles.personalityLabel}>{user.personalityLabel}</Text>
            <GenreBar genres={user.topGenres} />
          </View>
        </View>

        {/* Shared songs placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Songs You Both Love</Text>
          <Text style={styles.emptyState}>No shared songs yet — your tastes might surprise you</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bgBase },
  content: { paddingBottom: 20 },
  backBtn: { paddingHorizontal: 20, paddingVertical: 16 },
  backText: { color: colors.primary, fontSize: 16, fontWeight: '500' },

  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 8,
  },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  avatarFallback: {
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderColor: colors.bgBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: { color: colors.textSecondary, fontSize: 30, fontWeight: '600' },
  displayName: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginTop: 4,
  },
  username: { color: colors.textSecondary, fontSize: 14 },
  bio: { color: colors.textMuted, fontSize: 13, fontStyle: 'italic', textAlign: 'center', marginTop: 4 },

  actions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  followBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  followBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  messageBtn: {
    flex: 1,
    backgroundColor: colors.bgSurface,
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.bgBorder,
  },
  messageBtnText: { color: colors.textSecondary, fontSize: 15, fontWeight: '600' },

  compatCard: {
    marginHorizontal: 20,
    backgroundColor: colors.bgSurface,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    gap: 12,
    marginBottom: 4,
  },
  compatScoreRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  compatScore: { fontSize: 40, fontWeight: '800', letterSpacing: -1 },
  compatLabel: { color: colors.textSecondary, fontSize: 16 },
  compatBar: {
    height: 4,
    backgroundColor: colors.bgBorder,
    borderRadius: 2,
    overflow: 'hidden',
  },
  compatBarFill: { height: '100%', borderRadius: 2 },
  compatStats: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  compatStat: { color: colors.textSecondary, fontSize: 12 },
  compatDot: { color: colors.textMuted, fontSize: 12 },

  section: { paddingHorizontal: 20, paddingTop: 24, gap: 14 },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  artistRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4 },
  thumb: { width: 44, height: 44, borderRadius: 8 },
  thumbFallback: {
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.bgBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbText: { color: colors.textMuted, fontSize: 16, fontWeight: '600' },
  artistName: { flex: 1, color: colors.textPrimary, fontSize: 15, fontWeight: '500' },
  rank: { color: colors.textMuted, fontSize: 12 },

  personalityCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.bgBorder,
    gap: 16,
  },
  personalityLabel: { color: colors.primary, fontSize: 22, fontWeight: '700', letterSpacing: -0.5 },
  emptyState: { color: colors.textMuted, fontSize: 14, fontStyle: 'italic' },
})
