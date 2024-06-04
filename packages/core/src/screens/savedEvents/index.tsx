import { ScreenLayout } from '@libs/utils'
import { Suspense, useCallback } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFilteredEvents } from '@izzo/api'
import { useNavigation } from '@react-navigation/native'

const SavedEvents = () => {
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )
  const navigation = useNavigation()

  const { data: savedEvents, isLoading } = useQuery({
    queryKey: ['getSavedEvents'],
    queryFn: () => getFilteredEvents({ when: 'THIS_WEEKEND' }),
  })
  const handleBackNavigation = () => {
    navigation.goBack()
  }

  const handleEventDetailNavigation = (pageId: any) => {
    navigation.navigate('eventDetail', { eventId: pageId })
  }

  const viewProps = {
    savedEvents,
    handleBackNavigation,
    handleEventDetailNavigation,
    isLoading,
  }
  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default SavedEvents
