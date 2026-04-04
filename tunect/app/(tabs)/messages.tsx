import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { colors } from '@/constants/Colors'

const MOCK_CONVERSATIONS = [
  {
    id: '1',
    name: 'Jamie Chen',
    username: 'jamiechen',
    lastMessage: 'omg you listen to Frank Ocean too??',
    timestamp: '2m',
    unread: 2,
  },
  {
    id: '2',
    name: 'Mia Torres',
    username: 'mia.beats',
    lastMessage: 'that Brat album is everything',
    timestamp: '1h',
    unread: 0,
  },
  {
    id: '3',
    name: 'Sam Park',
    username: 'sampark',
    lastMessage: 'new Radiohead deep cut just dropped',
    timestamp: '3h',
    unread: 1,
  },
]

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>

      <FlatList
        data={MOCK_CONVERSATIONS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.row, pressed && styles.pressed]}
            onPress={() => {}}
          >
            <View style={[styles.avatar, styles.avatarFallback]}>
              <Text style={styles.avatarLetter}>{item.name[0]}</Text>
            </View>
            <View style={styles.info}>
              <View style={styles.infoTop}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.timestamp}</Text>
              </View>
              <Text style={[styles.preview, item.unread > 0 && styles.previewUnread]} numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>
            {item.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </View>
            )}
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Connect with someone to start talking</Text>
          </View>
        }
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
  },
  title: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  list: { paddingVertical: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 14,
  },
  pressed: { backgroundColor: colors.bgSurface },
  avatar: { width: 52, height: 52, borderRadius: 26 },
  avatarFallback: {
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderColor: colors.bgBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: { color: colors.textSecondary, fontSize: 20, fontWeight: '600' },
  info: { flex: 1, gap: 4 },
  infoTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { color: colors.textPrimary, fontSize: 15, fontWeight: '600' },
  time: { color: colors.textMuted, fontSize: 12 },
  preview: { color: colors.textSecondary, fontSize: 13 },
  previewUnread: { color: colors.textPrimary, fontWeight: '500' },
  separator: { height: 1, backgroundColor: colors.bgBorder, marginLeft: 86 },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  empty: { paddingTop: 80, alignItems: 'center' },
  emptyText: { color: colors.textMuted, fontSize: 15, fontStyle: 'italic' },
})
