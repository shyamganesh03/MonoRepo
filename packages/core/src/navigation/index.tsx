import React, { Suspense } from 'react'
import Stacks from './stack'
import { View } from 'react-native'
import { BottomNavLayout } from '../components/index'

export function AppNavigator() {
  return (
    <Suspense>
      <View style={{ flex: 1 }}>
        <Stacks />
        <BottomNavLayout />
      </View>
    </Suspense>
  )
}
