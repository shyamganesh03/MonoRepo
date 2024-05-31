import React from 'react'
import { Flex, IconButton, Text } from '@libs/components'
import { FlatList, View } from 'react-native'
import { ShimmerPlaceholder } from '@libs/skeletons'
import { useTheme } from 'react-native-paper'
import { GenreCard } from '../../components'
import { t } from 'i18next'

interface MobileViewProps {
  isLoading: boolean
  genresData: any[]
  handleBackNavigation: () => void
  handleGenreDetailNavigation: (genreDetail: any) => void
}

const MobileView: React.FC<MobileViewProps> = ({
  isLoading,
  genresData,
  handleBackNavigation,
  handleGenreDetailNavigation,
}) => {
  const { colors } = useTheme<any>()

  const renderGenreCard = ({ item }: { item: any }) => (
    <View style={{ width: 150, height: 88 }}>
      <GenreCard
        genreDetail={item}
        handleGenreDetailNavigation={handleGenreDetailNavigation}
      />
    </View>
  )

  return (
    <>
      <Flex
        direction="row"
        style={{
          paddingHorizontal: 16,
          marginVertical: 16,
          alignItems: 'center',
        }}
      >
        <IconButton
          name="ArrowLeftIcon"
          color={colors.textPrimary}
          onPress={handleBackNavigation}
        />
        <Text
          variant="heading2"
          style={{ flex: 1, textAlign: 'center', marginRight: 20 }}
        >
          {t('HOME.GENRES')}
        </Text>
      </Flex>
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
          data={genresData}
          renderItem={renderGenreCard}
          keyExtractor={(item) => item?.id}
          contentContainerStyle={{
            paddingBottom: 90,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 15,
            justifyContent: 'center',
          }}
          ListFooterComponent={
            genresData.length % 2 === 1 ? (
              <View style={{ width: 150, height: 88 }} />
            ) : null
          }
        />
      )}
    </>
  )
}

export default MobileView
