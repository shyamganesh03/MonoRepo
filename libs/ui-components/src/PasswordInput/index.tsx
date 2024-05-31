/* eslint-disable prefer-regex-literals */
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { View } from 'react-native'

import TextInput from '../TextInput'
import { Icon } from '@libs/native-icons'

const PasswordTextInput = (props: any) => {
  const {
    onFocus = () => {},
    placeholder,
    onBlur = () => {},
    onChangeText = () => {},
  } = props
  const [showPassword, setShowPassword] = React.useState(true)
  const [label, setLabel] = useState('')

  return (
    <View>
      <TextInput
        {...props}
        onChangeText={(text: any) => {
          onChangeText(text)
        }}
        placeholder={placeholder}
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
