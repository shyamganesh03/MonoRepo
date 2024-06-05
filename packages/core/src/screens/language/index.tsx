import { ScreenLayout } from '@libs/utils'
import { Suspense, useCallback, useEffect, useState } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import React from 'react'
import { getItemAsync, setItemAsync } from '@izzo/async-local-storage'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

const LanguageSelector = () => {
  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )

  const { i18n } = useTranslation()
  const navigation = useNavigation()

  useEffect(() => {
    getItemAsync('preferredLanguage').then((res: any) => {
      i18n.changeLanguage(res)
      setSelectedLanguage(res)
    })
  }, [])

  const handleSelection = (languageCode: any) => {
    setItemAsync('preferredLanguage', languageCode)
    i18n.changeLanguage(languageCode)
    setSelectedLanguage(languageCode)
    navigation.goBack()
  }

  const [selectedLanguage, setSelectedLanguage] = useState('')
  const languageOptions: any = [
    {
      label: 'English',
      code: 'en',
    },
    {
      label: 'German',
      code: 'de',
    },
  ]

  const viewProps = {
    languageOptions,
    selectedLanguage,
    setSelectedLanguage,
    handleSelection,
  }
  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default LanguageSelector
