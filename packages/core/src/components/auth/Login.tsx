import React from 'react'
import { Button, Flex, Text, TextInput } from '@libs/components'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Icon } from '@libs/native-icons'
import { PasswordTextInput } from '@libs/components'

const Login = ({ setState }: { setState: any }) => {
  const { colors } = useTheme<any>()
  const { t } = useTranslation()
  return (
    <Flex direction="column">
      <Flex direction="column">
        <Text
          variant="heading2"
          color={colors.textPrimary}
          style={{ fontWeight: 700 }}
        >
          {t('AUTH.TITLE')}
        </Text>
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
      </Flex>
      <Flex direction="column" style={{ gap: 14 }}>
        <TextInput
          style={{ height: 40 }}
          placeholder={'max.muster@izzo-app.com'}
          outlineStyle={{ borderWidth: 0 }}
          left={
            <TextInput.Icon
              icon={() => (
                <Icon name="AtIcon" color={colors.onSurfaceVariant} />
              )}
              style={{ position: 'absolute', left: -25 }}
            />
          }
        />
        <PasswordTextInput placeholder="Password" style={{ height: 40 }} />

        <Button
          style={{ backgroundColor: colors.primary }}
          onPress={() => setState((prevState: number) => prevState + 1)}
          label="Login"
          labelStyle={{ color: colors.textPrimary }}
        />
      </Flex>
    </Flex>
  )
}

export default Login
