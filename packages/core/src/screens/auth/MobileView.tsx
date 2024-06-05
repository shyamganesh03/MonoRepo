import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Image, Flex } from '@libs/components'
import { MobileContainer } from '@libs/container'
import LoginAndSignUp from '../../components/auth/LoginAndSignUp'
import Registration from '../../components/auth/Registration'
import { Izzo } from 'assets'
import Login from '../../components/auth/Login'

const MobileView: React.FC = ({
  handleValidation,
  userDetails,
  errorMessage,
  handleCheckBox,
  showLogin,
  toggleRegistration,
}: any) => {
  const { colors } = useTheme()

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 25 : 100} // adjust this value according to your UI
    >
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <MobileContainer hasKeyBoard>
          <Flex direction="row" style={{ justifyContent: 'center' }}>
            <Image
              imageUrl={Izzo}
              size={150}
              resizeMode="contain"
              style={{ marginBottom: 40 }}
            />
          </Flex>

          {/* <LoginAndSignUp   handleValidation={handleValidation} userDetails={userDetails} errorMessage={errorMessage} />  */}
          {/* <Login  handleValidation={handleValidation} userDetails={userDetails} errorMessage={{...errorMessage}}/>  */}
          <Registration
            handleValidation={handleValidation}
            userDetails={userDetails}
            errorMessage={{ ...errorMessage }}
            handleCheckBox={handleCheckBox}
          />
        </MobileContainer>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default MobileView
