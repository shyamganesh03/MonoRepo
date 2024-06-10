import { useTheme } from 'react-native-paper'
import { Card, Flex, Tag, Text } from '@libs/components'
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Icon } from '@libs/native-icons'
import { dateformat } from '@libs/utils'
import { useTranslation } from 'react-i18next'
import { spacing } from '@libs/theme'

const EventCard = ({
  eventDetail,
  handleEventDetailNavigation,
  handleClose,
  isSearch,
  isMap,
}: any) => {
  const { colors } = useTheme<any>()
  const { t } = useTranslation()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: any = { day: '2-digit', month: 'short', year: 'numeric' }
    return date.toLocaleDateString('en-GB', options).replace(/ /g, ' ')
  }

  return (
    <TouchableOpacity
      onPress={() => handleEventDetailNavigation(eventDetail?.pageId)}
    >
      <Card
        title={eventDetail?.name}
        titleStyle={{ color: colors.textSecondary }}
        titleVariant="headlineSmall"
        subtitleStyle={{
          color: colors.textSecondary,
          textTransform: 'uppercase',
          paddingLeft: 2,
        }}
        subtitle={eventDetail?.company?.name}
        subTitleVariant="labelMedium"
        style={{
          backgroundColor: colors.textPrimary,
          borderRadius: spacing.spacing4,
        }}
        right={() =>
          (isSearch || isMap) && (
            <View style={{ marginTop: 5 }}>
              <Flex direction="column" style={{ paddingRight: 18 }}>
                {!isMap ? (
                  <>
                    <Text variant="headlineSmall" color={colors.primary}>
                      {dateformat(eventDetail?.startDate)}
                    </Text>
                    <Text
                      variant="bodyMedium"
                      color={colors.textSecondary}
                      textAlign="right"
                    >
                      {t('EVENT_CARD.AT')} {eventDetail?.startTime}
                    </Text>
                  </>
                ) : (
                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-end',
                      position: 'absolute',
                      top: -30,
                      right: 12,
                    }}
                    onPress={() => handleClose()}
                  >
                    <Icon name="CloseRoundIcon" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.tertiary,
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    right: 0,
                    bottom: isMap ? -131 : -111,
                    paddingVertical: 6,
                    paddingHorizontal: 14,
                    borderTopLeftRadius: spacing.spacing4,
                    borderBottomRightRadius: spacing.spacing4,
                  }}
                  onPress={() => {}}
                >
                  <Icon name="StarIcon" />
                </TouchableOpacity>
              </Flex>
            </View>
          )
        }
        content={
          <View
            style={{
              marginTop: -5,
              flexDirection: 'column',
              alignContent: 'flex-end',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 5,
                marginTop: 5,
              }}
            >
              {eventDetail?.genres?.map((genres: any) => (
                <Tag
                  label={genres.genre}
                  labelColor={colors.textPrimary}
                  bgColor={colors.primary}
                  tagType="eventTag"
                  key={genres.id}
                  textVariant="labelLarge"
                />
              ))}
            </View>
            <View
              style={{
                marginTop: 25,
              }}
            >
              <Text color={colors.textSecondary} variant="labelMedium">
                {formatDate(eventDetail?.startDate)} at {eventDetail?.startTime}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 5,
                marginTop: 5,
                marginLeft: -3,
              }}
            >
              <Icon name="LocationIcon" width={15} height={15} />
              <View>
                <Text color={colors.textSecondary} variant="labelLarge">
                  {eventDetail?.location?.street}
                </Text>
              </View>
            </View>
          </View>
        }
      />
    </TouchableOpacity>
  )
}

export default EventCard
