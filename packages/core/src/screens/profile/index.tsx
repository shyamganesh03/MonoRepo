import { ScreenLayout } from '@libs/utils'
import { Suspense, useCallback, useState } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigation } from '@react-navigation/native'

const Profile = () => {
  const [drunkMode, setDrunkMode] = useState(false)
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )

  const navigation = useNavigation()

  const user = { email: 'logeshwaran.t@increscotech.com', name: 'Logeshwaran ' }

  const { data: userDetails } = useQuery({
    queryKey: ['userDetails'],
    queryFn: () => {
      return null
    },
  })

  const handleNavigation = (path: string, isWeb: boolean) => {
    if (isWeb && path.endsWith('.pdf')) {
      return navigation.navigate('pdfview', { uri: path })
    }
    if (isWeb) {
      return navigation.navigate('webView', { uri: path })
    }
    navigation.navigate(path)
  }

  const handleToggleDrunkMode = () => {
    setDrunkMode(!drunkMode)
  }

  const handleLogin = () => {}

  const viewProps = {
    drunkMode,
    userDetails,
    handleToggleDrunkMode,
    handleLogin,
    setDrunkMode,
    handleNavigation,
  }
  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default Profile
