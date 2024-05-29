import React from 'react'
import { Flex, IconButton, Text } from '@libs/components'
import { FlatList, View } from 'react-native'
import { ShimmerPlaceholder } from '@libs/skeletons'
import { useTheme } from 'react-native-paper'
import { GenreCard } from '../../components/index'
import { t } from 'i18next'

const MobileView = (props: any) => {
  const {
    isLoading,
    genresData,
    handleBackNavigation,
    handleGenreDetailNavigation,
  } = props
  const { colors } = useTheme()

  const renderGenreCard = ({ item }: any) => (
    <View
      style={{
        width: 150,
        height: 88,
      }}
    >
      <GenreCard
        genreDetail={item}
        key={item?._id}
        handleGenreDetailNavigation={(genreDetail: any) =>
          handleGenreDetailNavigation(genreDetail)
        }
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
          color={colors.tertiary}
          handlePress={() => handleBackNavigation()}
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
          keyExtractor={(item, index) => index.toString()}
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
