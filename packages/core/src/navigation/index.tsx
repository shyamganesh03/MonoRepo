import React, { Suspense } from 'react'
import Stacks from './stack'
import Tabs from './tabs'


export function AppNavigator() {
  return (
    <Suspense>
      <Tabs />
    </Suspense>
  )
}
