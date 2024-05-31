import { ScreenLayout } from '@libs/utils'
import { Suspense, useCallback, useState } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllEvents, getBlogPosts, getGenres } from '@izzo/api'
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
  const { data: eventsData, isLoading: isEventDataLoading } = useQuery({
    queryKey: ['getEvents'],
    queryFn: () => getAllEvents(),
  })

  const handleEventDetailNavigation = (pageId: any) => {
    navigation.navigate('eventDetail', { eventId: pageId })
  }

  const handleGenreDetailNavigation = (genreDetail: any) => {
    navigation.navigate('search', genreDetail)
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const nextSaturday = new Date(today)
  nextSaturday.setDate(today.getDate() + ((6 - today.getDay()) % 7))

  const nextSunday = new Date(nextSaturday)
  nextSunday.setDate(nextSaturday.getDate() + 1)

  const filterEvents = (events: any) => {
    const todayEvents: any = []
    const weekendEvents: any = []

    events?.forEach((event: any) => {
      const eventDate = new Date(event.startDate)
      eventDate.setHours(0, 0, 0, 0)

      if (eventDate.getTime() === today.getTime()) {
        todayEvents.push(event)
      }

      if (
        eventDate.getTime() === nextSaturday.getTime() ||
        eventDate.getTime() === nextSunday.getTime()
      ) {
        weekendEvents.push(event)
      }
    })

    return { todayEvents, weekendEvents }
  }

  const viewProps = {
    drunkMode,
    setDrunkMode,
    genresData,
    eventsData,
    blogPosts: data?.pageProps?.story?.content?.body[2].blogPosts || [],
    isLoading: isEventDataLoading || isGenreLoading || isBlogLoading,
    handleEventDetailNavigation,
    filterEvents,
    navigation,
    handleGenreDetailNavigation,
  }
  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default HomePage
