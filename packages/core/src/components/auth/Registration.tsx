import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import {
  Button,
  CheckBox,
  Flex,
  PasswordTextInput,
  ProgressBar,
  Text,
  TextInput,
} from '@libs/components'
import { Icon } from '@libs/native-icons'

const Registration = ({ handleValidation, userDetails, errorMessage }: any) => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const [currentStep, setCurrentStep] = useState(1)
  const navigation = useNavigation()
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
    else navigation.goBack()
  }

  useEffect(() => {
    const checkIfAllFieldsFilled = () => {
      const stepFields = {
        1: ['username', 'surname', 'email'],
        2: ['address', 'canon'],
        3: ['password', 'confirmPassword', 'agb'],
      }
      const fields = stepFields[currentStep]
      const allFieldsFilled = fields.every((field) => !!userDetails[field])
      setIsButtonDisabled(!allFieldsFilled)
    }

    checkIfAllFieldsFilled()
  }, [userDetails, currentStep])

  const handleRegistration = async () => {
    try {
      const { email, password, username, surname, address, canon } = userDetails
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      )

      const user = userCredential.user
      await firestore().collection('users').doc(email).set({
        username,
        surname,
        address,
        canon,
      })
      navigation.navigate('home')
    } catch (error) {
      console.error(error)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Flex direction="column" style={{ gap: 14 }}>
            <TextInput
              onChangeText={(value: any) => {
                handleValidation('username', value)
              }}
              value={userDetails.username}
              outlineStyle={{ borderWidth: 0 }}
              placeholder={t('INPUT_TEXT.NAME_PLACEHOLDER')}
            />
            <TextInput
              onChangeText={(value: any) => {
                handleValidation('surname', value)
              }}
              value={userDetails.surname}
              outlineStyle={{ borderWidth: 0 }}
              placeholder={t('INPUT_TEXT.SURNAME_PLACEHOLDER')}
            />
            <TextInput
              onChangeText={(value: any) => {
                handleValidation('email', value)
              }}
              value={userDetails.email}
              placeholder={t('INPUT_TEXT.EMAIL_PLACEHOLDER')}
              outlineStyle={{ borderWidth: 0 }}
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
          </Flex>
        )
      case 2:
        return (
          <Flex direction="column" style={{ gap: 14 }}>
            <TextInput
              onChangeText={(value: any) => {
                handleValidation('address', value)
              }}
              value={userDetails.address}
              outlineStyle={{ borderWidth: 0 }}
              placeholder={t('INPUT_TEXT.ADDRESS_PLACEHOLDER')}
            />
            <TextInput
              onChangeText={(value: any) => {
                handleValidation('canon', value)
              }}
              value={userDetails.canon}
              outlineStyle={{ borderWidth: 0 }}
              placeholder={t('INPUT_TEXT.CANTON_PLACEHOLDER')}
            />
          </Flex>
        )
      case 3:
        return (
          <Flex direction="column" style={{ gap: 14 }}>
            <PasswordTextInput
              onChangeText={(value: any) => {
                handleValidation('password', value)
              }}
              value={userDetails.password}
              placeholder={t('INPUT_TEXT.PASSWORD_PLACEHOLDER')}
              errorMessage={errorMessage.password}
            />

            <PasswordTextInput
              onChangeText={(value: any) => {
                handleValidation('confirmPassword', value)
              }}
              value={userDetails.confirmPassword}
              placeholder={t('INPUT_TEXT.CONFIRM_PASSWORD_PLACEHOLDER')}
              errorMessage={errorMessage.confirmPassword}
            />

            <Flex direction="row" style={{ gap: 10, alignItems: 'center' }}>
              <CheckBox
                style={{ backgroundColor: colors.secondaryContainer }}
                onPress={(value: any) => handleValidation('agb', value)}
                status={userDetails.agb}
              />
              <Text variant="titleLarge" color={colors.textPrimary}>
                {t('AUTH.CHECKBOX1')}
              </Text>
            </Flex>
            <Flex direction="row" style={{ gap: 10, alignItems: 'center' }}>
              <CheckBox
                onPress={(value: any) =>
                  handleValidation('canSendOfferAndNews', value)
                }
                style={{ backgroundColor: colors.secondaryContainer }}
                status={userDetails.canSendOfferAndNews}
              />
              <Text variant="titleLarge" color={colors.textPrimary}>
                {t('AUTH.CHECKBOX2')}
              </Text>
            </Flex>
          </Flex>
        )
      default:
        return null
    }
  }

  return (
    <Flex direction="column">
      <ProgressBar progress={(currentStep - 1) / 2} color={colors.primary} />
      <Flex direction="column" style={{ marginTop: 32 }}>
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
      {renderStep()}
      <Flex direction="column" style={{ gap: 14, marginTop: 32 }}>
        <Button
          style={{ backgroundColor: colors.primary }}
          onPress={currentStep === 3 ? handleRegistration : handleNextStep}
          disabled={isButtonDisabled}
          label={currentStep === 3 ? t('BUTTON.SIGN_UP') : t('BUTTON.NEXT')}
          labelStyle={{ color: colors.textPrimary }}
        />

        <Button
          style={{ backgroundColor: colors.secondaryContainer }}
          onPress={handlePreviousStep}
          label={t('BUTTON.BACK')}
          labelStyle={{ color: colors.textPrimary }}
        />
      </Flex>
    </Flex>
  )
}

export default Registration
