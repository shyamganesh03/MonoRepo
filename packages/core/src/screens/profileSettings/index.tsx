import { ScreenLayout } from '@libs/utils'
import { Suspense, useCallback, useState } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { getRegions } from '@izzo/api'

const ProfileSettings = () => {
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )
  const navigation = useNavigation()

  const { data: regionsData } = useQuery({
    queryKey: ['getRegions'],
    queryFn: () => getRegions(),
  })

  const [userDetails, setUserDetails] = useState({
    name: 'Logesh',
    surname: 'Incresco',
    email: 'logeshwaran.t@increscotech.com',
    phone: '99776363739',
    street: 'Balcon City',
    region: 'Bern',
    isSendOffersAndNews: true,
  })

  const handleBackNavigation = () => {
    navigation.goBack()
  }

  const handleChangeText = (key: string, value: string) => {
    setUserDetails((prevUserDetails: any) => ({
      ...prevUserDetails,
      [key]: value,
    }))
  }
  const saveUserDetails = () => {
    console.log(userDetails)
  }

  const viewProps = {
    handleBackNavigation,
    userDetails,
    regionsData,
    saveUserDetails,
    handleChangeText,
  }
  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default ProfileSettings
