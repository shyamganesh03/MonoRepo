import React from 'react'
import { MobileContainer } from '@libs/container'
import { ScrollView, View } from 'react-native'
import { Text } from '@libs/components'

const MobileView = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <MobileContainer style={{ gap: 10 }}>
          <Text>hi</Text>
        </MobileContainer>
      </ScrollView>
    </View>
  )
}

export default MobileView
