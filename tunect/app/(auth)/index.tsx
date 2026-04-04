import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Link } from 'expo-router'
import { colors } from '@/constants/Colors'

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* Background glow orbs */}
      <View style={[styles.orb, styles.orbPink]} />
      <View style={[styles.orb, styles.orbViolet]} />

      {/* Center content */}
      <View style={styles.center}>
        <View style={styles.iconContainer}>
          <View style={styles.iconBg}>
            <Text style={styles.noteSymbol}>♪</Text>
          </View>
          <View style={[styles.dot, { top: 4, right: -4 }]} />
          <View style={[styles.dot, { bottom: 4, right: -12 }]} />
        </View>

        <Text style={styles.wordmark}>tunect</Text>
        <Text style={styles.tagline}>Connect through music</Text>
      </View>

      {/* CTA buttons */}
      <View style={styles.cta}>
        <Link href="/(auth)/signup" asChild>
          <Pressable style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}>
            <Text style={styles.primaryBtnText}>Get started</Text>
          </Pressable>
        </Link>
        <Link href="/(auth)/login" asChild>
          <Pressable style={({ pressed }) => [styles.ghostBtn, pressed && styles.pressed]}>
            <Text style={styles.ghostBtnText}>Log in</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgBase,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 80,
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.2,
  },
  orbPink: {
    width: 380,
    height: 380,
    backgroundColor: colors.primary,
    top: -100,
    left: -80,
  },
  orbViolet: {
    width: 320,
    height: 320,
    backgroundColor: colors.accent,
    bottom: 40,
    right: -100,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 80,
    height: 80,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBg: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },
  noteSymbol: { fontSize: 36, color: '#fff' },
  dot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
  wordmark: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -1.5,
    marginTop: 8,
  },
  tagline: { fontSize: 16, color: colors.textSecondary },
  cta: { width: '100%', paddingHorizontal: 28, gap: 12 },
  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  ghostBtn: { borderRadius: 999, paddingVertical: 16, alignItems: 'center' },
  ghostBtnText: { color: colors.textSecondary, fontSize: 16, fontWeight: '500' },
  pressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
})
