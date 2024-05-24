import { Text } from 'react-native'
import React from 'react'
import { Icon } from '@libs/native-icons'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@react-navigation/native'
import { DesktopContainer } from '@libs/container'

const DesktopView = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  return (
    <DesktopContainer backgroundColor={colors.background}>
      <Text style={{ color: colors.primary }}>{t('AUTH.LOGIN')}</Text>
      <Icon name="Home" width={30} height={30} />
    </DesktopContainer>
  )
}

export default DesktopView
