import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from './ShimmerPlaceholder'

export const ShimmerPlaceholder = (props) => {
  const Placeholder = createShimmerPlaceholder(LinearGradient)
  const { style } = props
  return <Placeholder shimmerStyle={style} {...props} />
}
