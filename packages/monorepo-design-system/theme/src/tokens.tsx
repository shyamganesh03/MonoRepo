const ROC_GROTESK = 'RocGrotesk'
const DM_SANS = 'DMSans'

export const colors = {
  primary: {
    purple900: '#4F00B0',
    purple800: '#6200D9',
    purple700: '#6A00EF',
    purple600: '#7033FF',
    purple500: '#7D5AFA',
    purple400: '#9073FA',
    purple300: '#A48CFA',
    purple200: '#B7A5FA',
    purple100: '#E1D6FF',
  },
  neutral: {
    neutral900: '#16131B',
    neutral800: '#2E2B36',
    neutral700: '#47444F',
    neutral600: '#615E69',
    neutral500: '#7B7882',
    neutral400: '#96949C',
    neutral300: '#B0AEB5',
    neutral200: '#D5D4D6',
    neutral100: '#F1F1F1',
    white: '#FFFFFF',
  },

  secondaryAqua: {
    aqua900: '#17AD89',
    aqua800: '#19C299',
    aqua700: '#30D1AB',
    aqua600: '#43E0BB',
    aqua500: '#55EDC9',
    aqua400: '#5FF5D1',
    aqua300: '#68FCD9',
    aqua200: '#8EFFE4',
    aqua100: '#C2FFF0',
  },
  secondaryLime: {
    lime900: '#80AB30',
    lime800: '#97C938',
    lime700: '#A1DB37',
    lime600: '#B3E851',
    lime500: '#BFED6B',
    lime400: '#CAFA73',
    lime300: '#D8FF91',
    lime200: '#E1FFAA',
    lime100: '# ECFFC9',
  },
  secondaryCobalt: {
    cobalt900: '#166FF7',
    cobalt800: '#2F7EF7',
    cobalt700: '#4990FD',
    cobalt600: '#63A0FD',
    cobalt500: '#7CAFFD',
    cobalt400: '#95BEFD',
    cobalt300: '#AFCEFD',
    cobalt200: '#C8DDFD',
    cobalt100: '#E1ECFD',
  },
  secondaryMauve: {
    mauve900: '#741067',
    mauve800: '#8C227E',
    mauve700: '#A62896',
    mauve600: '#BF41AF',
    mauve500: '#D95FC9',
    mauve400: '#F283E4',
    mauve300: '#FFA3F3',
    mauve200: '#FFC2F7',
    mauve100: '#FFDBFB',
  },

  functionalError: {
    error900: '#731409',
    error800: '#8C1B0E',
    error700: '#A61F11',
    error600: '#BF2313',
    error500: '#DE2916',
    error400: '#F74D3B',
    error300: '#FE9489',
    error200: '#FEC2BC',
    error100: '#FED9D5',
  },
  gradients: {
    purple: ['#6200D9', '#7D5AFA'],
    aqua: ['#5FF5D1', '#C2FFF0'],
    lime: ['#CAFA73', '#ECFFC9'],
    cobalt: ['#95BEFD', '#E1ECFD'],
    mauve: ['#D95FC9', '#FFDBFB'],
  },
}

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
  display1: {
    fontFamily: `${ROC_GROTESK}-Bold`,
    fontSize: 48,
    fontWeight: '600',
  },
  display2: {
    fontFamily: `${ROC_GROTESK}-Bold`,
    fontSize: 42,
    fontWeight: '600',
  },
  display3: {
    fontFamily: `${ROC_GROTESK}-Bold`,
    fontSize: 36,
    fontWeight: '600',
  },
  display4: {
    fontFamily: `${ROC_GROTESK}-Bold`,
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 35.2,
  },
  heading1: {
    fontFamily: `${ROC_GROTESK}-Bold`,
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 33.6,
  },
  heading2: {
    fontFamily: `${ROC_GROTESK}-Bold`,
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 28.8,
  },
  heading3: {
    fontFamily: `${ROC_GROTESK}-Bold`,
    fontSize: 20,
    fontWeight: '600',
  },
  heading4: {
    fontFamily: `${DM_SANS}-Bold`,
    fontSize: 20,
    fontWeight: '700',
  },
  heading5: {
    fontFamily: `${DM_SANS}-Bold`,
    fontSize: 18,
    fontWeight: '600',
  },
  body1: {
    fontFamily: `${DM_SANS}-Regular`,
    fontSize: 16,
    fontWeight: '400',
  },
  bodyBold1: {
    fontFamily: `${DM_SANS}-Bold`,
    fontSize: 16,
    fontWeight: '700',
  },
  body2: {
    fontFamily: `${DM_SANS}-Regular`,
    fontSize: 14,
    fontWeight: '400',
  },
  bodyCompact2: {
    fontFamily: `${DM_SANS}-Regular`,
    fontSize: 14,
    fontWeight: '400',
  },
  bodyBold2: {
    fontFamily: `${DM_SANS}-Bold`,
    fontSize: 14,
    fontWeight: '700',
  },
  bodyCompactBold2: {
    fontFamily: `${DM_SANS}-Bold`,
    fontSize: 14,
    fontWeight: '700',
  },
  utility1: {
    fontFamily: `${ROC_GROTESK}-Bold`,
    fontSize: 14,
    fontWeight: '700',
  },
  utility2: {
    fontFamily: `${DM_SANS}-Regular`,
    fontSize: 12,
    fontWeight: '400',
  },
  utilityCompact2: {
    fontFamily: `${DM_SANS}-Regular`,
    fontSize: 12,
    fontWeight: '400',
  },
  utilityBold2: {
    fontFamily: `${DM_SANS}-Bold`,
    fontSize: 12,
    fontWeight: '700',
  },
  functional1: {
    fontFamily: `${ROC_GROTESK}-Bold`,
    fontSize: 16,
    fontWeight: '700',
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
