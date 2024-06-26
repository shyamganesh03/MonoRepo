import React from 'react'
import { StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-web-linear-gradient'

import PropTypes from 'prop-types'
import { useTheme } from 'react-native-paper'

const Card = (props: any) => {
  const theme: any = useTheme()

  const { backgroundColor, borderRadius, children, colorVariant, style } = props
  const bgColor = theme.colors[colorVariant] || backgroundColor

  if (typeof bgColor === 'object') {
    return (
      <LinearGradient
        style={StyleSheet.flatten([
          {
            borderRadius,
          },
          style,
        ])}
        colors={bgColor}
      >
        {children}
      </LinearGradient>
    )
  }
  return (
    <View
      style={StyleSheet.flatten([
        {
          backgroundColor: bgColor,
          borderRadius,
          width: '100%',
        },
        style,
      ])}
    >
      {children}
    </View>
  )
}

Card.propTypes = {
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,
  colorVariant: PropTypes.string,
}

Card.defaultProps = {
  backgroundColor: '#fff',
  borderRadius: 10,
  colorVariant: 'secondaryVariant4',
}

export default Card
