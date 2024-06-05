import React, { useState, useEffect, useRef } from 'react'
import { BackHandler, View } from 'react-native'
import { WebView as WebViewComponent } from 'react-native-webview'
import { Flex, IconButton, Loader, Text } from '@libs/components'
import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { t } from 'i18next'
import { getItemAsync } from '@izzo/async-local-storage'

const WebView = (props: any) => {
  const [currentUrl, setCurrentUrl] = useState(props?.uri)
  const [canGoBack, setCanGoBack] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [targetLanguage, setTargetLanguage] = useState('')
  const webViewRef: any = useRef(null)
  const { colors } = useTheme<any>()
  const navigation = useNavigation()

  useEffect(() => {
    getItemAsync('preferredLanguage').then((res: any) => setTargetLanguage(res))
  }, [])

  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack()
        return true
      }
      return false
    }

    BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }
  }, [canGoBack])

  useEffect(() => {
    if (props?.uri) {
      setCurrentUrl(props?.uri)
    }
  }, [props?.uri])

  return (
    <>
      {!isLoading && (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            alignItems: 'center',
            paddingVertical: 12,
            columnGap: 10,
            backgroundColor: colors.textSecondary,
          }}
        >
          <IconButton
            name="CloseRoundIcon"
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Flex direction="column">
            <Text color={colors.textPrimary} variant="labelMedium">
              {t('IZZ0')}
            </Text>
            <Text
              color={colors.textPrimary}
              variant="labelMedium"
              numberOfLines={1}
            >
              {props?.uri}
            </Text>
          </Flex>
        </View>
      )}
      <WebViewComponent
        source={{
          uri: currentUrl?.includes('izzo')
            ? `https://translate.google.com/translate?sl=auto&tl=${targetLanguage}&u=${props?.uri}`
            : currentUrl,
        }}
        startInLoadingState
        onContentProcessDidTerminate={() => webViewRef.current.reload()}
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack)
          setCurrentUrl(navState.url)
        }}
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
        ref={webViewRef}
        allowsFullscreenVideo
        androidLayerType="hardware"
        mixedContentMode="always"
        renderLoading={() => (
          <View
            style={{
              flex: 1,
              position: 'absolute',
              height: '100%',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.background,
            }}
          >
            <Loader animating color={colors.textPrimary} size="small" />
          </View>
        )}
        style={{ marginTop: -60 }}
      />
    </>
  )
}

export default WebView
