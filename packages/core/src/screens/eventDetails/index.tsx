import { ScreenLayout } from '@libs/utils'
import { Suspense, useCallback, useState } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getEventDetails } from '@izzo/api'

const EventDetailScreen = (props: any) => {
  const route = props?.route

  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )
  const [showMore, setShowMore] = useState(false)

  const { data: eventData, isFetching } = useQuery({
    queryKey: ['getEventDetail'],
    queryFn: async () => {
      const response: any = await getEventDetails(route?.params?.eventId)
      return response
    },
    initialData: {},
  })

  const isPastEvent = new Date() > new Date(eventData?.startDate)

  const viewProps = {
    eventData: { ...eventData, id: route?.params?.eventId },
    isLoading: isFetching,
    isPastEvent,
    showMore,
    setShowMore,
  }

  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default EventDetailScreen
