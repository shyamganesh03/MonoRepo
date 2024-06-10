import { Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from 'react-native-maps'
import { Icon } from '@libs/native-icons'
import { useTheme } from 'react-native-paper'
import { locationCardMapStyle } from './constants'
import { mapScreenMapStyle } from './constants/mapStyle'

interface LocationCardProps {
  height?: number
  width?: number
  borderRadius?: number
  latitudeDelta?: number
  isEventDetail?: boolean
  markers?: any
  eventData?: any
  selectedMarker?: number
  setSelectedMarker?: any
  region?: any
  setRegion?: any
  mapRef?: any
}

const Map = ({
  height = 151,
  width = 335,
  latitudeDelta = 0.0922,
  eventData,
  markers = [],
  isEventDetail = false,
  selectedMarker,
  setSelectedMarker,
  mapRef,
}: LocationCardProps) => {
  const [coordinates, setCoordinates] = useState([])
  const { colors } = useTheme()
  const longitudeDelta = latitudeDelta * (height / width)

  useEffect(() => {
    ;(async () => {
      if (isEventDetail) {
        const coordinateData =
          eventData?.location?.coordinates?.split(',') || []
        setCoordinates(coordinateData)
      } else {
        const currentUserLocationCoordinates =
          markers[markers.length - 1]?.coordinates
        const coordinateData = [
          currentUserLocationCoordinates.latitude,
          currentUserLocationCoordinates.longitude,
        ]
        setCoordinates(coordinateData)
      }
    })()
  }, [])

  const getProvider: any = () => {
    if (Platform.OS === 'android') {
      return PROVIDER_GOOGLE
    }
    if (Platform.OS === 'ios') {
      return PROVIDER_DEFAULT
    }
    return PROVIDER_DEFAULT
  }

  if (coordinates.length > 0) {
    return (
      <MapView.Animated
        ref={mapRef}
        provider={getProvider()}
        customMapStyle={
          isEventDetail ? locationCardMapStyle : mapScreenMapStyle
        }
        initialRegion={{
          latitude: Number(coordinates[0]),
          longitude: Number(coordinates[1]),
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
        scrollEnabled={!isEventDetail}
        pitchEnabled={!isEventDetail}
        rotateEnabled={!isEventDetail}
        style={{
          height: height,
          maxWidth: width,
          backgroundColor: colors.background,
        }}
      >
        {markers.length > 0 ? (
          markers.map((markerData: any, index: number) => {
            return (
              <Marker
                key={index}
                coordinate={markerData.coordinates}
                // title={markerData.title}
                onSelect={() => {
                  setSelectedMarker(index)
                }}
              >
                {markerData.isUserLocation ? (
                  <Icon color={colors.primary} name="LocateFixedIcon" />
                ) : (
                  <Icon
                    name={selectedMarker === index ? 'Pin2' : 'Pin'}
                    color={
                      selectedMarker === index
                        ? colors.primary
                        : colors.onSecondary
                    }
                  />
                )}
              </Marker>
            )
          })
        ) : (
          <Marker
            coordinate={{
              latitude: Number(coordinates[0]),
              longitude: Number(coordinates[1]),
            }}
          >
            <Icon name="Pin2" />
          </Marker>
        )}
      </MapView.Animated>
    )
  }
}

export default Map
