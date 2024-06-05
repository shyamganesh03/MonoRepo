import React from 'react'
import { FlatList, View } from 'react-native'
import { BlogCard } from '../../components'
import { ShimmerPlaceholder } from '@libs/skeletons'
import { useTheme } from 'react-native-paper'

const MobileView = ({ isLoading, blogPosts }: any) => {
  const { colors } = useTheme<any>()

  const renderBlogCard = ({ item }: any) => (
    <View
      style={{
        paddingHorizontal: 16,
        backgroundColor: colors.background,
        marginBottom: 16,
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
  )
}

export default MobileView
