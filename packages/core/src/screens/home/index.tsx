import { ScreenLayout } from '@libs/utils'
import { Suspense, useCallback, useState } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  getAllEvents,
  getBlogPosts,
  getFilteredEvents,
  getGenres,
} from '@izzo/api'
import { useNavigation } from '@react-navigation/native'

const HomePage = () => {
  const [drunkMode, setDrunkMode] = useState(false)

  const navigation: any = useNavigation()

  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )

  const { data, isLoading: isBlogLoading } = useQuery({
    queryKey: ['getBlog'],
    queryFn: () => getBlogPosts(),
  })

  const { data: genresData, isLoading: isGenreLoading } = useQuery({
    queryKey: ['getGenres'],
    queryFn: () => getGenres(),
  })
  const { data: todayEvents, isLoading: isTodayDataLoading } = useQuery({
    queryKey: ['getEvents'],
    queryFn: () => getFilteredEvents({ when: 'TODAY' }),
  })
  const { data: weekendEvents, isLoading: isWeekendDataLoading } = useQuery({
    queryKey: ['getWeekendEvents'],
    queryFn: () => getFilteredEvents({ when: 'THIS_WEEKEND' }),
  })

  const handleEventDetailNavigation = (pageId: any) => {
    navigation.navigate('eventDetail', { eventId: pageId })
  }

  const handleGenreDetailNavigation = (genreDetail: any) => {
    navigation.navigate('search', genreDetail)
  }

  const viewProps = {
    drunkMode,
    setDrunkMode,
    genresData,
    todayEvents,
    blogPosts: data?.pageProps?.story?.content?.body[2].blogPosts || [],
    isLoading:
      isTodayDataLoading ||
      isGenreLoading ||
      isBlogLoading ||
      isWeekendDataLoading,
    handleEventDetailNavigation,
    navigation,
    weekendEvents,
    handleGenreDetailNavigation,
  }
  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default HomePage
