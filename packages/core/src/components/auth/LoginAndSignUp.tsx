import React from 'react'
import { Button, Flex, Text, TextInput } from '@libs/components'
import { Divider, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Icon } from '@libs/native-icons'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'

const LoginAndSignUp = ({
  handleValidation,
  userDetails,
  errorMessage,
}: any) => {
  const { colors } = useTheme<any>()
  const { t } = useTranslation()

  const navigation = useNavigation()

  return (
    <Flex direction="column">
      <Flex direction="column">
        <Text variant="headlineMedium" color={colors.textPrimary}>
          {t('AUTH.TITLE')}
        </Text>
        <View
          style={{
            paddingTop: 24,
            paddingBottom: 27,
            maxWidth: 240,
          }}
        >
          <Text variant="labelMedium">{t('AUTH.SUBTITLE')}</Text>
        </View>
      </Flex>
      <Flex direction="column">
        <TextInput
          onChangeText={(value: string) => handleValidation('email', value)}
          value={userDetails.email}
          outlineStyle={{ borderWidth: 0 }}
          style={{ height: 40 }}
          placeholder={t('INPUT_TEXT.EMAIL_PLACEHOLDER')}
          left={
            <TextInput.Icon
              icon={() => (
                <Icon name="AtIcon" color={colors.onSurfaceVariant} />
              )}
              style={{ position: 'absolute', left: -18 }}
            />
          }
          error={errorMessage.email}
        />
        <Button
          style={{
            marginTop: 14,
            marginBottom: 32,
            backgroundColor: colors.primary,
          }}
          onPress={() => {}}
          mode="contained"
          label={t('BUTTON.Login_And_SIGN_UP')}
          labelStyle={{ color: colors.textPrimary }}
        />
      </Flex>
      <Divider />
      <Button
        style={{ marginTop: 32, backgroundColor: colors.secondaryContainer }}
        onPress={() => {
          navigation.navigate('home')
        }}
        label={t('BUTTON.USE_AS_GUEST')}
        labelStyle={{ color: colors.textPrimary }}
      />
    </Flex>
  )
}

export default LoginAndSignUp
