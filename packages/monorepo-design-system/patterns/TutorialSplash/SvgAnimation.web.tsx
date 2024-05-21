import React from 'react'
import { Image } from 'react-native'

export const SvgAnimation = ({ webData }) => {
  return (
    <Image
      style={{
        width: 360,
        height: 360,
        marginHorizontal: 16,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingTop: 16,
      }}
      resizeMode="contain"
      source={{ uri: webData }}
    />
  )
}
