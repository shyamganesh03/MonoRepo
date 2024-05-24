import { Text } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@libs/native-icons'
import { useTheme } from '@react-navigation/native'
import { MobileContainer } from '@libs/container'

const MobileView = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <MobileContainer backgroundColor={colors.background}>
      <Text style={{ color: colors.primary }}>{t('AUTH.LOGIN')}</Text>
      <Icon name="Home" width={20} height={20} color={'black'} />
    </MobileContainer>
  )
}

export default MobileView
