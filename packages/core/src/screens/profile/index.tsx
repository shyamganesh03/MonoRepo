import { ScreenLayout } from '@libs/utils'
import { Suspense, useCallback, useState } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigation } from '@react-navigation/native'
import { deleteItemAsync, getItemAsync } from '@izzo/shared-async-storage'
import auth from '@react-native-firebase/auth'
import { checkEmailExists } from '@izzo/api/src/auth'

const Profile = () => {
  const [drunkMode, setDrunkMode] = useState(false)
  const [userDetail, setUserDetail] = useState<any>({ email: '', error: '' })

  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )

  const navigation: any = useNavigation()

  const { data: userDetails, isFetching } = useQuery({
    queryKey: ['userDetails'],
    queryFn: async () => {
      const details: any = await getItemAsync('userDetails')
      const finalData = await JSON.parse(details || {})
      return { ...finalData, nam: finalData.name + finalData.surName }
    },
    initialData: {},
  })

  const handleSignOut = async () => {
    await auth()
      .signOut()
      .catch((error) => console.log({ error }))
    deleteItemAsync('userDetails')
    navigation.navigate('loginAndSignUp')
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

  const handleLogin = async () => {
    const isExists = await checkEmailExists(userDetail.email)
    if (isExists) {
      navigation.navigate('login', { email: userDetail.email })
    } else {
      navigation.navigate('register', { email: userDetail.email })
    }
  }

  const viewProps = {
    drunkMode,
    userDetail,
    userDetails,
    isFetching,
    handleToggleDrunkMode,
    handleLogin,
    handleNavigation,
    handleSignOut,
    setDrunkMode,
    setUserDetail,
  }
  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default Profile
