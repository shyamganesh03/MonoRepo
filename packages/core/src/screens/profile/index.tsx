import { ScreenLayout } from '@libs/utils'
import { Suspense, useCallback, useState } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigation } from '@react-navigation/native'
import { getItemAsync } from '../../../../shared-async-storage' 
import auth from '@react-native-firebase/auth'

const Profile = () => {
  const [drunkMode, setDrunkMode] = useState(false)
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )

  const navigation:any = useNavigation()

  const { data: userDetails } = useQuery({
    queryKey: ['userDetails'],
    queryFn: () => {
      const details = getItemAsync('userDetails');
      return details;
    },
   initialData: null
  })
  

  const handleSignOut= async()=>{
   await auth().signOut().catch(((error) => console.log({error})))
   navigation.navigate('login')
  }
  const handleNavigation = (path: string, isWeb: boolean) => {
    if (isWeb && path.endsWith('.pdf')) {
      return navigation.navigate('pdfView', { uri: path })
    }
    if (isWeb) {
      return navigation.navigate('webView', { uri: path })
    }
    navigation.navigate(path)
  }

  const handleToggleDrunkMode = () => {
    setDrunkMode(!drunkMode)
  }

  const handleLogin = () => {

  }

  const viewProps = {
    drunkMode,
    userDetails,
    handleToggleDrunkMode,
    handleLogin,
    handleNavigation,
    handleSignOut,
    setDrunkMode,
  }
  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default Profile
