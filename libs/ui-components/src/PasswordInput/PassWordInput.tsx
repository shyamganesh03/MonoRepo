/* eslint-disable prefer-regex-literals */
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { testProps } from '@libs/utils'

import TextInput from '../TextInput/TextInput'
import { Icon } from '@libs/native-icons'

const PasswordTextInput = (props: any) => {
  const {
    onFocus = () => {},
    placeholder,
    onBlur = () => {},
    setIsValidPassword = () => {},
    testName,
    onChangeText = () => {},
  } = props
  const { colors } = useTheme()
  const [passwordValue, setPasswordValue] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(true)
  const [label, setLabel] = useState('')

  
  return (
    <View>
      <TextInput
        {...props}
        onChangeText={(text: any) => {
          setPasswordValue(text)
          onChangeText(text)
        }}
        onKeyPress={({ nativeEvent }: any) => {
          if (nativeEvent.key === 'Enter') {
            props?.method()
          }
        }}
        outlineColor={props.outlineColor}
        mode={props?.mode || 'outlined'}
        placeholderTextColor={props?.placeholderTextColor}
        secureTextEntry={showPassword}
        onFocus={() => {
          setLabel(props.label)
          onFocus()
        }}
        label={label}
        onBlur={() => {
          onBlur()
        }}
        right={
          <TextInput.Icon
            icon={() => (
              <Icon name={showPassword ? 'EyeHiddenIcon' : 'EyeIcon'} />
            )}
            onPress={() => setShowPassword(!showPassword)}
            {...testProps(testName)}
            forceTextInputFocus={false}
          />
        }
      />
    </View>
  )
}

PasswordTextInput.defaultProps = {
  onValidate: () => {},
  errorMessage: '',
}

PasswordTextInput.propTypes = {
  onValidate: PropTypes.func,
  errorMessage: PropTypes.string,
}

export default PasswordTextInput
