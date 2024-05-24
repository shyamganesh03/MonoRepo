import React, { Suspense } from 'react'
import Tabs from './tabs'

export function AppNavigator() {
  return (
    <Suspense>
      <Tabs />
    </Suspense>
  )
}
