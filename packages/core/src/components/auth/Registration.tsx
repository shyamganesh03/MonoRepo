import React from 'react'
import {
  Button,
  CheckBox,
  Flex,
  PasswordTextInput,
  ProgressBar,
  Text,
  TextInput,
} from '@libs/components'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Icon } from '@libs/native-icons'

import { useState } from 'react'
const Registration = () => {
  const { colors } = useTheme<any>()
  const { t } = useTranslation()
  const [step, setStep] = useState(1)

  return (
    <Flex direction="column">
      <ProgressBar progress={0.35} color={colors.primary} />
      <Flex direction="column" style={{ marginTop: 32 }}>
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
      {step === 1 && (
        <Flex direction="column" style={{ gap: 14 }}>
          <TextInput
            style={{ height: 40 }}
            outlineStyle={{ borderWidth: 0 }}
            placeholder={'Name'}
          />
          <TextInput
            style={{ height: 40 }}
            outlineStyle={{ borderWidth: 0 }}
            placeholder={'Surname'}
          />

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
        </Flex>
      )}
      {step === 2 && (
        <Flex direction="column" style={{ gap: 14 }}>
          <TextInput
            style={{ height: 40 }}
            outlineStyle={{ borderWidth: 0 }}
            placeholder={'Address'}
          />
          <TextInput
            style={{ height: 40 }}
            outlineStyle={{ borderWidth: 0 }}
            placeholder={'Canton'}
          />
        </Flex>
      )}
      {step === 3 && (
        <Flex direction="column" style={{ gap: 14 }}>
          <PasswordTextInput placeholder={'Password'} style={{ height: 40 }} />

          <PasswordTextInput placeholder={'Password'} style={{ height: 40 }} />
          <Flex direction="row" style={{ gap: 10, alignItems: 'center' }}>
            <CheckBox style={{ backgroundColor: colors.secondaryContainer }} />
            <Text
              variant="bodyBold1"
              color={colors.textPrimary}
              style={{ fontWeight: 700 }}
            >
              {t('AUTH.CHECKBOX1')}
            </Text>
          </Flex>
          <Flex direction="row" style={{ gap: 10, alignItems: 'center' }}>
            <CheckBox style={{ backgroundColor: colors.secondaryContainer }} />
            <Text
              variant="bodyBold1"
              color={colors.textPrimary}
              style={{ fontWeight: 700 }}
            >
              {t('AUTH.CHECKBOX2')}
            </Text>
          </Flex>
        </Flex>
      )}
      <Flex direction="column" style={{ gap: 14, marginTop: 32 }}>
        <Button
          style={{ backgroundColor: colors.primary }}
          onPress={() => setStep(step + 1)}
          label={step < 3 ? 'Next' : 'Sign Up'}
          labelStyle={{ color: colors.textPrimary }}
        />
        <Button
          style={{ backgroundColor: colors.secondaryContainer }}
          onPress={() => setStep(step - 1)}
          label={'Back'}
          labelStyle={{ color: colors.textPrimary }}
        />
      </Flex>
    </Flex>
  )
}

export default Registration
