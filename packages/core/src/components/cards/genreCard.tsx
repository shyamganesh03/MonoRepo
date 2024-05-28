import { useTheme } from 'react-native-paper'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text } from '@libs/components'
import { ShimmerPlaceholder } from '@libs/skeletons'

const GenreCard = ({
  genreDetail,
  key,
  handleGenreDetailNavigation,
  isLoading,
}: any) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        maxWidth: 150,
        borderRadius: 16,
      }}
      key={key}
      onPress={() => handleGenreDetailNavigation(genreDetail)}
    >
      <View
        style={{
          backgroundColor: colors.primaryContainer,
          width: '100%',
          maxWidth: 150,
          paddingHorizontal: 30,
          height: '100%',
          maxHeight: 87.5,
          borderRadius: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{ color: colors.textPrimary, textAlign: 'center' }}
          variant="bodyBold1"
        >
          {genreDetail?.genre}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default GenreCard
