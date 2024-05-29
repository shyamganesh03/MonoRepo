import { ScreenLayout } from '@libs/utils'
import { Suspense, useCallback } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import React from 'react'

const Genres = () => {
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )

  const viewProps = {}
  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default Genres
