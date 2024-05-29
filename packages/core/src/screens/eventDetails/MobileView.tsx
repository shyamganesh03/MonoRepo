import { ScrollView, Linking } from 'react-native'
import React from 'react'
import { MobileContainer } from '@libs/container'
import { ImagePlaceHolder } from 'assets'
import {
  Button,
  Card,
  Flex,
  IconButton,
  Image,
  Tag,
  Text,
  Wrap,
} from '@libs/components'
import { useTheme } from 'react-native-paper'
import { spacing } from '@libs/theme'
import { dateformat, getDayName } from '@libs/utils'
import { useTranslation } from 'react-i18next'
import LinearGradient from 'react-native-linear-gradient'
import { LocationCard } from '../../components'
import { ShimmerPlaceholder } from '@libs/skeletons'

const MobileView = ({ eventData, showMore, setShowMore, isLoading }: any) => {
  const { colors } = useTheme<any>()
  const { t } = useTranslation()
  const coordinates = eventData?.location?.coordinates?.split(',') || []

  if (isLoading) {
    return (
      <MobileContainer
        style={{ gap: spacing.spacing7, flex: 1 }}
        backgroundColor={colors.background}
      >
        <ShimmerPlaceholder
          style={{ height: 300, width: 300, borderRadius: 10 }}
        />
        <Flex direction="column" style={{ gap: 20, alignItems: 'center' }}>
          <ShimmerPlaceholder
            style={{ height: 40, width: 200, borderRadius: 50 }}
          />
          <ShimmerPlaceholder
            style={{ height: 40, width: 40, borderRadius: 50 }}
          />
          <ShimmerPlaceholder
            style={{ height: 45, width: 200, borderRadius: 50 }}
          />
        </Flex>
        <ShimmerPlaceholder
          style={{ height: 45, width: 200, borderRadius: 10 }}
        />
        <ShimmerPlaceholder
          style={{ height: 45, width: 100, borderRadius: 10 }}
        />
      </MobileContainer>
    )
  }

  return (
    <ScrollView>
      <MobileContainer
        style={{ gap: spacing.spacing7, flex: 1 }}
        backgroundColor={colors.background}
      >
        <Image image={ImagePlaceHolder} size={300} borderRadius={10} />
        <Flex
          direction="column"
          style={{ paddingBottom: spacing.spacing7, alignItems: 'center' }}
        >
          <Text variant="heading2">{eventData?.name}</Text>
          <Text variant="body1">
            {' '}
            {t('EVENT_DETAIL.BY')} {eventData?.company?.name}{' '}
          </Text>
          <IconButton
            name="ShareIcon"
            color={colors.textPrimary}
            style={{
              paddingTop: spacing.spacing4,
              paddingBottom: spacing.spacing7,
            }}
          />
          <Button
            mode="outlined"
            label={t('BUTTON.SAVE_EVENT')}
            labelStyle={{ color: colors.textPrimary }}
            style={{
              borderColor: colors.onBackground,
              borderWidth: 2,
              marginBottom: spacing.spacing3,
            }}
          />
          {/* <Text variant="utility2">
            {' '}
            Gespeichert von <Text color={colors.primary}>420 </Text>anderen
          </Text> */}
        </Flex>
        <Flex direction="column" style={{ gap: spacing.spacing3 }}>
          <Text variant="heading2">{t('EVENT_DETAIL.WHEN')}</Text>
          <Text variant="body1">
            {' '}
            {getDayName(eventData?.startDate)}{' '}
            <Text color={colors.primary} variant="bodyBold1">
              {dateformat(eventData?.startDate)}{' '}
            </Text>
            {t('EVENT_DETAIL.FROM')}{' '}
            <Text color={colors.primary} variant="bodyBold1">
              {eventData?.startTime}
            </Text>
          </Text>
        </Flex>
        <Flex direction="column" style={{ gap: spacing.spacing3 }}>
          <Text variant="heading2">{t('EVENT_DETAIL.GENRE')}</Text>
          <Wrap style={{ gap: 10 }}>
            {eventData?.genres?.map((genreData: any, index: number) => {
              return (
                <Tag
                  style={{ backgroundColor: colors.primary, borderRadius: 100 }}
                  label={genreData?.genre}
                  textVariant="bodyCompactBold2"
                  key={index}
                />
              )
            })}
          </Wrap>
        </Flex>
        <Flex direction="column" style={{ gap: spacing.spacing3 }}>
          <Text variant="heading2">{t('EVENT_DETAIL.AGE_RESTRICTION')}</Text>
          <Text variant="bodyBold1">
            {t('EVENT_DETAIL.WOMEN')}{' '}
            <Text color={colors.primary} variant="bodyBold1">
              {eventData?.ageRestrictionWomen}+
            </Text>
          </Text>
          <Text variant="bodyBold1">
            {t('EVENT_DETAIL.MEN')}{' '}
            <Text color={colors.primary} variant="bodyBold1">
              {eventData?.ageRestrictionMen}+
            </Text>
          </Text>
        </Flex>
        <Flex direction="column" style={{ gap: spacing.spacing3 }}>
          <Text variant="heading2">{t('EVENT_DETAIL.DESCRIPTION')}</Text>
          <Text variant="utility2" numberOfLines={!showMore ? 4 : 0}>
            {eventData?.pressText}
          </Text>
          <Button
            mode="text"
            label={showMore ? t('BUTTON.SHOW_LESS') : t('BUTTON.SHOW_MORE')}
            style={{ width: 100 }}
            labelStyle={{ color: colors.primary }}
            onPress={() => setShowMore(!showMore)}
          />
        </Flex>
        <Flex direction="column">
          <Card
            style={{ padding: 20 }}
            title={<Text variant="heading2">{t('EVENT_DETAIL.LOCATION')}</Text>}
            subtitle={
              <Flex direction="column">
                <Text variant="bodyBold1" style={{ color: colors.primary }}>
                  {eventData?.company?.name}
                </Text>
                <Text variant="body2">{eventData?.company?.address}</Text>
              </Flex>
            }
            subtitleStyle={{
              marginTop: spacing.spacing3,
            }}
            content={
              <Flex direction="column">
                {coordinates?.length > 1 && (
                  <LocationCard
                    latitude={Number(coordinates[0])}
                    longitude={Number(coordinates[1])}
                  />
                )}
                <Text variant="heading2">{t('LOCATION_CARD.TICKETS')}</Text>
                <Text variant="body2">
                  {' '}
                  {t('LOCATION_CARD.PRICES_FROM')} {eventData?.fromPrice}
                </Text>
              </Flex>
            }
            actionContent={
              <LinearGradient
                colors={colors.gradient.primary}
                style={{ flex: 1, borderRadius: 12 }}
              >
                <Button
                  label={t('BUTTON.BUY_TICKETS')}
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    borderRadius: 12,
                  }}
                  labelStyle={{ color: colors.textPrimary }}
                />
              </LinearGradient>
            }
          />
        </Flex>
        <Flex
          direction="row"
          style={{ gap: spacing.spacing7, justifyContent: 'center' }}
        >
          <IconButton name="FacebookIcon" color={colors.textPrimary} />
          <IconButton
            name="InstagramIcon"
            color={colors.textPrimary}
            onPress={() => {
              Linking.openURL(eventData?.company?.socialMedia)
            }}
          />
          <IconButton name="BrowserIcon" color={colors.textPrimary} />
        </Flex>
      </MobileContainer>
    </ScrollView>
  )
}

export default MobileView
