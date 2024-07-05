import { createContext, useContext, useState } from 'react'
import {
  MD2DarkTheme,
  MD2LightTheme,
  PaperProvider,
  configureFonts,
} from 'react-native-paper'

import { DarkTheme as DarkThemeColors } from './DarkTheme'
import { LightTheme as LightThemeColors } from './LightTheme'
import { spacing, typography } from './tokens'

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'Sculpin-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Sculpin-Medium',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Sculpin-Bold',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Sculpin-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Sculpin-Medium',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Sculpin-Bold',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'Sculpin-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Sculpin-Medium',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Sculpin-Bold',
      fontWeight: 'normal',
    },
  },
}

const createCustomTheme = (
  baseTheme: any,
  customColors: any,
  customFonts: any,
) => {
  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      ...customColors.colors,
    },
    fonts: configureFonts({
      config: { ...fontConfig, ...customFonts } as any,
      isV3: false,
    }),
  }
}

const ThemeContext = createContext({
  theme: createCustomTheme(
    MD2DarkTheme,
    DarkThemeColors,
    typography,
  ),
  typography: typography,
  spacing: spacing,
  setTheme: (theme: any) => {},
  updateTheme: (themeState: string) => {},
})

const ThemeProvider = ({ children }) => {
  const customLightTheme = createCustomTheme(
    MD2LightTheme,
    LightThemeColors,
    typography,
  )
  const customDarkTheme = createCustomTheme(
    MD2DarkTheme,
    DarkThemeColors,
    typography,
  )
  const customLightThemeDrunkMode = createCustomTheme(
    MD2LightTheme,
    LightThemeColors,
    typography,
  )
  const customDarkThemeDrunkMode = createCustomTheme(
    MD2DarkTheme,
    DarkThemeColors,
    typography,
  )

  const getTheme = (theme: string, isDrunkMode?: boolean) => {
    if (theme === 'dark') {
      return isDrunkMode ? customDarkThemeDrunkMode : customDarkTheme
    }
    if (theme === 'light') {
      return isDrunkMode ? customLightThemeDrunkMode : customLightTheme
    }
    return isDrunkMode ? customDarkThemeDrunkMode : customDarkTheme
  }

  const currentTheme = getTheme('dark')
  const [theme, setTheme] = useState(currentTheme)

  const updateTheme = (themeState: string) => {
    const newTheme = getTheme(themeState)
    setTheme(newTheme)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        updateTheme,
        typography,
        spacing,
      }}
    >
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

export { ThemeProvider, ThemeContext, spacing }
