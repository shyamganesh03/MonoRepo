import { Platform } from 'react-native'
import React from 'react'
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from 'react-native-maps'
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
  const getProvider = () => {
    if (Platform.OS === 'android') {
      return PROVIDER_GOOGLE
    }
    if (Platform.OS === 'ios') {
      return PROVIDER_DEFAULT
    }
    return PROVIDER_DEFAULT
  }
  return (
    <MapView
      provider={getProvider()}
      customMapStyle={locationCardMapStyle}
      initialRegion={{
        latitude: Number(coordinates),
        longitude: Number(coordinates),
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
      <Marker
        coordinate={{
          latitude: Number(coordinates),
          longitude: Number(coordinates),
        }}
      >
        <Icon name="Pin2" />
      </Marker>
    </MapView>
  )
}

export default Map
