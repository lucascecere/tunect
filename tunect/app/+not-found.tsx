import { Link, Stack } from 'expo-router'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '@/constants/Colors'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found', headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.title}>Nothing here.</Text>
        <Link href="/(auth)" style={styles.link}>
          <Text style={styles.linkText}>Go home</Text>
        </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgBase,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: { fontSize: 18, color: colors.textSecondary },
  link: { marginTop: 16 },
  linkText: { color: colors.primary, fontSize: 15 },
})
