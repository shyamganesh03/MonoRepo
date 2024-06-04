import { Platform, View } from 'react-native'
import React from 'react'
import { spacing } from '@libs/theme'
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from 'react-native-maps'
import { Surface, useTheme } from 'react-native-paper'
import { Button, Flex, Text } from '@libs/components'
import { useTranslation } from 'react-i18next'
import { locationCardMapStyle } from '../../constants'
import { Icon } from '@libs/native-icons'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'

interface LocationCardProps {
  height?: number
  width?: any
  borderRadius?: number
  latitudeDelta?: number
  eventData: any
}

const LocationCard = ({
  height = 151,
  width = 335,
  borderRadius = 10,
  latitudeDelta = 0.0922,
  eventData,
}: LocationCardProps) => {
  const { t } = useTranslation()
  const { colors } = useTheme<any>()
  const navigation: any = useNavigation()

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
    <Surface style={{ padding: spacing.spacing6, borderRadius: 10 }}>
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
              maxWidth: width,
              borderRadius: borderRadius,
              overflow: 'hidden',
            }}
          >
            <MapView
              provider={getProvider()}
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
              <Marker
                coordinate={{
                  latitude: Number(coordinates[0]),
                  longitude: Number(coordinates[1]),
                }}
              >
                <Icon name="Pin2" />
              </Marker>
            </MapView>
          </View>
        )}

        {eventData?.fromPrice && (
          <>
            <Text variant="heading2">{t('LOCATION_CARD.TICKETS')}</Text>
            <Text variant="body2">
              {t('LOCATION_CARD.PRICES_FROM')} {eventData?.fromPrice}
            </Text>
          </>
        )}
      </Flex>
      <LinearGradient
        colors={colors.gradient.primary}
        style={{
          marginTop: spacing.spacing4,
          borderRadius: 16,
        }}
      >
        <Button
          onPress={() =>
            navigation.navigate('webView', {
              uri: eventData?.ticketLink,
            })
          }
          mode="contained"
          label={t('BUTTON.BUY_TICKETS')}
          labelVariant="bodyBold1"
          labelStyle={{ color: colors.textPrimary }}
          disabled={!eventData?.ticketLink}
        />
      </LinearGradient>
    </Surface>
  )
}

export default LocationCard
