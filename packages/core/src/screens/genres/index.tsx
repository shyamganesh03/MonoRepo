import { ScreenLayout } from '@libs/utils'
import { Suspense, useCallback } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getGenres } from '@izzo/api'
import { useNavigation } from '@react-navigation/native'

const Genres = () => {
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )

  const navigation = useNavigation()

  const { data: genresData, isLoading } = useQuery({
    queryKey: ['getGenres'],
    queryFn: () => getGenres(),
  })

  const handleBackNavigation = () => {
    navigation.goBack()
  }

  const handleGenreDetailNavigation = (genreDetail: any) => {
    navigation.navigate('search', genreDetail)
  }

  const viewProps = {
    isLoading,
    genresData,
    handleBackNavigation,
    handleGenreDetailNavigation,
  }

  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default Genres
