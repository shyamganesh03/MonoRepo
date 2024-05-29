import React, { Suspense } from 'react'
import Stacks from './stack'


export function AppNavigator() {
  return (
    <Suspense>
      <Stacks />
    </Suspense>
  )
}
