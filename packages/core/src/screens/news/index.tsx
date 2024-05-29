import { ScreenLayout } from '@libs/utils'
import { Suspense, useCallback } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getBlogPosts } from '@izzo/api'
import { useIsFocused, useNavigation } from '@react-navigation/native'

const News = () => {
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )

  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const { data: blogData, isLoading: isBlogLoading } = useQuery({
    queryKey: ['getBlog'],
    queryFn: () => getBlogPosts(),
    enabled: !!isFocused,
  })

  const handleBackNavigation = () => {
    navigation.goBack()
  }

  const viewProps = {
    isLoading: isBlogLoading,
    blogPosts: blogData?.pageProps?.story?.content?.body[2].blogPosts || [],
    handleBackNavigation,
  }
  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default News
