import React, { Suspense, useCallback } from 'react'
import { ScreenLayout } from '@libs/utils'
import DesktopView from './DesktopView'
import MobileView from './MobileView'

const Auth = () => {
  const viewProps = {}

  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )

  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default Auth
