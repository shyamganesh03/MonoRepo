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
    <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
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
          {t('HOME.NEWS')}
        </Text>
      </Flex>
      <FlatList
        data={isLoading ? [...Array(7)] : blogPosts}
        renderItem={isLoading ? renderLoading : renderBlogCard}
        keyExtractor={(_, index) => index.toString()}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      />
    </>
  )
}

export default MobileView
