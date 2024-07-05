import React from 'react'
import { View, Platform, useWindowDimensions } from 'react-native'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Toast from 'react-native-toast-notifications'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as JotaiProvider } from 'jotai'

import { ThemeProvider } from '@libs/theme'
import { Analytics } from '@libs/utils'
import '@izzo/shared-translation'

import * as RootNavigator from './navigation/RootNavigator'
import { AppNavigator } from './navigation'

Analytics.init()

const AppSubWrapper = () => {
  const height = useWindowDimensions().height

  return (
    <ThemeProvider>
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
        linking={{ enabled: true, prefixes: [] }}
      >
        <View
          style={Platform.OS === 'web' ? { minHeight: height } : { flex: 1 }}
        >
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
      </NavigationContainer>
    </ThemeProvider>
  )
}

export const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          <AppSubWrapper />
        </JotaiProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
