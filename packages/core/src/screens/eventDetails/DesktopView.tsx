import { View, ScrollView } from 'react-native'
import React from 'react'
import { DesktopContainer } from '@libs/container'
import LocationCard from '@libs/map-view/src'

const DesktopView = (props: any) => {
  const { eventData } = props
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <DesktopContainer style={{ gap: 1, flex: 1 }}>
          <LocationCard eventData={eventData} />
        </DesktopContainer>
      </ScrollView>
    </View>
  )
}

export default DesktopView
