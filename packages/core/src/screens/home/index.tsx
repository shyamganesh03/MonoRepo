import { ScreenLayout } from '@libs/utils'
import { Suspense, useCallback, useEffect, useState } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getBlogPosts, getFilteredEvents, getGenres } from '@izzo/api'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { getItemAsync } from '@izzo/async-local-storage'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const [drunkMode, setDrunkMode] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('')

  const navigation: any = useNavigation()
  const isFocused = useIsFocused()
  const { i18n } = useTranslation()

  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )

  useEffect(() => {
    getItemAsync('preferredLanguage').then((res: any) => {
      setSelectedLanguage(res)
      i18n.changeLanguage(res)
    })
  }, [isFocused])

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
    selectedLanguage,
  }
  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default HomePage
