import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { useTheme } from 'react-native-paper'

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
            : theme.colors.backgroundSurface2,
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
            margin: 2,
          },
        ]}
      />
      <View
        style={[
          styles.toggleActiveCircle,
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
    height: 31,
    width: 51,
  },
  toggleCircle: {
    borderRadius: 100,
    height: 27,
    justifyContent: 'center',
    width: 27,
    margin: 2,
  },
  toggleActiveCircle: {
    borderRadius: 100,
    height: 27,
    width: 27,
    position: 'absolute',
    right: 3,
    top: 2,
  },
})

export default ToggleSwitch
