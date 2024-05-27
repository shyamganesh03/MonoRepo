import React from 'react'
import { View } from 'react-native'
import { Flex as RNFlex, Spacer } from 'react-native-flex-layout'

interface FlexProps {
  direction: 'row' | 'column'
  children: any
  style?: any
}
const Flex = (props: FlexProps) => {
  return (
    <RNFlex direction={props.direction} style={props.style}>
      {props.children}
    </RNFlex>
  )
}
export default Flex
