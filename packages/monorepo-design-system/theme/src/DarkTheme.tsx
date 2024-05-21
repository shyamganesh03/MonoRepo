import color from 'color'
import { colors, opacity } from './tokens'

export const DarkTheme = {
  colors: {
    primary: colors.primary.purple700,
    onPrimary: colors.neutral.white,
    onNeutral: colors.neutral.neutral900,
    primaryVariant1: colors.primary.purple600,
    primaryVariant2: colors.primary.purple100,
    primaryVariant3: color(colors.primary.purple300)
      .alpha(opacity.level3)
      .rgb()
      .string(),

    secondary1: colors.secondaryAqua.aqua200,
    secondaryVariant1: colors.secondaryAqua.aqua400,
    secondary2: colors.secondaryLime.lime200,
    secondaryVariant2: colors.secondaryLime.lime500,
    secondary3: colors.secondaryCobalt.cobalt200,
    secondaryVariant3: colors.secondaryCobalt.cobalt500,
    secondary4: colors.secondaryMauve.mauve200,
    secondaryVariant4: colors.secondaryMauve.mauve400,
    textPrimary: colors.neutral.white,
    textSecondary: colors.neutral.neutral100,
    textHints: color(colors.neutral.neutral100)
      .alpha(opacity.level7)
      .rgb()
      .string(),
    textInactive: color(colors.neutral.white)
      .alpha(opacity.level3)
      .rgb()
      .string(),
    textLink: colors.primary.purple300,
    alertBorder: colors.functionalError.error300,
    alertContainer: color(colors.functionalError.error300)
      .alpha(opacity.level5)
      .rgb()
      .string(),
    onAlertContainer: colors.functionalError.error300,
    inactiveAlert: color(colors.functionalError.error100)
      .alpha(opacity.level2)
      .rgb()
      .string(),
    pillarCareerMap: colors.gradients.purple,
    pillarJobsOp: colors.gradients.aqua,
    pillarLearningPath: colors.gradients.cobalt,
    pillarCommunity: colors.gradients.lime,
    pillarMentorship: colors.gradients.mauve,
    backgroundSurface: colors.neutral.white,
    backgroundSurfaceVariant: color(colors.neutral.white)
      .alpha(opacity.level3)
      .rgb()
      .string(),
    backgroundSurface1: colors.neutral.neutral900,
    backgroundSurface2: color(colors.neutral.neutral800)
      .alpha(opacity.level6)
      .rgb()
      .string(),
    backgroundSurface3: color(colors.neutral.neutral700)
      .alpha(opacity.level8)
      .rgb()
      .string(),
    backgroundSurface4: colors.neutral.neutral100,

    dividerShort: colors.primary.purple300,
    dividerLong: colors.neutral.neutral700,
    border: colors.neutral.neutral200,
  },
}
