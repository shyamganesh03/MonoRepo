import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

const BlurWidget = ({ variant, onPress = () => {} }, disabled) => {
  return (
    <TouchableOpacity
      style={[
        styles.blur,
        {
          // @ts-ignore
          backdropFilter: variant === 'blur80' ? 'blur(80px)' : 'blur(8px)',
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    />
  )
}

export default BlurWidget

const styles = StyleSheet.create({
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(183, 165, 250, 0.3)',
    backdropFilter: 'blur(80px)',
    // @ts-ignore
    height: '100vh',
  },
})
