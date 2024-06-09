import React from 'react'
import { Text, Flex, ToggleSwitch } from '@libs/components'
import { useTranslation } from 'react-i18next'
import { Icon } from '@libs/native-icons'
import { useTheme } from 'react-native-paper'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { ShimmerPlaceholder } from '@libs/skeletons'
import { BlogCard, GenreCard, EventCard } from '../../components'

const MobileView = (props: any) => {
  const { t } = useTranslation()
  const { colors } = useTheme<any>()
  const {
    drunkMode,
    setDrunkMode,
    genresData,
    todayEvents,
    blogPosts,
    isLoading,
    handleEventDetailNavigation,
    navigation,
    handleGenreDetailNavigation,
    weekendEvents,
    selectedLanguage,
    handleBlogPage,
  } = props

  const renderEventCard = ({ item }: any) => (
    <View style={{ width: 316, marginRight: 8 }}>
      <EventCard
        eventDetail={item}
        handleEventDetailNavigation={(pageId: any) =>
          handleEventDetailNavigation(pageId)
        }
      />
    </View>
  )

  const renderGenreCard = ({ item }: any) => (
    <View style={{ width: 150, marginRight: 10, height: 88 }}>
      <GenreCard
        genreDetail={item}
        handleGenreDetailNavigation={(genreDetail: any) =>
          handleGenreDetailNavigation(genreDetail)
        }
      />
    </View>
  )

  const renderBlogCard = ({ item }: any) => (
    <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
      <BlogCard
        blogPost={item}
        key={item?.id}
        titleNumberOfLines={2}
        handleBlogPage={handleBlogPage}
      />
    </View>
  )

  const renderHeader = () => (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingHorizontal: 16,
        }}
        onPress={() => navigation.navigate('languageSettings')}
      >
        <Flex
          direction="row"
          style={{
            paddingHorizontal: 12,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: colors.neutral,
            justifyContent: 'flex-end',
            width: '20%',
            borderRadius: 16,
            alignItems: 'center',
            columnGap: 10,
          }}
        >
          <Icon name={selectedLanguage} width={24} height={24} />
          <Text variant="titleSmall" textTransform="uppercase">
            {selectedLanguage}
          </Text>
        </Flex>
      </TouchableOpacity>

      <Flex
        style={{
          backgroundColor: colors.onPrimaryContainer,
          borderRadius: 16,
          marginHorizontal: 16,
          paddingVertical: 20,
          paddingHorizontal: 16,
          justifyContent: 'space-between',
          marginTop: 30,
        }}
        direction="row"
      >
        <Flex direction="row" style={{ alignItems: 'center', columnGap: 20 }}>
          <Icon name="CocktailIcon" width={24} height={24} />
          <Text variant="titleMedium" color={colors.textPrimary}>
            {t('HOME.DRUNK_MODE')}
          </Text>
        </Flex>
        <ToggleSwitch activeState={drunkMode} setActiveState={setDrunkMode} />
      </Flex>

      <Section
        title={t('HOME.TODAY')}
        data={todayEvents?.slice(0, 4)}
        renderItem={renderEventCard}
        navigateTo="search"
        isViewAll={todayEvents?.length > 4}
      />

      <Section
        title={t('HOME.GENRES')}
        data={genresData?.slice(7, 15)}
        renderItem={renderGenreCard}
        navigateTo="genres"
        isViewAll={genresData?.length > 8}
      />

      <Section
        title={t('HOME.THIS_WEEKEND')}
        data={weekendEvents?.slice(0, 4)}
        renderItem={renderEventCard}
        navigateTo="search"
        isViewAll={weekendEvents?.length > 4}
      />

      <Section
        title={t('HOME.NEWS')}
        data={blogPosts?.slice(0, 4)}
        renderItem={renderBlogCard}
        blogPost={true}
        navigateTo="news"
        isViewAll={blogPosts?.length > 4}
      />
    </View>
  )

  const Section = ({
    title,
    data,
    renderItem,
    blogPost,
    navigateTo,
    isViewAll,
  }: any) => (
    <View style={!isLoading && data?.length > 0 ? { marginTop: 32 } : null}>
      {!isLoading && data?.length > 0 && (
        <Flex
          direction="row"
          style={{
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            alignItems: 'center',
          }}
        >
          <Text variant="headlineMedium">{title}</Text>
          {isViewAll ? (
            <TouchableOpacity
              onPress={() => navigation.navigate(navigateTo)}
              disabled={!data?.length}
            >
              <Text
                color={colors.primary}
                variant="titleMedium"
                textDecorationLine="underline"
              >
                {t('HOME.VIEW_ALL')}
              </Text>
            </TouchableOpacity>
          ) : null}
        </Flex>
      )}

      {isLoading ? (
        <SkeletonLoader
          title={title}
          blogPost={blogPost}
          t={t}
          colors={colors}
        />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          horizontal={!blogPost ? true : false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            !blogPost ? { paddingLeft: 16, marginTop: 16 } : {}
          }
        />
      )}
    </View>
  )

  const placeholderData = [{}]

  return (
    <FlatList
      data={placeholderData}
      keyExtractor={(_, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ marginTop: 20, paddingBottom: 100 }}
      ListHeaderComponent={renderHeader}
      renderItem={() => null}
      style={{ backgroundColor: colors.background }}
    />
  )
}

const SkeletonLoader = ({ title, colors, t, blogPost }: any) => {
  const findHeight = (title: any) => {
    switch (title) {
      case 'Genres':
        return { height: 88, width: 150 }
      case 'Today':
        return { height: 175, width: 316 }
      case 'This Weekend':
        return { height: 175, width: 316 }
      case 'News':
        return {
          width: '95%',
          marginHorizontal: 16,
          height: 150,
          marginVertical: 16,
        }
      default: {
        return { height: 175, width: 316 }
      }
    }
  }
  return (
    <>
      <Flex
        direction="row"
        style={{
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          alignItems: 'center',
          marginTop: 32,
        }}
      >
        <Text variant="headlineMedium">{title}</Text>

        <Text
          color={colors.primary}
          variant="titleMedium"
          textDecorationLine="underline"
        >
          {t('HOME.VIEW_ALL')}
        </Text>
      </Flex>
      <FlatList
        data={[{}, {}, {}, {}, {}]}
        renderItem={() => (
          <View style={{ marginRight: 8 }}>
            <ShimmerPlaceholder
              style={[findHeight(title), { borderRadius: 16 }]}
            />
          </View>
        )}
        horizontal={!blogPost}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          !blogPost ? { paddingLeft: 16, marginTop: 16 } : {}
        }
        keyExtractor={(_, index) => index.toString()}
      />
    </>
  )
}

export default MobileView
