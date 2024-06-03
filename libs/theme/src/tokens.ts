import { Platform } from 'react-native'

const SCULPIN = 'Sculpin'

export const opacity = {
  level1: 0.1,
  level2: 0.2,
  level3: 0.3,
  level4: 0.4,
  level5: 0.5,
  level6: 0.6,
  level7: 0.7,
  level8: 0.8,
  level9: 0.9,
}

export const typography = {
  displaySmall: {
    fontFamily: `${SCULPIN}-Regular`,
    fontSize: 20,
    letterSpacing: 0,
    fontWeight: Platform.OS === 'android' ? '' : '400',
  },
  displayMedium: {
    fontFamily: `${SCULPIN}-Regular`,
    fontSize: 22,
    letterSpacing: 0,
    fontWeight: Platform.OS === 'android' ? '' : '400',
  },
  displayLarge: {
    fontFamily: `${SCULPIN}-Regular`,
    fontSize: 24,
    letterSpacing: 0,
    fontWeight: Platform.OS === 'android' ? '' : '400',
  },
  headlineSmall: {
    fontFamily: `${SCULPIN}-Bold`,
    fontSize: 20,
    letterSpacing: 0,
    fontWeight: Platform.OS === 'android' ? '' : '700',
  },
  headlineMedium: {
    fontFamily: `${SCULPIN}-Bold`,
    fontSize: 24,
    letterSpacing: 0,
    fontWeight: Platform.OS === 'android' ? '' : '700',
  },
  headlineLarge: {
    fontFamily: `${SCULPIN}-Bold`,
    fontSize: 28,
    letterSpacing: 0,
    fontWeight: Platform.OS === 'android' ? '' : '700',
  },
  titleSmall: {
    fontFamily: `${SCULPIN}-Medium`,
    fontSize: 14,
    letterSpacing: 0.1,
    fontWeight: Platform.OS === 'android' ? '' : '500',
  },
  titleMedium: {
    fontFamily: `${SCULPIN}-Medium`,
    fontSize: 16,
    letterSpacing: 0.15,
    fontWeight: Platform.OS === 'android' ? '' : '500',
  },
  titleLarge: {
    fontFamily: `${SCULPIN}-Bold`,
    fontSize: 16,
    letterSpacing: 0,
    fontWeight: Platform.OS === 'android' ? '' : '700',
  },
  titleXL: {
    fontFamily: `${SCULPIN}-Medium`,
    fontSize: 20,
    letterSpacing: 0.1,
    fontWeight: Platform.OS === 'android' ? '' : '500',
  },
  labelSmall: {
    fontFamily: `${SCULPIN}-Medium`,
    fontSize: 11,
    letterSpacing: 0.5,
    fontWeight: Platform.OS === 'android' ? '' : '500',
  },
  labelMedium: {
    fontFamily: `${SCULPIN}-Medium`,
    fontSize: 12,
    letterSpacing: 0.5,
    fontWeight: Platform.OS === 'android' ? '' : '500',
  },
  labelLarge: {
    fontFamily: `${SCULPIN}-Bold`,
    fontSize: 12,
    letterSpacing: 0.1,
    fontWeight: Platform.OS === 'android' ? '' : '700',
  },
  bodySmall: {
    fontFamily: `${SCULPIN}-Regular`,
    fontSize: 12,
    letterSpacing: 0.4,
    fontWeight: Platform.OS === 'android' ? '' : '400',
  },
  bodyMedium: {
    fontFamily: `${SCULPIN}-Regular`,
    fontSize: 14,
    letterSpacing: 0.25,
    fontWeight: Platform.OS === 'android' ? '' : '400',
  },
  bodyLarge: {
    fontFamily: `${SCULPIN}-Regular`,
    fontSize: 16,
    letterSpacing: 0.15,
    fontWeight: Platform.OS === 'android' ? '' : '400',
  },
}

export const spacing = {
  spacing1: 2,
  spacing2: 4,
  spacing3: 8,
  spacing4: 12,
  spacing5: 16,
  spacing6: 24,
  spacing7: 32,
  spacing8: 40,
  spacing9: 48,
  spacing10: 64,
  spacing11: 80,
  spacing12: 96,
  spacing13: 160,
}
