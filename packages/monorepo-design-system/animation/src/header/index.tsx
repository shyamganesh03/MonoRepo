import { useRef } from 'react'
import { Animated } from 'react-native'

const useHeaderAnimation = (headerHeight = 54) => {
  let scrollValue = 0
  let headerVisible = true
  const focused = false
  const animation = useRef(new Animated.Value(0)).current
  const diffClamp = Animated.diffClamp(animation, 0, headerHeight)
  const translateY = diffClamp.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -headerHeight],
  })
  const onScroll = (e) => {
    if (focused) return
    const { y } = e.nativeEvent.contentOffset
    if (y > scrollValue && headerVisible && y > headerHeight / 2) {
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 0,
      }).start()
      headerVisible = false
    }
    if (y < scrollValue && !headerVisible) {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }).start()
      headerVisible = true
    }
    scrollValue = y
  }
  return { onScroll, translateY }
}

export default useHeaderAnimation
