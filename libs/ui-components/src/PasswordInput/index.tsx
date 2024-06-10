/* eslint-disable prefer-regex-literals */
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { View } from 'react-native'

import TextInput from '../TextInput'
import { Icon } from '@libs/native-icons'

interface PasswordTextInputProps {
  onFocus?: any
  placeholder: string
  onBlur?: any
  onChangeText?: any
  errorMessage?: any
  outlineColor?: string
  mode?: 'outlined' | 'flat' | undefined
  placeholderTextColor?: string
  label?: string
  value?: any
  style?: any
}

const PasswordTextInput = (props: PasswordTextInputProps) => {
  const {
    onFocus = () => {},
    placeholder,
    onBlur = () => {},
    onChangeText = () => {},
    errorMessage,
    outlineColor,
    mode,
    placeholderTextColor,
    value,
    style,
  } = props
  const [showPassword, setShowPassword] = React.useState(true)
  const [label, setLabel] = useState('')

  return (
    <View>
      <TextInput
        {...props}
        style={style}
        onChangeText={(text: any) => {
          onChangeText(text)
        }}
        placeholder={placeholder}
        onKeyPress={({ nativeEvent }: any) => {
          if (nativeEvent.key === 'Enter') {
          }
        }}
        outlineColor={outlineColor}
        value={value}
        mode={mode || 'outlined'}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={showPassword}
        onFocus={() => {
          setLabel(label)
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
            forceTextInputFocus={false}
          />
        }
        error={errorMessage}
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
