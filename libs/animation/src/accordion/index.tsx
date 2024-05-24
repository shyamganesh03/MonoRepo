import { useState, useEffect, useRef } from 'react'
import { Animated } from 'react-native'

const useAccordion = ({ layoutHeight }) => {
  const [expanded, setExpanded] = useState(false)
  const heightAnim = useRef(new Animated.Value(0)).current
  const opacityAnim = useRef(new Animated.Value(0)).current

  useEffect(
    () =>
      Animated.parallel([
        Animated.timing(heightAnim, {
          toValue: expanded ? 300 : 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: expanded ? 1 : 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(),
    [expanded, heightAnim, opacityAnim],
  )

  const handlePress = () => {
    setExpanded((prevState) => !prevState)
  }

  const height = heightAnim.interpolate({
    inputRange: [0, 300],
    outputRange: [0, layoutHeight],
  })

  const opacity = opacityAnim

  return { handlePress, height, setExpanded, expanded, opacity }
}
export default useAccordion
