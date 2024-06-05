import React from 'react'
import { Button, Flex, Text } from '@libs/components'

import { Linking } from 'react-native'

import { t } from 'i18next'
import { useTheme } from 'react-native-paper'
import { MobileContainer } from '@libs/container'

const MobileView = () => {
  const { colors } = useTheme<any>()

  return (
    <MobileContainer backgroundColor={colors.background}>
      <Flex direction="column" style={{ paddingHorizontal: 16, marginTop: 8 }}>
        <Text variant="bodyMedium">
          {t('NOTIFICATION_SETTINGS.DESCRIPTION')}
        </Text>
        <Button
          style={{
            marginTop: 14,
            marginBottom: 32,
            backgroundColor: colors.primary,
          }}
          onPress={() => Linking.openSettings()}
          mode="contained"
          label={t('NOTIFICATION_SETTINGS.BUTTON')}
          labelStyle={{ color: colors.textPrimary }}
        />
      </Flex>
    </MobileContainer>
  )
}
export default MobileView
