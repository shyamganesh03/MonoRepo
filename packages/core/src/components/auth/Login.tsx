import { Button, Flex, Text, TextInput } from '@libs/components'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Icon } from '@libs/native-icons'
import { useNavigation } from '@react-navigation/native'
import { PasswordTextInput } from '@libs/components'
import { View } from 'react-native'
import {handleLogin} from '@izzo/api/src/auth'

const Login = ({ handleValidation, userDetails, errorMessage }: any) => {
  const { colors } = useTheme<any>()
  const { t } = useTranslation()
  const navigation:any = useNavigation()
  const handleSubmit = async () => {
    try {
      const isLoggedIn = await handleLogin(userDetails.email, userDetails.password);
      if (isLoggedIn) {
        navigation.navigate('home');
      }
    } catch (error) {
      console.error('Error during login:', error);
      
    }
  };

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
        maxWidth: 240,
      }}
    >
      <Text variant="labelMedium">{t('AUTH.SUBTITLE')}</Text>
    </View>
  )

  const renderEmailInput = () => (
    <TextInput
      onChangeText={(value: any) => {
        handleValidation('email', value)
      }}
      value={userDetails.email}
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
      onChangeText={(value: any) => {
        handleValidation('password', value)
      }}
      value={userDetails.password}
      placeholder={t('INPUT_TEXT.PASSWORD_PLACEHOLDER')}
      style={{ height: 40 }}
      errorMessage={errorMessage.password}
    />
  )

  const renderLoginButton = () => (
    <Button
      style={{ backgroundColor: colors.primary }}
      onPress={()=>handleSubmit()}
      label={t('BUTTON.LOGIN')}
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
