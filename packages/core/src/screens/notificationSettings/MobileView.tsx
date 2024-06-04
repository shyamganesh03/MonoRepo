import React from 'react'
import { Button, Flex, IconButton, Text } from '@libs/components'

import { Linking } from 'react-native'

import { t } from 'i18next'
import { useTheme } from 'react-native-paper'

const MobileView = (props: any) => {
  const { colors } = useTheme()
  const { handleBackNavigation } = props

  return (
    <>
      <Flex
        direction="row"
        style={{
          paddingHorizontal: 16,
          marginVertical: 16,
          alignItems: 'center',
          marginTop: 56,
        }}
      >
        <IconButton
          name="ArrowLeftIcon"
          color={colors.textPrimary}
          onPress={() => {
            handleBackNavigation()
          }}
        />
        <Text
          variant="heading2"
          style={{ flex: 1, textAlign: 'center', marginRight: 20 }}
        >
          {t('NOTIFICATION_SETTINGS.NOTIFICATION_SETTINGS')}
        </Text>
      </Flex>
      <Flex direction="column" style={{ paddingHorizontal: 16 }}>
        <Text variant="body1" style={{ fontWeight: '500', marginTop: 8 }}>
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
    </>
  )
}
export default MobileView
