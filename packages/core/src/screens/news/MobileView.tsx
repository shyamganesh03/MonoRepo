import React from 'react'
import { Flex, IconButton, Text } from '@libs/components'
import { FlatList, View } from 'react-native'
import { BlogCard } from '../../components'
import { ShimmerPlaceholder } from '@libs/skeletons'
import { useTheme } from 'react-native-paper'
import { t } from 'i18next'

const MobileView = ({ isLoading, blogPosts, handleBackNavigation }: any) => {
  const { colors } = useTheme<any>()

  const renderBlogCard = ({ item }: any) => (
    <View
      style={{
        paddingHorizontal: 16,
        marginTop: 16,
        backgroundColor: colors.background,
      }}
    >
      <BlogCard blogPost={item} key={item?.id} />
    </View>
  )

  const renderLoading = () => (
    <ShimmerPlaceholder
      style={{
        width: '95%',
        marginHorizontal: 16,
        height: 200,
        marginBottom: 20,
        marginTop: 10,
        borderRadius: 20,
      }}
    />
  )

  return (
    <>
      <Flex
        direction="row"
        style={{
          paddingHorizontal: 16,
          marginVertical: 16,
          alignItems: 'center',
          backgroundColor: colors.background,
        }}
      >
        <IconButton
          name="ArrowLeftIcon"
          color={colors.textPrimary}
          onPress={handleBackNavigation}
        />
        <View style={{ flex: 1, marginRight: 20 }}>
          <Text variant="headlineMedium" textAlign="center">
            {t('HOME.NEWS')}
          </Text>
        </View>
      </Flex>
      <FlatList
        data={isLoading ? [...Array(7)] : blogPosts}
        renderItem={isLoading ? renderLoading : renderBlogCard}
        keyExtractor={(_, index) => index.toString()}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 90,
          backgroundColor: colors.background,
        }}
      />
    </>
  )
}

export default MobileView
