import React from 'react'
import { Flex, IconButton, Text } from '@libs/components'
import { FlatList, View } from 'react-native'
import { ShimmerPlaceholder } from '@libs/skeletons'
import { useTheme } from 'react-native-paper'
import { EventCard } from '../../components'
import { t } from 'i18next'

interface MobileViewProps {
  isLoading: boolean
  savedEvents: any[]
  handleBackNavigation: () => void
  handleEventDetailNavigation: (pageId: any) => void
}

const MobileView: React.FC<MobileViewProps> = ({
  isLoading,
  savedEvents,
  handleBackNavigation,
  handleEventDetailNavigation,
}) => {
  const { colors } = useTheme<any>()

  const renderEventCard = ({ item }: any) => (
    <View style={{ marginBottom: 16 }}>
      <EventCard
        eventDetail={item}
        handleEventDetailNavigation={(pageId: any) =>
          handleEventDetailNavigation(pageId)
        }
        isSearch
      />
    </View>
  )

  return (
    <>
      {isLoading ? (
        <ShimmerPlaceholder
          style={{
            width: '95%',
            marginHorizontal: 16,
            height: 150,
            marginVertical: 16,
          }}
        />
      ) : (
        <FlatList
          data={savedEvents}
          renderItem={renderEventCard}
          keyExtractor={(item) => item?.id}
          contentContainerStyle={{
            paddingBottom: 90,
            paddingHorizontal: 16,
          }}
        />
      )}
    </>
  )
}

export default MobileView
