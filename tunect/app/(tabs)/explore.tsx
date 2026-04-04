import { useState, useMemo } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { UserCard, UserCardData } from '@/components/explore/UserCard'
import { colors } from '@/constants/Colors'

// Placeholder data until Supabase is wired
const MOCK_USERS: UserCardData[] = [
  {
    id: '1',
    displayName: 'Jamie Chen',
    username: 'jamiechen',
    compatibilityScore: 91,
    topArtists: ['Frank Ocean', 'Tyler, the Creator', 'SZA'],
    isPlaying: true,
    nowPlayingTrack: 'Novacane',
  },
  {
    id: '2',
    displayName: 'Mia Torres',
    username: 'mia.beats',
    compatibilityScore: 78,
    topArtists: ['The Weeknd', 'Doja Cat', 'PinkPantheress'],
    isPlaying: false,
  },
  {
    id: '3',
    displayName: 'Sam Park',
    username: 'sampark',
    compatibilityScore: 65,
    topArtists: ['Arctic Monkeys', 'Radiohead', 'Tame Impala'],
    isPlaying: false,
  },
  {
    id: '4',
    displayName: 'Riley Okafor',
    username: 'rileyok',
    compatibilityScore: 54,
    topArtists: ['Kendrick Lamar', 'J. Cole', 'Drake'],
    isPlaying: true,
    nowPlayingTrack: 'Not Like Us',
  },
  {
    id: '5',
    displayName: 'Alex Novak',
    username: 'anovak',
    compatibilityScore: 42,
    topArtists: ['Billie Eilish', 'Lorde', 'Mitski'],
    isPlaying: false,
  },
]

export default function ExploreScreen() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return MOCK_USERS
    const q = query.toLowerCase()
    return MOCK_USERS.filter(
      u => u.displayName.toLowerCase().includes(q) || u.username.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <TextInput
          style={styles.search}
          placeholder="Search by name or username"
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          clearButtonMode="while-editing"
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onPress={(id) => router.push(`/user/${id}`)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No one here yet — invite a friend</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bgBase },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.bgBorder,
    gap: 14,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  search: {
    backgroundColor: colors.bgSurface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.textPrimary,
    fontSize: 15,
    borderWidth: 1,
    borderColor: colors.bgBorder,
  },
  list: {
    padding: 20,
    paddingTop: 16,
  },
  empty: {
    paddingTop: 60,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 15,
    fontStyle: 'italic',
  },
})
