import { Stack } from 'expo-router'
import { useAuthStore } from '@/stores/authStore'
import { Redirect } from 'expo-router'

export default function AuthLayout() {
  const { session } = useAuthStore()
  if (session) return <Redirect href="/(tabs)/profile" />
  return <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
}
