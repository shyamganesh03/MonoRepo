import React, { useState } from 'react'
import { Button, Flex, Text, TextInput } from '@libs/components'
import { Divider, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Icon } from '@libs/native-icons'
import { useNavigation } from '@react-navigation/native'

const LoginAndSignUp = ({ setState }: any) => {
  const { colors } = useTheme<any>()
  const { t } = useTranslation()
  const [textInputValue, setTextInputValue] = useState('')
  const navigation = useNavigation()

  const handleTextInputChange = (text: any) => {
    setTextInputValue(text)
  }

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
      <Flex direction="column">
        <TextInput
          onChangeText={(value: any) => handleTextInputChange(value)}
          value={textInputValue}
          outlineStyle={{ borderWidth: 0 }}
          style={{ height: 40 }}
          placeholder={'max.muster@izzo-app.com'}
          left={
            <TextInput.Icon
              icon={() => (
                <Icon name="AtIcon" color={colors.onSurfaceVariant} />
              )}
              style={{ position: 'absolute', left: -25 }}
            />
          }
        />
        <Button
          style={{
            marginTop: 14,
            marginBottom: 32,
            backgroundColor: colors.primary,
          }}
          onPress={() => setState((prevState: number) => prevState + 1)}
          mode="contained"
          label="Login & Sign Up"
          labelStyle={{ color: colors.textPrimary }}
          disabled={textInputValue.trim() === ''}
        />
      </Flex>
      <Divider />
      <Button
        style={{ marginTop: 32, backgroundColor: colors.secondaryContainer }}
        onPress={() => {
          navigation.navigate('home')
        }}
        label="Use as Guest"
        labelStyle={{ color: colors.textPrimary }}
      />
    </Flex>
  )
}

export default LoginAndSignUp
