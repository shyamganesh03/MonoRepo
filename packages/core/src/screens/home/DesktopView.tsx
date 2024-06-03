import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'react-native-paper'
import { DesktopContainer } from '@libs/container'
import { Text } from '@libs/components'

const DesktopView = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <DesktopContainer backgroundColor={colors.background}>
      <Text variant="titleMedium">{t('HOME.DRUNK_MODE')}</Text>
    </DesktopContainer>
  )
}

export default DesktopView
