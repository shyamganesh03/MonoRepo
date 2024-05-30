import { useTheme } from 'react-native-paper'
import { Card, Tag } from '@libs/components'
import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Icon } from '@libs/native-icons'

const EventCard = ({ eventDetail, handleEventDetailNavigation }: any) => {
  const { colors } = useTheme<any>()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)

    const options: any = { day: '2-digit', month: 'short', year: 'numeric' }
    const formattedDate = date
      .toLocaleDateString('en-GB', options)
      .replace(/ /g, ' ')
    return formattedDate
  }

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        maxWidth: 316,
        borderRadius: 16,
      }}
      onPress={() => handleEventDetailNavigation(eventDetail?.pageId)}
    >
      <Card
        title={eventDetail?.name}
        titleStyle={{
          color: colors.textSecondary,
        }}
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
          width: '100%',
          maxWidth: 316,
          height: 175,
        }}
        content={
          <View style={{ marginTop: -5 }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 5,
                marginTop: 5,
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
