import React, { useState, useEffect } from 'react'
import { Button, Flex, Text, TextInput } from '@libs/components'
import { Divider, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Icon } from '@libs/native-icons'
import { useNavigation } from '@react-navigation/native'
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

const LoginAndSignUp = ({
  handleValidation,
  userDetails,
  errorMessage,
  handleSubmit,
}: any) => {
  const { colors } = useTheme<any>()
  const { t } = useTranslation()
  const navigation: any = useNavigation()

  // State for email input and button disabled status
  const [email, setEmail] = useState(userDetails.email || '')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  // Effect to update button disabled status based on email input
  useEffect(() => {
    setIsButtonDisabled(email.trim() === '' || !!errorMessage)
  }, [email])

  // Function to handle email input change
  const handleEmailChange = (value: string) => {
    setEmail(value)
    handleValidation('email', value)
  }

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
            maxWidth: 280,
          }}
        >
          <Text variant="titleSmall">{t('AUTH.SUBTITLE')}</Text>
        </View>
      </Flex>
      <Flex direction="column">
        <TextInput
          onChangeText={handleEmailChange}
          value={email}
          variant="titleMedium"
          outlineStyle={{ borderWidth: 0 }}
          placeholder={t('INPUT_TEXT.EMAIL_PLACEHOLDER')}
          left={
            <TextInput.Icon
              icon={() => (
                <Icon
                  name="AtIcon"
                  color={colors.onSurfaceVariant}
                  height={40}
                />
              )}
              style={{ position: 'absolute', left: -18 }}
            />
          }
          error={errorMessage.email}
          dense={true}
          // style={{height:40}}
        />
        <Button
          style={{
            marginTop: 14,
            marginBottom: 32,
            backgroundColor: colors.primary,
          }}
          onPress={() => handleSubmit({ type: 'loginAndSignup' })}
          mode="contained"
          label={t('BUTTON.Login_And_SIGN_UP')}
          labelVariant="titleLarge"
          disabled={isButtonDisabled}
          labelStyle={{ color: colors.textPrimary }}
        />
      </Flex>
      <Divider />
      <Button
        style={{ marginTop: 32, backgroundColor: colors.secondaryContainer }}
        onPress={() => {
          Keyboard.dismiss()
          navigation.navigate('home')
        }}
        label={t('BUTTON.USE_AS_GUEST')}
        labelVariant="titleLarge"
        labelStyle={{ color: colors.textPrimary }}
      />
    </Flex>
  )
}

export default LoginAndSignUp
