import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { spacing } from '@libs/theme'
import PropTypes from 'prop-types'
import { useTheme } from '@react-navigation/native'

interface RadioButtonProps {
  activeState: boolean
  color: any
  onPress: any
  size: number
}

const RadioButton = (props: RadioButtonProps) => {
  const theme: any = useTheme()
  const { activeState, color, onPress = () => {}, size } = props
  return (
    <View
      style={{
        borderColor: color || theme.colors.textLink,
        borderRadius: 50,
        borderWidth: 2,
        height: size,
        padding: spacing.spacing1,
        width: size,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: activeState
            ? color || theme.colors.textLink
            : 'transparent',
          borderRadius: 50,
          height: '100%',
          width: '100%',
        }}
      />
    </View>
  )
}
RadioButton.propTypes = {
  activeState: PropTypes.bool,
  color: PropTypes.string,
  onPress: PropTypes.func,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

RadioButton.defaultProps = {
  activeState: false,
  color: '',
  onPress: () => {},
  size: 32,
}
export default RadioButton
