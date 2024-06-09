import { ScreenLayout } from '@libs/utils'
import { Suspense, useCallback, useState } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { getRegions } from '@izzo/api'
import { deleteItemAsync, getItemAsync } from '@izzo/shared-async-storage'
import {
  handleCreateOrUpdateUserData,
  handleDeleteAccount,
} from '@izzo/api/src/auth'

const ProfileSettings = () => {
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )
  const navigation: any = useNavigation()

  const { data: regionsData } = useQuery({
    queryKey: ['getRegions'],
    queryFn: () => getRegions(),
  })

  const [userDetails, setUserDetails] = useState<any>({
    name: '',
    surname: '',
    email: '',
    phone: '',
    street: '',
    region: '',
    isSendOffersAndNews: true,
  })

  const {} = useQuery({
    queryKey: ['userDetails'],
    queryFn: async () => {
      const details: any = await getItemAsync('userDetails')
      let finalData = await JSON.parse(details || {})
      finalData = {
        ...userDetails,
        ...finalData,
      }
      setUserDetails(finalData)
      return finalData
    },
    initialData: {},
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
  const saveUserDetails = async () => {
    await handleCreateOrUpdateUserData(userDetails.email, userDetails)
  }

  const handleAccountDelete = async () => {
    try {
      await handleDeleteAccount(userDetails.email)
      deleteItemAsync('userDetails')

      //@ts-ignore
      toast.hideAll()
      //@ts-ignore
      toast.show('Your account is deleted successfully.', {
        type: 'success',
      })
      navigation.navigate('login')
    } catch (error) {}
  }

  const viewProps = {
    userDetails,
    regionsData,
    saveUserDetails,
    handleChangeText,
    handleAccountDelete,
    handleBackNavigation,
  }
  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default ProfileSettings
