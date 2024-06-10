import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { MobileContainer } from '@libs/container'
import { ImagePlaceHolder } from 'assets'
import {
  Button,
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
import { ShimmerPlaceholder } from '@libs/skeletons'
import { useNavigation } from '@react-navigation/native'
import { Share } from '@libs/share'
import { Icon } from '@libs/native-icons'
import { LocationCard } from '../../components'

interface MobileViewProps {
  eventData: any
  showMore: boolean
  setShowMore: (showMore: boolean) => void
  isLoading: boolean
  isPastEvent: boolean
}

const MobileView: React.FC<MobileViewProps> = ({
  eventData,
  showMore,
  setShowMore,
  isLoading,
  isPastEvent,
}) => {
  const { colors } = useTheme<any>()
  const { t } = useTranslation()
  const navigation: any = useNavigation()

  if (isLoading) {
    return (
      <MobileContainer
        style={{ gap: spacing.spacing7, flex: 1 }}
        backgroundColor={colors.background}
      >
        <ShimmerPlaceholder
          style={{ height: 40, width: 40, borderRadius: 50 }}
        />
        <ShimmerPlaceholder
          style={{
            height: 300,
            width: 300,
            borderRadius: 10,
            alignSelf: 'center',
          }}
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
        <IconButton
          name="ArrowLeftIcon"
          color={colors.textPrimary}
          onPress={() => navigation.goBack()}
        />
        {eventData.flyerActive && (
          <Image
            imageUrl={ImagePlaceHolder}
            size={300}
            borderRadius={10}
            style={{ alignSelf: 'center' }}
          />
        )}
        {isPastEvent && (
          <Flex
            direction="column"
            style={{
              alignItems: 'center',
              gap: spacing.spacing5,
              backgroundColor: colors.onPrimaryContainer,
              padding: spacing.spacing5,
              borderRadius: spacing.spacing5,
            }}
          >
            <Icon name="InformationCircle" />
            <Text color={colors.neutral} variant="titleMedium">
              {t('EVENT_DETAIL.PAST_EVENT_HEADING')}
            </Text>
            <TouchableOpacity>
              <Text
                variant="titleLarge"
                color={colors.primary}
                textDecorationLine="underline"
              >
                {t('BUTTON.SHOW_CURRENT_EVENT')}
              </Text>
            </TouchableOpacity>
          </Flex>
        )}
        <Flex
          direction="column"
          style={{ paddingBottom: spacing.spacing7, alignItems: 'center' }}
        >
          <Text variant="headlineMedium" color={colors.textPrimary}>
            {eventData?.name}
          </Text>
          <Text variant="bodyLarge" color={colors.textPrimary}>
            {t('EVENT_DETAIL.BY')} {eventData?.company?.name}
          </Text>
          <Share
            itemID={eventData?.id}
            style={{
              paddingTop: spacing.spacing4,
              paddingBottom: spacing.spacing7,
            }}
            data={{
              title: eventData?.name,
              text: eventData?.pressText,
              appUrl: 'www.izzo-app.com',
              pathName: 'event',
              params: { eventId: eventData?.id },
            }}
          >
            <Icon name="ShareIcon" color={colors.textPrimary} />
          </Share>
          <Button
            mode="outlined"
            label={t('BUTTON.SAVE_EVENT')}
            labelStyle={{ color: colors.textPrimary }}
            labelVariant="bodyMedium"
            style={{
              borderColor: colors.onBackground,
              borderWidth: 2,
              marginBottom: spacing.spacing3,
              width: 200,
            }}
            onPress={() => {}}
          />
          <Text variant="labelMedium" color={colors.textPrimary}>
            {t('EVENT_CARD.SAVED_BY')}{' '}
            <Text variant="labelLarge" color={colors.primary}>
              {eventData?.savedCount || 0}
            </Text>{' '}
            {t('EVENT_CARD.OTHERS')}{' '}
          </Text>
        </Flex>
        <Flex direction="column" style={{ gap: spacing.spacing3 }}>
          <Text variant="headlineMedium">{t('EVENT_DETAIL.WHEN')}</Text>
          <Text variant="titleXL">
            {getDayName(eventData?.startDate)}{' '}
            <Text color={colors.primary} variant="headlineSmall">
              {dateformat(eventData?.startDate)}{' '}
            </Text>
            {t('EVENT_DETAIL.FROM')}{' '}
            <Text color={colors.primary} variant="headlineSmall">
              {eventData?.startTime}
            </Text>
          </Text>
        </Flex>
        <Flex direction="column" style={{ gap: spacing.spacing3 }}>
          <Text variant="headlineMedium">{t('EVENT_DETAIL.GENRE')}</Text>
          <Wrap style={{ gap: 10 }}>
            {eventData?.genres?.map((genreData: any, index: number) => (
              <Tag
                style={{ backgroundColor: colors.primary, borderRadius: 100 }}
                label={genreData?.genre}
                textVariant="bodyMedium"
                key={index}
              />
            ))}
          </Wrap>
        </Flex>
        <Flex direction="column" style={{ gap: spacing.spacing3 }}>
          <Text variant="headlineMedium">
            {t('EVENT_DETAIL.AGE_RESTRICTION')}
          </Text>
          <Text variant="titleXL">
            {t('EVENT_DETAIL.WOMEN')}{' '}
            <Text color={colors.primary} variant="headlineSmall">
              {eventData?.ageRestrictionWomen}+
            </Text>
          </Text>
          <Text variant="titleXL">
            {t('EVENT_DETAIL.MEN')}{' '}
            <Text color={colors.primary} variant="headlineSmall">
              {eventData?.ageRestrictionMen}+
            </Text>
          </Text>
        </Flex>
        <Flex direction="column" style={{ gap: spacing.spacing3 }}>
          <Text variant="headlineMedium">{t('EVENT_DETAIL.DESCRIPTION')}</Text>
          <Text variant="bodySmall" numberOfLines={!showMore ? 4 : 0}>
            {eventData?.pressText}
          </Text>
          <TouchableOpacity onPress={() => setShowMore(!showMore)}>
            <View style={{}}>
              <Text variant="titleSmall" color={colors.primary}>
                {showMore ? t('BUTTON.SHOW_LESS') : t('BUTTON.SHOW_MORE')}
              </Text>
            </View>
          </TouchableOpacity>
        </Flex>
        <LocationCard eventData={eventData} isPastEvent={isPastEvent} />
        <Flex
          direction="row"
          style={{ gap: spacing.spacing7, justifyContent: 'center' }}
        >
          <IconButton name="FacebookIcon" color={colors.textPrimary} />
          <IconButton
            name="InstagramIcon"
            color={colors.textPrimary}
            onPress={() =>
              navigation.navigate('webView', {
                uri: eventData?.company?.socialMedia,
              })
            }
          />
          <IconButton name="BrowserIcon" color={colors.textPrimary} />
        </Flex>
      </MobileContainer>
    </ScrollView>
  )
}

export default MobileView
