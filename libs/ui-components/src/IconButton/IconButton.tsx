import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from '@libs/native-icons'

interface IconButtonProps {
  name: string
  color: string
  style?: any
  handlePress?: any
}

const IconButton = ({
  style,
  name,
  color,
  handlePress = () => {},
}: IconButtonProps) => {
  return (
    <TouchableOpacity style={style} onPress={() => handlePress()}>
      <Icon name={name} color={color} />
    </TouchableOpacity>
  )
}
export default IconButton
