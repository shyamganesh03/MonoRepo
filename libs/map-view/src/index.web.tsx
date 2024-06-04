import React from 'react'
import MapView from 'react-native-web-maps'
import { Icon } from '@libs/native-icons'
import { locationCardMapStyle } from './constants'

interface LocationCardProps {
  height?: number
  width?: any
  borderRadius?: number
  latitudeDelta?: number
  eventData: any
}

const Map = ({
  height = 151,
  width = 335,
  latitudeDelta = 0.0922,
  eventData,
}: LocationCardProps) => {
  const coordinates = eventData?.location?.coordinates?.split(',') || []

  const longitudeDelta = latitudeDelta * (height / width)

  return (
    <MapView
      provider="google"
      customMapStyle={locationCardMapStyle}
      initialRegion={{
        latitude: Number(coordinates[0]),
        longitude: Number(coordinates[1]),
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      }}
      scrollEnabled={false}
      zoomEnabled={false}
      pitchEnabled={false}
      rotateEnabled={false}
      style={{
        height: height,
        maxWidth: width,
      }}
    >
      <MapView.Marker
        coordinate={{
          latitude: Number(coordinates[0]),
          longitude: Number(coordinates[1]),
        }}
      >
        <Icon name="Pin2" />
      </MapView.Marker>
    </MapView>
  )
}

export default Map
