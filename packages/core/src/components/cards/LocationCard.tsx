import { View } from 'react-native'
import React from 'react'
import { spacing } from '@libs/theme'
import { Surface, useTheme } from 'react-native-paper'
import { Button, Flex, Text } from '@libs/components'
import { useTranslation } from 'react-i18next'
import Map from '@libs/map-view/src'
import { useNavigation } from '@react-navigation/native'

interface LocationCardProps {
  height?: number
  width?: any
  borderRadius?: number
  latitudeDelta?: number
  eventData: any
  isPastEvent?: boolean
}

const LocationCard = ({
  height = 151,
  width = 335,
  borderRadius = 10,
  eventData,
  isPastEvent,
}: LocationCardProps) => {
  const { t } = useTranslation()
  const { colors } = useTheme<any>()
  const navigation: any = useNavigation()

  const coordinates = eventData?.location?.coordinates?.split(',') || []

  return (
    <Surface style={{ padding: spacing.spacing6, borderRadius: 10 }}>
      <Text variant="headlineMedium">{t('EVENT_DETAIL.LOCATION')}</Text>
      <Flex direction="column" style={{ marginTop: spacing.spacing2 }}>
        <Text variant="titleLarge" color={colors.primary}>
          {eventData?.company?.name}
        </Text>
        <Text variant="titleMedium">{eventData?.company?.address}</Text>
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
            <Map eventData={eventData} />
          </View>
        )}

        {eventData?.fromPrice && (
          <View style={{ marginBottom: 10 }}>
            <Text variant="headlineMedium">{t('LOCATION_CARD.TICKETS')}</Text>
            <Text variant="titleSmall">
              {t('LOCATION_CARD.PRICES_FROM')} {eventData?.fromPrice}.-
            </Text>
          </View>
        )}
      </Flex>

      {!isPastEvent && (
        <Button
          onPress={() =>
            navigation.navigate('webView', {
              uri: eventData?.ticketLink,
            })
          }
          mode="contained"
          label={t('BUTTON.BUY_TICKETS')}
          labelVariant="titleLarge"
          labelStyle={{ color: colors.textPrimary }}
          disabled={!eventData?.ticketLink}
          isLinearGradient
          gradientColors={colors.gradient.primary}
        />
      )}
    </Surface>
  )
}

export default LocationCard
