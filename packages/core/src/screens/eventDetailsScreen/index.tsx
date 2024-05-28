import { ScreenLayout } from '@libs/utils'
import { Suspense, useCallback, useState } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getEventDetails } from '@izzo/api'

const EventDetailScreen = () => {
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )
  const [showMore, setShowMore] = useState(false)

  const { data: eventData } = useQuery({
    queryKey: ['getEventDetail'],
    queryFn: async () => {
      const response: any = await getEventDetails('karaoke--disco-01-06-2024')
      return response
    },
    initialData: {},
  })

  const viewProps = { eventData, showMore, setShowMore }

  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default EventDetailScreen
