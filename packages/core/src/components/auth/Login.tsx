import React from 'react'
import { Button, Flex, Text, TextInput } from '@libs/components'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Icon } from '@libs/native-icons'
import { PasswordTextInput } from '@libs/components'

const Login = ({ setState }: { setState: any }) => {
  const { colors } = useTheme<any>()
  const { t } = useTranslation()

  const renderTitle = () => (
    <Text
      variant="heading2"
      color={colors.textPrimary}
      style={{ fontWeight: 700 }}
    >
      {t('AUTH.TITLE')}
    </Text>
  )

  const renderSubtitle = () => (
    <Text
      variant="body2"
      style={{
        paddingTop: 24,
        paddingBottom: 27,
        fontWeight: 500,
        maxWidth: 240,
      }}
    >
      {t('AUTH.SUBTITLE')}
    </Text>
  )

  const renderEmailInput = () => (
    <TextInput
      style={{ height: 40 }}
      placeholder={t('INPUT_TEXT.EMAIL_PLACEHOLDER')}
      outlineStyle={{ borderWidth: 0 }}
      left={
        <TextInput.Icon
          icon={() => <Icon name="AtIcon" color={colors.onSurfaceVariant} />}
          style={{ position: 'absolute', left: -25 }}
        />
      }
    />
  )

  const renderPasswordInput = () => (
    <PasswordTextInput placeholder="Password" style={{ height: 40 }} />
  )

  const renderLoginButton = () => (
    <Button
      style={{ backgroundColor: colors.primary }}
      onPress={() => setState((prevState: number) => prevState + 1)}
      label="Login"
      labelStyle={{ color: colors.textPrimary }}
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
        {renderLoginButton()}
      </Flex>
    </Flex>
  )
}

export default Login
