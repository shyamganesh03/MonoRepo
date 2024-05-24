import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { spacing } from '@libs/theme'
import { testProps } from '@libs/utils'
import Text from '../Text/Text'
import { useTheme } from '@react-navigation/native'

interface ButtonProps {
  appearance?: string
  status?: string
  iconLeft?: string
  iconRight?: string
  label: string
  onPress: Function
  size?: string
  style?: any
  textStyle?: any
  textVariant?: string
  auditProps?: any
  testingProps?: any
}

const Button = (props: ButtonProps) => {
  const theme: any = useTheme()
  const {
    appearance = 'filled',
    status,
    iconLeft,
    iconRight,
    label,
    onPress,
    size,
    style,
    textStyle,
    textVariant,
    testingProps,
  } = props

  const handleButtonSubmit = async () => {
    onPress()
  }

  return (
    <TouchableOpacity
      style={StyleSheet.flatten([
        getButtonStyle(appearance, status, theme),
        { alignSelf: size !== 'large' ? 'center' : 'auto' },
        styles.button,
        {
          ...getButtonSize(size),
        },
        style,
      ])}
      disabled={status === 'inactive'}
      onPress={handleButtonSubmit}
      {...testProps(
        `${testingProps?.screenName}_${testingProps?.typeofControl}_${testingProps?.behavior}`,
      )}
    >
      {iconLeft && (
        <View
          style={{
            paddingRight: spacing.spacing4,
          }}
        >
          {iconLeft}
        </View>
      )}
      <Text
        variant={textVariant}
        style={StyleSheet.flatten([
          getButtonTextStyle(appearance, theme),
          textStyle,
        ])}
      >
        {label}
      </Text>

      {iconRight && (
        <View
          style={{
            paddingLeft: spacing.spacing4,
          }}
        >
          {iconRight}
        </View>
      )}
    </TouchableOpacity>
  )
}

Button.propTypes = {
  /** Appearance of the component. Can be filled, outline or text. Defaults to filled. */
  appearance: PropTypes.oneOf(['filled', 'outlined', 'text']),
  /** Status of the component. Can be active or inactive. Defaults to active. */
  status: PropTypes.oneOf(['active', 'inactive']),
  /** Icon to appear on the left side of the button */
  iconLeft: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  /** Icon to appear on the right side of the button */
  iconRight: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  /** Label text to be displayed inside the button */
  label: PropTypes.string,
  /** Function for onPress */
  onPress: PropTypes.func,
  /** size of the button */
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  /** style for the button */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /** style for the text/label inside the button */
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /** textVariant for the text/label inside the button */
  textVariant: PropTypes.string,
}

Button.defaultProps = {
  appearance: 'filled',
  status: 'active',
  iconLeft: false,
  iconRight: false,
  label: '',
  onPress: () => {},
  size: 'large',
  style: {},
  textStyle: {},
  textVariant: 'functional1',
}

const getButtonSize = (size: string | undefined) => {
  switch (size) {
    case 'small':
      return {
        paddingHorizontal: spacing.spacing3,
        paddingVertical: spacing.spacing3,
      }

    case 'medium':
      return {
        paddingHorizontal: spacing.spacing4,
        paddingVertical: spacing.spacing4,
      }

    default:
      return {
        paddingHorizontal: spacing.spacing5,
        paddingVertical: spacing.spacing5,
      }
  }
}

const getButtonTextStyle = (appearance: string, theme: any) => {
  const textStyle = [
    {
      color: theme.colors.textPrimary,
    },
  ]
  if (appearance === 'filled') {
    textStyle.push({
      color: theme.colors.onPrimary,
    })
  }
  return textStyle
}

const getButtonStyle = (
  appearance: string,
  status: string | undefined,
  theme: any,
) => {
  const buttonStyle: any[] = [
    {
      backgroundColor: theme.colors.primary,
    },
  ]

  if (appearance === 'text') {
    buttonStyle.push({
      backgroundColor: 'transparent',
    })
  }

  if (status === 'inactive') {
    buttonStyle.push({
      backgroundColor: theme.colors.textInactive,
    })
  }

  if (appearance === 'outlined') {
    buttonStyle.push({
      backgroundColor: 'transparent',
      borderColor: theme.colors.textPrimary,
      borderWidth: 1,
    })
  }

  if (status === 'inactive' && appearance === 'outlined') {
    buttonStyle.push({
      backgroundColor: 'transparent',
      borderColor: theme.colors.textPrimary,
      borderWidth: 1,
      opacity: 0.3,
    })
  }

  return buttonStyle
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

export default Button
