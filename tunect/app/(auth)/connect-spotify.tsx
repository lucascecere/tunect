import { useState } from 'react'
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import { router } from 'expo-router'
import { connectSpotify } from '@/lib/spotify'
import { useAuthStore } from '@/stores/authStore'
import { colors } from '@/constants/Colors'

export default function ConnectSpotifyScreen() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { setSpotifyConnected } = useAuthStore()

  async function handleConnect() {
    setError(null)
    setLoading(true)
    try {
      const result = await connectSpotify()
      if (result) {
        setSpotifyConnected(true)
        router.replace('/(tabs)/profile')
      }
    } catch (e) {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleSkip() {
    router.replace('/(tabs)/profile')
  }

  return (
    <View style={styles.container}>
      {/* Glow */}
      <View style={styles.glow} />

      <View style={styles.content}>
        {/* Spotify logo placeholder */}
        <View style={styles.spotifyBadge}>
          <Text style={styles.spotifyLogo}>spotify</Text>
        </View>

        <Text style={styles.title}>Connect your Spotify</Text>
        <Text style={styles.body}>
          We use your listening history to build your profile and find your people.
        </Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <Pressable
          style={({ pressed }) => [styles.connectBtn, pressed && styles.pressed]}
          onPress={handleConnect}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.connectBtnText}>Connect Spotify</Text>
          }
        </Pressable>

        <Pressable onPress={handleSkip} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip for now</Text>
        </Pressable>
        <Text style={styles.skipHint}>Some features will be limited.</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgBase,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  glow: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: colors.spotifyGreen,
    opacity: 0.06,
    top: '20%',
  },
  content: {
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  spotifyBadge: {
    backgroundColor: colors.spotifyGreen,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginBottom: 12,
    shadowColor: colors.spotifyGreen,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  spotifyLogo: {
    color: '#000',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  body: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
    maxWidth: 300,
  },
  error: {
    color: colors.error,
    fontSize: 13,
    textAlign: 'center',
  },
  connectBtn: {
    backgroundColor: colors.spotifyGreen,
    borderRadius: 999,
    paddingVertical: 17,
    paddingHorizontal: 40,
    alignItems: 'center',
    width: '100%',
    shadowColor: colors.spotifyGreen,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 8,
  },
  connectBtnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  pressed: { opacity: 0.75, transform: [{ scale: 0.98 }] },
  skipBtn: { marginTop: 8, padding: 8 },
  skipText: { color: colors.textMuted, fontSize: 15 },
  skipHint: { color: colors.textMuted, fontSize: 12 },
})
