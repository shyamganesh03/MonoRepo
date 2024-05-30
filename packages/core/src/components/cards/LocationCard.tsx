import { Platform, View } from 'react-native'
import React from 'react'
import { spacing } from '@libs/theme'
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from 'react-native-maps'
import { Surface, useTheme } from 'react-native-paper'
import { Flex, Text } from '@libs/components'
import { useTranslation } from 'react-i18next'

interface LocationCardProps {
  height?: number
  width?: number
  borderRadius?: number
  latitudeDelta?: number
  eventData: any
}

const LocationCard = ({
  height = 151,
  width = 230,
  borderRadius = 10,
  latitudeDelta = 0.0922,
  eventData,
}: LocationCardProps) => {
  const { t } = useTranslation()
  const { colors } = useTheme<any>()
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
    <Surface style={{ padding: 20, borderRadius: 10 }}>
      <Text variant="heading2">{t('EVENT_DETAIL.LOCATION')}</Text>
      <Flex direction="column" style={{ marginTop: spacing.spacing2 }}>
        <Text variant="bodyBold1" style={{ color: colors.primary }}>
          {eventData?.company?.name}
        </Text>
        <Text variant="body2">{eventData?.company?.address}</Text>
      </Flex>
      <Flex direction="column">
        {coordinates?.length > 1 && (
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
                latitude: coordinates[0],
                longitude: coordinates[1],
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
                  latitude: coordinates[0],
                  longitude: coordinates[1],
                }}
              />
            </MapView>
          </View>
        )}
        <Text variant="heading2">{t('LOCATION_CARD.TICKETS')}</Text>
        <Text variant="body2">
          {' '}
          {t('LOCATION_CARD.PRICES_FROM')} {eventData?.fromPrice}
        </Text>
      </Flex>
    </Surface>
  )
}

export default LocationCard
