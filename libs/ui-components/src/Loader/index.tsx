import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator as RNPActivityIndicator } from 'react-native-paper'

interface LoaderProps {
  animating: boolean
  style: any
  color: string
  size: 'small' | 'large' | number
  hidesWhenStopped: boolean
}

const Loader = (props: LoaderProps) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <RNPActivityIndicator
        animating={props.animating}
        color={props.color}
        size={props.size}
        style={props.style}
        hidesWhenStopped={props?.hidesWhenStopped}
      />
    </View>
  )
}

export default Loader
