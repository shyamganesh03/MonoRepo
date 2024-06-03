import { useTheme } from 'react-native-paper'
import { Card, Flex, Tag, Text } from '@libs/components'
import React from 'react'
import { View, TouchableOpacity, useWindowDimensions } from 'react-native'
import { Icon } from '@libs/native-icons'
import { dateformat } from '@libs/utils'

const EventCard = ({
  eventDetail,
  handleEventDetailNavigation,
  isSearch,
}: any) => {
  const { colors } = useTheme<any>()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: any = { day: '2-digit', month: 'short', year: 'numeric' }
    return date.toLocaleDateString('en-GB', options).replace(/ /g, ' ')
  }

  const maxWidth = useWindowDimensions().width

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        maxWidth: !isSearch ? 316 : maxWidth,
        borderRadius: 16,
      }}
      onPress={() => handleEventDetailNavigation(eventDetail?.pageId)}
    >
      <Card
        title={eventDetail?.name}
        titleStyle={{ color: colors.textSecondary }}
        titleVariant="heading3"
        subtitleStyle={{
          marginTop: -10,
          color: colors.textSecondary,
          textTransform: 'uppercase',
          paddingLeft: 2,
        }}
        subtitle={eventDetail?.company?.name}
        subTitleVariant="utility2"
        style={{
          backgroundColor: colors.textPrimary,
        }}
        right={() =>
          isSearch && (
            <View style={{ marginTop: 5 }}>
              <Flex direction="column" style={{ paddingRight: 18 }}>
                <Text
                  variant="heading1"
                  style={{
                    fontWeight: '900',
                    fontSize: 20,
                    color: colors.primary,
                  }}
                >
                  {dateformat(eventDetail?.startDate)}
                </Text>
                <Text
                  variant="utility2"
                  style={{
                    color: colors.textSecondary,
                    fontWeight: '500',
                    textAlign: 'right',
                    marginTop: -6,
                  }}
                >
                  at {eventDetail?.startTime}
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.tertiary,
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    right: 0,
                    bottom: -115,
                    paddingVertical: 6,
                    paddingHorizontal: 14,
                    borderTopLeftRadius: 12,
                    borderBottomRightRadius: 12,
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
                />
              ))}
            </View>

            {!isSearch && (
              <Text
                style={{
                  marginTop: 25,
                  fontWeight: '500',
                  fontSize: 12,
                  color: colors.textSecondary,
                }}
              >
                {formatDate(eventDetail?.startDate)} at {eventDetail?.startTime}
              </Text>
            )}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 5,
                marginTop: isSearch ? 43 : 5,
                marginLeft: isSearch ? 0 : -3,
              }}
            >
              <Icon name="LocationIcon" width={15} height={15} />
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 12,
                  color: colors.textSecondary,
                }}
              >
                {eventDetail?.location?.street}
              </Text>
            </View>
          </View>
        }
      />
    </TouchableOpacity>
  )
}

export default EventCard
