import { useEffect, useRef } from 'react'
import { Animated, Dimensions } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

const useSlideInAnimation = (
  duration = 150,
  inputRange = [-1, 0, 1],
  outputRange = [0, 0, 1],
) => {
  // check if the current screen is focused
  const isFocused = useIsFocused()

  // get the width of the device screen
  const screenWidth = Dimensions.get('screen').width

  // panX is used to control the position of the sliding animation.
  // By setting the initial value of panX to the width of the screen, the component that is being animated starts off-screen and slides in from the right when the animation starts. This creates the desired sliding in effect.
  // useRef is used here to create a reference to the animated value, so that it can be used in other parts of the component and its value can be updated over time.
  // .current is added to access the current state of the animated value.
  const panX = useRef(new Animated.Value(screenWidth)).current

  // create an animation that updates the panX value to 0 over a duration of 150 milliseconds using the native driver
  const openAnim = Animated.timing(panX, {
    toValue: 0, // specifies that the animation should end with a final value of 0 for panX
    duration, // specifies the duration of the animation in milliseconds.
    useNativeDriver: true, // this allows the animation to run on the device's native UI thread for better performance
  })

  // create an animated value that maps the panX input range to an output range of [0,0,1]
  // this is used to create the sliding in effect
  const translateX = panX.interpolate({
    inputRange, // input range of the panX value
    outputRange, // output range of the translateX value
  })

  // start the openAnim animation when the component is focused
  useEffect(() => {
    if (!isFocused) return
    openAnim.start()
  }, [isFocused])

  // return the translateX animated value
  return translateX
}

export default useSlideInAnimation
