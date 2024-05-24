import React, { useRef } from 'react'
import {
  View,
  useColorScheme,
  Platform,
  useWindowDimensions,
} from 'react-native'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Toast from 'react-native-toast-notifications'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import {
  LightTheme as LightThemeColors,
  DarkTheme as DarkThemeColors,
  spacing,
  ThemeProvider,
} from '@libs/theme'
import { Analytics } from '@libs/utils'
import * as RootNavigator from './navigation/RootNavigator'
import { AppNavigator } from './navigation'
import { useAtom, Provider as JotaiProvider } from 'jotai'
import { themeSwitchAtom } from '@izzo/jotai-storage'
import '@izzo/shared-translation'
import { PaperProvider } from 'react-native-paper'

Analytics.init()

const customLightTheme = {
  ...DefaultTheme.colors,
  ...LightThemeColors,
  colors: {
    ...DefaultTheme.colors,
    ...LightThemeColors.colors,
  },
  spacing,
}

const customDarkTheme = {
  ...DarkTheme.colors,
  ...DarkThemeColors,
  colors: {
    ...DarkTheme.colors,
    ...DarkThemeColors.colors,
  },
  spacing,
}

const getThemeColor = (themeState: any, colorScheme: any) => {
  if (themeState?.system && colorScheme === 'dark') {
    return customDarkTheme
  }
  if (themeState?.system && colorScheme === 'light') {
    return customLightTheme
  }

  if (!themeState?.system && !themeState?.dark) {
    return customLightTheme
  }
  return customDarkTheme
}

const AppSubWrapper = () => {
  const height = useWindowDimensions().height

  return (
    <View style={Platform.OS === 'web' ? { minHeight: height } : { flex: 1 }}>
      <AppNavigator />
      <Toast
        ref={(ref) => {
          //@ts-ignore
          global.toast = ref
        }}
        duration={5000}
        animationType="zoom-in"
        animationDuration={0}
        textStyle={{ fontSize: 14 }}
      />
    </View>
  )
}

export const App = () => {
  const routeNameRef = useRef()
  const themeState = useAtom(themeSwitchAtom)
  const colorScheme = useColorScheme()
  const theme: any = getThemeColor(themeState, colorScheme)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={theme}>
        {Platform.OS === 'web' && (
          <style type="text/css" suppressHydrationWarning>
            {`
            @font-face {
              font-family: 'MaterialCommunityIcons';
              src: url(${require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')}) format('truetype');
            }
          `}
          </style>
        )}

        <NavigationContainer
          documentTitle={{
            formatter: (options) => `Izzo | ${options?.title || ''}`,
          }}
          ref={RootNavigator.navigationRef}
          onReady={() => {
            routeNameRef.current =
              RootNavigator.navigationRef.current.getCurrentRoute()?.name
          }}
          onStateChange={async () => {
            const currentRouteName =
              RootNavigator.navigationRef.current.getCurrentRoute()?.name
            routeNameRef.current = currentRouteName
          }}
          theme={theme}
          //@ts-ignore
          linking={{ enabled: true }}
        >
          <JotaiProvider>
            <QueryClientProvider client={queryClient}>
              <AppSubWrapper />
            </QueryClientProvider>
          </JotaiProvider>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  )
}
