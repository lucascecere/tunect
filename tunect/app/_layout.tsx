import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
  runOnJS,
  Easing,
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

SplashScreen.preventAutoHideAsync()

export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '(auth)',
}

// ─── Tunect Splash ────────────────────────────────────────────────────────────

function TunectSplash({ onDone }: { onDone: () => void }) {
  const overlayOpacity = useSharedValue(1)
  const logoScale = useSharedValue(0.7)
  const logoOpacity = useSharedValue(0)
  const glowOpacity = useSharedValue(0)
  const glowScale = useSharedValue(0.6)

  useEffect(() => {
    // Logo enters
    logoOpacity.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.cubic) })
    logoScale.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.back(1.3)) })

    // Glow blooms
    glowOpacity.value = withDelay(200, withTiming(0.6, { duration: 600 }))
    glowScale.value = withDelay(200, withTiming(1.2, { duration: 800, easing: Easing.out(Easing.cubic) }))

    // Hold then fade out everything
    overlayOpacity.value = withDelay(
      1600,
      withTiming(0, { duration: 600, easing: Easing.in(Easing.cubic) }, (finished) => {
        if (finished) runOnJS(onDone)()
      }),
    )

    // Glow dims before overlay fades
    glowOpacity.value = withDelay(1400, withTiming(0, { duration: 400 }))
    logoOpacity.value = withDelay(1500, withTiming(0, { duration: 300 }))
  }, [])

  const overlayStyle = useAnimatedStyle(() => ({ opacity: overlayOpacity.value }))
  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }))
  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: glowScale.value }],
  }))

  return (
    <Animated.View style={[styles.splashOverlay, overlayStyle]} pointerEvents="none">
      <LinearGradient
        colors={['#0A0A0A', '#0F0810', '#0A0A0A']}
        style={StyleSheet.absoluteFill}
      />

      {/* Pink ambient glow behind logo */}
      <Animated.View style={[styles.splashGlow, glowStyle]} />

      {/* Logo mark + wordmark */}
      <Animated.View style={[styles.splashLogo, logoStyle]}>
        <View style={styles.splashLogoMark}>
          <LinearGradient
            colors={['#FF2D78', '#A855F7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.splashLogoGradient}
          >
            <Text style={styles.splashLogoLetter}>T</Text>
          </LinearGradient>
        </View>
        <Text style={styles.splashWordmark}>tunect</Text>
      </Animated.View>
    </Animated.View>
  )
}

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout() {
  const [splashDone, setSplashDone] = useState(false)

  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="user/[id]" options={{ presentation: 'card', headerShown: false }} />
      </Stack>

      {!splashDone && <TunectSplash onDone={() => setSplashDone(true)} />}
    </View>
  )
}

const styles = StyleSheet.create({
  splashOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A0A0A',
  },
  splashGlow: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: '#FF2D78',
    opacity: 0,
  },
  splashLogo: {
    alignItems: 'center',
    gap: 16,
  },
  splashLogoMark: {
    width: 80,
    height: 80,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#FF2D78',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 16,
  },
  splashLogoGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashLogoLetter: {
    fontSize: 42,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -1,
  },
  splashWordmark: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -1,
  },
})
