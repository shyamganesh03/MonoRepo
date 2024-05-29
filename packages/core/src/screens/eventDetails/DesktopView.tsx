import { View, ScrollView } from 'react-native'
import React from 'react'
import { DesktopContainer } from '@libs/container'

const DesktopView = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <DesktopContainer style={{ gap: 1, flex: 1 }}></DesktopContainer>
      </ScrollView>
    </View>
  )
}

export default DesktopView
