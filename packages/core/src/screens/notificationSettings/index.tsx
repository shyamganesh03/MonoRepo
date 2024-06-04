import { ScreenLayout } from '@libs/utils'
import { Suspense, useCallback } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const NotificationSettings = () => {
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )
  const navigation = useNavigation()

  const handleBackNavigation = () => {
    navigation.goBack()
  }

  const viewProps = { handleBackNavigation }
  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default NotificationSettings
