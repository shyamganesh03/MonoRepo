import React, { useState, useEffect } from 'react'
import { Button, Flex, Text, TextInput } from '@libs/components'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Icon } from '@libs/native-icons'
import { PasswordTextInput } from '@libs/components'
import { Keyboard, TouchableOpacity, View } from 'react-native'

const Login = ({
  handleValidation,
  userDetails,
  errorMessage,
  handleSubmit,
}: any) => {
  const { colors } = useTheme<any>()
  const { t } = useTranslation()
  const [email, setEmail] = useState(userDetails.email || '')
  const [password, setPassword] = useState(userDetails.password || '')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  useEffect(() => {
    // Check if both email and password are filled
    if (email && password) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }, [email, password])

  const handleEmailChange = (value: any) => {
    setEmail(value)
    handleValidation('email', value)
  }

  const handlePasswordChange = (value: any) => {
    setPassword(value)
    handleValidation('password', value)
  }

  const renderTitle = () => (
    <Text variant="headlineMedium" color={colors.textPrimary}>
      {t('AUTH.TITLE')}
    </Text>
  )

  const renderSubtitle = () => (
    <View
      style={{
        paddingTop: 24,
        paddingBottom: 27,
        maxWidth: 280,
      }}
    >
      <Text variant="titleSmall">{t('AUTH.SUBTITLE')}</Text>
    </View>
  )

  const renderEmailInput = () => (
    <TextInput
      onChangeText={handleEmailChange}
      value={email}
      variant="titleMedium"
      placeholder={t('INPUT_TEXT.EMAIL_PLACEHOLDER')}
      outlineStyle={{ borderWidth: 0 }}
      left={
        <TextInput.Icon
          icon={() => <Icon name="AtIcon" color={colors.onSurfaceVariant} />}
          style={{ position: 'absolute', left: -18 }}
        />
      }
      error={errorMessage.email}
    />
  )

  const renderPasswordInput = () => (
    <PasswordTextInput
      onChangeText={handlePasswordChange}
      value={password}
      placeholder={t('INPUT_TEXT.PASSWORD_PLACEHOLDER')}
      errorMessage={errorMessage.password}
      outlineStyle={{ borderWidth: 0 }}
    />
  )

  const renderForgotPasswordLink = () => (
    <TouchableOpacity onPress={() => {}}>
      <Text color={colors.primary}>{t('BUTTON.FORGOT_PASSWORD')}</Text>
    </TouchableOpacity>
  )

  const renderLoginButton = () => (
    <Button
      style={{
        backgroundColor: colors.primary,
      }}
      onPress={() => {
        Keyboard.dismiss()
        handleSubmit({
          type: 'login',
        })
      }}
      label={t('BUTTON.LOGIN')}
      labelVariant="titleLarge"
      isLinearGradient
      gradientColors={colors.gradient.primary}
      labelStyle={{ color: colors.textPrimary }}
      disabled={isButtonDisabled} // Disable the button based on state
    />
  )

  return (
    <Flex direction="column">
      <Flex direction="column">
        {renderTitle()}
        {renderSubtitle()}
      </Flex>
      <Flex direction="column" style={{ gap: 14 }}>
        {renderEmailInput()}
        {renderPasswordInput()}
        {renderForgotPasswordLink()}
        {renderLoginButton()}
      </Flex>
    </Flex>
  )
}

export default Login
