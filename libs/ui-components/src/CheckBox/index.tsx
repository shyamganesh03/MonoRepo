import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Icon } from '@libs/native-icons'

const CheckBox = (props: any) => {
  const {
    onPress = () => {},
    size = 20,
    style,
    status = false,
    borderRadius = 4,
    height = 6,
    width = 10,
    iconName = 'SelectionIcon',
    iconColor,
  } = props
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      onPress={() => {
        onPress()
      }}
    >
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'white',
          borderColor: colors.onBackground,
          borderRadius,
          height: size,
          justifyContent: 'center',
          width: size,
          ...style,
        }}
      >
        {status && (
          <Icon
            color={iconColor || colors.onSecondary}
            name="SelectionIcon"
            width={15}
            height={15}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

export default CheckBox
