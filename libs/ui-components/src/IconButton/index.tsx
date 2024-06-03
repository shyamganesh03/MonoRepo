import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from '@libs/native-icons'

interface IconButtonProps {
  name: string
  color: string
  onPress?: any
  style?: any
  iconStyle?: any
}

const IconButton = (props: IconButtonProps) => {
  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      <Icon name={props.name} color={props.color} {...props.iconStyle} />
    </TouchableOpacity>
  )
}
export default IconButton
