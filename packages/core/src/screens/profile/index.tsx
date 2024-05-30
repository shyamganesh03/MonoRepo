import { ScreenLayout } from '@libs/utils'
import { Suspense, useCallback, useState } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import React from 'react'
import { useQuery } from '@tanstack/react-query'

const Profile = () => {
  const [drunkMode, setDrunkMode] = useState(false)
  const [email, setEmail] = useState()
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )

  const { data: userDetails } = useQuery({
    queryKey: ['userDetails'],
    queryFn: () => {
      return null
    },
  })

  const handlePress = () => {}
  const handleLogin = () => {}

  const viewProps = {
    drunkMode,
    email,
    userDetails,
    setDrunkMode,
    setEmail,
    handlePress,
    handleLogin,
  }
  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default Profile
