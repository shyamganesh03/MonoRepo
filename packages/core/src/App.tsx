import React, { useRef } from 'react'
import { View, Platform, useWindowDimensions } from 'react-native'
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
} from '@libs/theme'
import { Analytics } from '@libs/utils'
import * as RootNavigator from './navigation/RootNavigator'
import { AppNavigator } from './navigation'
import notificationService from './utils/notificationHandler'
import { useAtom, Provider as JotaiProvider } from 'jotai'
import { themeSwitchAtom } from '@izzo/jotai-storage'
import '@izzo/shared-translation'
import { PaperProvider } from 'react-native-paper'

Analytics.init()
notificationService()

const createCustomTheme = (baseTheme: any, customColors: any) => ({
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    ...customColors.colors,
  },
  spacing,
})

const customLightTheme = createCustomTheme(DefaultTheme, LightThemeColors)
const customDarkTheme = createCustomTheme(DarkTheme, DarkThemeColors)

const getThemeColor = (themeState) => {
  switch (themeState) {
    case 'dark':
      return customDarkTheme
    case 'light':
      return customLightTheme
    default:
      return customLightTheme
  }
}

const AppSubWrapper = () => {
  const height = useWindowDimensions().height

  return (
    <View style={Platform.OS === 'web' ? { minHeight: height } : { flex: 1 }}>
      <AppNavigator />
      <Toast
        ref={(ref) => {
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
  const [themeState] = useAtom(themeSwitchAtom)
  const theme = getThemeColor(themeState)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
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
        onStateChange={() => {
          const currentRouteName =
            RootNavigator.navigationRef.current.getCurrentRoute()?.name
          routeNameRef.current = currentRouteName
        }}
        theme={theme}
        linking={{ enabled: true }}
      >
        <JotaiProvider>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <AppSubWrapper />
            </SafeAreaProvider>
          </QueryClientProvider>
        </JotaiProvider>
      </NavigationContainer>
    </PaperProvider>
  )
}
