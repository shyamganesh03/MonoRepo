import PropTypes from 'prop-types'
import React from 'react'
import { typography } from '@libs/theme'
import { useTheme, Text as TextElement } from 'react-native-paper'

interface TextProps {
  children: any
  color?: string
  numberOfLines?: number
  textAlign?: string
  variant?: string
  textDecorationLine?: string
  textTransform?: string
}

const Text = (props: TextProps) => {
  const {
    children,
    color = '',
    numberOfLines,
    textAlign,
    variant = 'bodyMedium',
    textDecorationLine = 'none',
    textTransform = 'none',
  } = props
  const theme: any = useTheme()

  const defaultStyle = [
    //@ts-ignore
    typography[variant],
    {
      textAlign,
      color: color || theme.colors.textPrimary,
      textDecorationLine,
      textTransform,
    },
  ]
  return (
    <TextElement style={defaultStyle} numberOfLines={numberOfLines}>
      {children}
    </TextElement>
  )
}

const variants = [
  'displaySmall',
  'displayMedium',
  'displayLarge',
  'headlineSmall',
  'headlineMedium',
  'headlineLarge',
  'titleSmall',
  'titleMedium',
  'titleLarge',
  'labelSmall',
  'labelMedium',
  'labelLarge',
  'bodySmall',
  'bodyMedium',
  'bodyLarge',
]

Text.propTypes = {
  color: PropTypes.string,
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  variant: PropTypes.oneOf(variants),
}
Text.defaultProps = {
  color: '',
  textAlign: 'left',
  variant: 'bodySmall',
}

Text.variants = variants

export default Text
