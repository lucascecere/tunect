"use client"
import { View, Text, StyleSheet, Pressable, StatusBar } from 'react-native'
import { router } from 'expo-router'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated'
import { useEffect } from 'react'
import { colors } from '@/constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'

// Spotify icon as inline SVG-style paths using RN shapes
function SpotifyIcon({ size = 20 }: { size?: number }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: '#1DB954', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#000', fontSize: size * 0.55, fontWeight: '900', lineHeight: size * 0.7 }}>♪</Text>
    </View>
  )
}

export default function LoginScreen() {
  const glowOpacity = useSharedValue(0.4)
  const glowScale = useSharedValue(1)

  useEffect(() => {
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 2500, easing: Easing.inOut(Easing.sine) }),
        withTiming(0.3, { duration: 2500, easing: Easing.inOut(Easing.sine) }),
      ),
      -1,
      false,
    )
    glowScale.value = withRepeat(
      withSequence(
        withTiming(1.12, { duration: 3000, easing: Easing.inOut(Easing.sine) }),
        withTiming(0.95, { duration: 3000, easing: Easing.inOut(Easing.sine) }),
      ),
      -1,
      false,
    )
  }, [])

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: glowScale.value }],
  }))

  function handleSpotifyLogin() {
    // Demo: skip auth, go straight to tabs
    router.replace('/(tabs)/profile')
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background gradient */}
      <LinearGradient
        colors={['#0A0A0A', '#0F0A12', '#0A0A0A']}
        style={StyleSheet.absoluteFill}
      />

      {/* Ambient glow orbs */}
      <Animated.View style={[styles.orbTop, glowStyle]} />
      <Animated.View style={[styles.orbBottom, glowStyle]} />

      {/* Logo + wordmark */}
      <Animated.View entering={FadeInDown.delay(200).duration(700).springify()} style={styles.logoSection}>
        <View style={styles.logoMark}>
          <LinearGradient
            colors={['#FF2D78', '#A855F7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoGradient}
          >
            <Text style={styles.logoLetter}>T</Text>
          </LinearGradient>
        </View>
        <Text style={styles.wordmark}>tunect</Text>
      </Animated.View>

      {/* Tagline */}
      <Animated.View entering={FadeInDown.delay(400).duration(700)} style={styles.taglineSection}>
        <Text style={styles.headline}>Music is how{'\n'}you know someone.</Text>
        <Text style={styles.subline}>Connect your Spotify to get a live profile, compatibility scores with everyone, and find your people.</Text>
      </Animated.View>

      {/* CTA buttons */}
      <Animated.View entering={FadeInUp.delay(600).duration(700)} style={styles.ctaSection}>
        {/* Spotify CTA */}
        <Pressable
          style={({ pressed }) => [styles.spotifyBtn, pressed && styles.pressed]}
          onPress={handleSpotifyLogin}
        >
          <SpotifyIcon size={22} />
          <Text style={styles.spotifyBtnText}>Continue with Spotify</Text>
        </Pressable>

        {/* Apple Music (coming soon) */}
        <Pressable style={[styles.appleMusicBtn]} disabled>
          <Text style={styles.appleMusicIcon}>♫</Text>
          <Text style={styles.appleMusicText}>Apple Music</Text>
          <View style={styles.comingSoonPill}>
            <Text style={styles.comingSoonText}>Soon</Text>
          </View>
        </Pressable>

        <Text style={styles.disclaimer}>
          We only read your listening data.{'\n'}We never post or modify your account.
        </Text>
      </Animated.View>

      {/* Footer */}
      <Animated.View entering={FadeIn.delay(900).duration(600)} style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing you agree to our{' '}
          <Text style={styles.footerLink}>Terms</Text>
          {' '}and{' '}
          <Text style={styles.footerLink}>Privacy Policy</Text>
        </Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 80,
    paddingBottom: 44,
    paddingHorizontal: 28,
  },

  // Orbs
  orbTop: {
    position: 'absolute',
    top: -80,
    left: '50%',
    marginLeft: -200,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#FF2D78',
    opacity: 0.06,
    transform: [{ scaleX: 1.4 }],
  },
  orbBottom: {
    position: 'absolute',
    bottom: -100,
    right: -100,
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: '#A855F7',
    opacity: 0.07,
  },

  // Logo
  logoSection: {
    alignItems: 'center',
    gap: 12,
  },
  logoMark: {
    width: 72,
    height: 72,
    borderRadius: 22,
    overflow: 'hidden',
    shadowColor: '#FF2D78',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 12,
  },
  logoGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -1,
  },
  wordmark: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.8,
  },

  // Tagline
  taglineSection: {
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 8,
  },
  headline: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: -0.8,
    lineHeight: 40,
  },
  subline: {
    fontSize: 15,
    color: '#A0A0A0',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 300,
  },

  // CTAs
  ctaSection: {
    width: '100%',
    gap: 12,
    alignItems: 'center',
  },
  spotifyBtn: {
    width: '100%',
    backgroundColor: '#1DB954',
    borderRadius: 999,
    paddingVertical: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#1DB954',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  spotifyBtnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  appleMusicBtn: {
    width: '100%',
    backgroundColor: '#141414',
    borderRadius: 999,
    paddingVertical: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    opacity: 0.5,
  },
  appleMusicIcon: {
    fontSize: 18,
    color: '#fff',
    lineHeight: 22,
  },
  appleMusicText: {
    color: '#A0A0A0',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  comingSoonPill: {
    backgroundColor: '#1E1E1E',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 4,
  },
  comingSoonText: {
    color: '#505050',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  disclaimer: {
    color: '#505050',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 4,
  },
  pressed: { opacity: 0.82, transform: [{ scale: 0.97 }] },

  // Footer
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: '#505050',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  footerLink: {
    color: '#A0A0A0',
    textDecorationLine: 'underline',
  },
})
