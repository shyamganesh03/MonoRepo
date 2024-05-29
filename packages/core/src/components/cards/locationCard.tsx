import { Platform, View } from 'react-native'
import React from 'react'
import { spacing } from '@libs/theme'
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from 'react-native-maps'

interface LocationCardProps {
  latitude: number
  longitude: number
  height?: number
  width?: number
  borderRadius?: number
  latitudeDelta?: number
}

const LocationCard = ({
  latitude,
  longitude,
  height = 151,
  width = 230,
  borderRadius = 10,
  latitudeDelta = 0.0922,
}: LocationCardProps) => {
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
    <View
      style={{
        marginVertical: spacing.spacing6,
        height: height,
        width: width,
        borderRadius: borderRadius,
        overflow: 'hidden',
      }}
    >
      <MapView
        provider={getProvider()}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
        scrollEnabled={false}
        zoomEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}
        style={{
          height: height,
          width: width,
        }}
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
        />
      </MapView>
    </View>
  )
}

export default LocationCard
