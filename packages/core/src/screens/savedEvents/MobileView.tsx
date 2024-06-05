import React from 'react'
import { FlatList, View } from 'react-native'
import { ShimmerPlaceholder } from '@libs/skeletons'
import { useTheme } from 'react-native-paper'
import { EventCard } from '../../components'
import { MobileContainer } from '@libs/container'

interface MobileViewProps {
  isLoading: boolean
  savedEvents: any[]
  handleBackNavigation: () => void
  handleEventDetailNavigation: (pageId: any) => void
}

const MobileView: React.FC<MobileViewProps> = ({
  isLoading,
  savedEvents,
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
    <MobileContainer
      backgroundColor={colors.background}
      hasPadding={false}
      style={{ paddingHorizontal: 16 }}
    >
      {isLoading ? (
        [...Array(5)].map(() => (
          <ShimmerPlaceholder
            style={{
              width: '95%',
              marginHorizontal: 16,
              height: 150,
              marginVertical: 16,
              borderRadius: 20,
            }}
          />
        ))
      ) : (
        <FlatList
          data={savedEvents}
          renderItem={renderEventCard}
          keyExtractor={(item) => item?.id}
          contentContainerStyle={{
            paddingBottom: 90,
          }}
        />
      )}
    </MobileContainer>
  )
}

export default MobileView
