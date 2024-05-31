import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Icon } from '@libs/native-icons'

const CheckBox = (props: any) => {
  const {
    onPress = () => {},
    size = 15,
    style,
    status = 'unchecked',
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
        borderWidth: 0.7,
        height: size,
        justifyContent: 'center',
        width: size,
        ...style,
      }}
        >
      {status === 'checked' && (
        <Icon
          color={iconColor || colors.onSurface}
          name={iconName}
          height={height}
          width={width}
        />
      )}
      </View>
      
    </TouchableOpacity>
  )
}

export default CheckBox
