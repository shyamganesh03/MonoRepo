import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { useTheme } from '@react-navigation/native'

interface ToggleSwitchProps {
  activeState: boolean
  setActiveState: any
  style: any
}

const ToggleSwitch = (props: ToggleSwitchProps) => {
  const theme: any = useTheme()

  const { activeState, setActiveState, style } = props

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        {
          backgroundColor: activeState
            ? theme.colors.primary
            : theme.colors.backgroundSurface3,
        },
        styles.toggleView,
        style,
      ]}
      onPress={() => setActiveState(!activeState)}
    >
      <View
        style={[
          styles.toggleCircle,
          {
            backgroundColor: !activeState
              ? theme.colors.textPrimary
              : 'transparent',
          },
        ]}
      />
      <View
        style={[
          styles.toggleCircle,
          {
            backgroundColor: !activeState
              ? 'transparent'
              : theme.colors.textPrimary,
          },
        ]}
      />
    </TouchableOpacity>
  )
}

ToggleSwitch.propTypes = {
  activeState: PropTypes.bool,
  setActiveState: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

ToggleSwitch.defaultProps = {
  activeState: false,
  setActiveState: () => {},
  style: {},
}

const styles = StyleSheet.create({
  toggleView: {
    borderRadius: 25,
    flexDirection: 'row',
    height: 23,
    justifyContent: 'space-between',
    padding: 5,
    width: 46,
  },
  toggleCircle: {
    alignItems: 'center',
    borderRadius: 25,
    height: 13,
    justifyContent: 'center',
    width: 13,
  },
})

export default ToggleSwitch
