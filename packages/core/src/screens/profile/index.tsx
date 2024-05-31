import { ScreenLayout } from '@libs/utils'
import { Suspense, useCallback, useState } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import React from 'react'
import { useQuery } from '@tanstack/react-query'

const Profile = () => {
  const [drunkMode, setDrunkMode] = useState(false)
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )

  const { data: userDetails, error: userError } = useQuery({
    queryKey: ['userDetails'],
    queryFn: () => {
      return null
    },
  })

  const handleToggleDrunkMode = () => {
    setDrunkMode(!drunkMode)
  }

  const viewProps = {
    drunkMode,
    userDetails,
    handleToggleDrunkMode,
  }
  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default Profile
