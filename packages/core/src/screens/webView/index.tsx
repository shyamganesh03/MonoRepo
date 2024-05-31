import React, { useState, useEffect, useRef } from 'react'
import { BackHandler, View } from 'react-native'
import { WebView as WebViewComponent } from 'react-native-webview'
import { Loader } from '@libs/components'
import { useTheme } from 'react-native-paper'

const WebView = (props: any) => {
  const [currentUrl, setCurrentUrl] = useState(props.route?.params?.uri)
  const [canGoBack, setCanGoBack] = useState(false)
  const webViewRef: any = useRef(null)
  const { colors } = useTheme<any>()

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
    if (props.route?.params?.uri) {
      setCurrentUrl(props.route.params.uri)
    }
  }, [props.route?.params?.uri])

  return (
    <WebViewComponent
      source={{ uri: currentUrl }}
      startInLoadingState
      onContentProcessDidTerminate={() => webViewRef.current.reload()}
      onNavigationStateChange={(navState) => {
        setCanGoBack(navState.canGoBack)
        setCurrentUrl(navState.url)
      }}
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
    />
  )
}

export default WebView
