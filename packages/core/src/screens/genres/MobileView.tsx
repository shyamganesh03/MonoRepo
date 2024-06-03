import React from 'react'
import { Flex, IconButton, Text } from '@libs/components'
import { FlatList, View } from 'react-native'
import { ShimmerPlaceholder } from '@libs/skeletons'
import { useTheme } from 'react-native-paper'
import { GenreCard } from '../../components'
import { t } from 'i18next'
import { MobileContainer } from '@libs/container'
import { spacing } from '@libs/theme'

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
    <MobileContainer backgroundColor={colors.background}>
      <Flex
        direction="row"
        style={{
          alignItems: 'center',
          paddingBottom: spacing.spacing7,
        }}
      >
        <IconButton
          name="ArrowLeftIcon"
          color={colors.textPrimary}
          onPress={handleBackNavigation}
        />
        <View
          style={{
            flex: 1,
            marginRight: 20,
          }}
        >
          <Text variant="headlineMedium" textAlign="center">
            {t('HOME.GENRES')}
          </Text>
        </View>
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
          style={{ backgroundColor: colors.background }}
          contentContainerStyle={{
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
    </MobileContainer>
  )
}

export default MobileView
