import React, { Suspense } from 'react'
import Stacks from './stack'
import Tabs from './tabs'
import Stacks from './stack'


export function AppNavigator() {
  return (
    <Suspense>
      <Stacks />
    </Suspense>
  )
}
