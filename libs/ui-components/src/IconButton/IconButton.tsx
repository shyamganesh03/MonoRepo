import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from '@libs/native-icons'

interface IconButtonProps {
  name: string
  color: string
  style?: any
  handlePress?: () => {}
}

const IconButton = (props: IconButtonProps) => {
  return (
    <TouchableOpacity style={props.style} onPress={() => props?.handlePress()}>
      <Icon name={props.name} color={props.color} />
    </TouchableOpacity>
  )
}
export default IconButton
