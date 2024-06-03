import { typography } from '@libs/theme'
import * as React from 'react'
import { Button as RNPButton } from 'react-native-paper'

interface ButtonProps {
  disabled?: boolean
  icon?: any
  mode?:
    | 'text'
    | 'contained'
    | 'outlined'
    | 'elevated'
    | 'contained-tonal'
    | undefined
  style?: any
  labelStyle?: any
  labelVariant?: any
  label: string
  onPress: any
}

const Button = ({
  disabled,
  icon,
  mode,
  onPress,
  style,
  labelStyle,
  labelVariant,
  label,
}: ButtonProps) => (
  <RNPButton
    disabled={disabled}
    icon={icon}
    mode={mode || 'text'}
    onPress={onPress}
    style={[{ borderRadius: 18 }, style]}
    //@ts-ignore
    labelStyle={[labelStyle, typography[labelVariant]]}
  >
    {label}
  </RNPButton>
)

export default Button
