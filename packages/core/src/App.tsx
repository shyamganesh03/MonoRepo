import React, { useEffect, useRef } from 'react'
import {
  View,
  Platform,
  useWindowDimensions,
  PermissionsAndroid,
} from 'react-native'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Toast from 'react-native-toast-notifications'
import { NavigationContainer, useIsFocused } from '@react-navigation/native'
import {
  LightTheme as LightThemeColors,
  DarkTheme as DarkThemeColors,
  spacing,
  typography as customVariants,
} from '@libs/theme'
import { Analytics } from '@libs/utils'
import * as RootNavigator from './navigation/RootNavigator'
import { AppNavigator } from './navigation'
import { useAtom, Provider as JotaiProvider } from 'jotai'
import { themeSwitchAtom } from '@izzo/jotai-storage'
import '@izzo/shared-translation'
import {
  MD2DarkTheme,
  MD2LightTheme,
  PaperProvider,
  configureFonts,
} from 'react-native-paper'
import notificationService from './utils/notificationHandler'
import { setItemAsync, getItemAsync } from '@izzo/shared-async-storage'

Analytics.init()

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

const createCustomTheme = (baseTheme: any, customColors: any) => ({
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    ...customColors.colors,
  },
  fonts: configureFonts({
    config: { ...fontConfig, ...customVariants },
    isV3: false,
  }),
  spacing,
})

const customLightTheme = createCustomTheme(MD2LightTheme, LightThemeColors)
const customDarkTheme = createCustomTheme(MD2DarkTheme, DarkThemeColors)

const getThemeColor = (themeState: string) => {
  switch (themeState) {
    case 'dark':
      return customDarkTheme
    case 'light':
      return customLightTheme
    default:
      return customDarkTheme
  }
}

const AppSubWrapper = () => {
  const height = useWindowDimensions().height
  const isFocused = useIsFocused()
  const checkRequiredPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      )
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
    }
  }

  useEffect(() => {
    if (!isFocused) return
    ;(async () => {
      await checkRequiredPermission()
      await notificationService()
      getItemAsync('preferredLanguage').then((language: any) => {
        if (!language) {
          setItemAsync('preferredLanguage', 'de')
        }
      })
    })()
  }, [isFocused])

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
        linking={{ enabled: true, prefixes: [] }}
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
