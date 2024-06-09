import { spacing, typography } from '@libs/theme'
import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Button as RNPButton, Text } from 'react-native-paper'

interface ButtonProps {
  disabled?: boolean
  icon?: any
  isLinearGradient?: boolean
  gradientColors?: any
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
  isLinearGradient,
  mode,
  onPress,
  style,
  labelStyle,
  labelVariant,
  label,
  gradientColors = [],
}: ButtonProps) => {
  if (isLinearGradient) {
    return (
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          colors={gradientColors}
          style={[
            {
              borderRadius: spacing.spacing5,
              height: spacing.spacing8,
              alignItems: 'center',
              justifyContent: 'center',
            },
            style,
          ]}
          start={{ y: 0.0, x: 0.3 }}
          end={{ y: 0.0, x: 1.0 }}
        >
          <Text
            style={[
              labelStyle,
              //@ts-ignore
              typography[labelVariant],
            ]}
          >
            {label}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  } else {
    return (
      <RNPButton
        disabled={disabled}
        icon={icon}
        mode={mode || 'text'}
        onPress={onPress}
        style={[{ borderRadius: 18 }, style]}
        //@ts-ignore
        labelStyle={[labelStyle, typography[labelVariant]]}
        uppercase={false}
      >
        {label}
      </RNPButton>
    )
  }
}

export default Button
