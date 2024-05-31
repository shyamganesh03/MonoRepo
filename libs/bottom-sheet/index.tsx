import React, { useEffect, useRef } from 'react'
import { Animated, Dimensions, PanResponder, View } from 'react-native'

export const Sheet = (props: {
  dismiss: any
  isEnable?: boolean
  direction?: 'bottom' | 'top' | 'left' | 'right'
  children: any
}) => {
  const { dismiss, isEnable = true, direction = 'bottom', children } = props
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height

  const initialPosition =
    direction === 'bottom'
      ? screenHeight
      : direction === 'top'
        ? -screenHeight
        : direction === 'left'
          ? -screenWidth
          : screenWidth

  const pan = useRef(new Animated.Value(initialPosition)).current

  const resetPositionAnim = Animated.timing(pan, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  })

  const closeAnim = Animated.timing(pan, {
    toValue: initialPosition,
    duration: 500,
    useNativeDriver: true,
  })

  const handleDismiss = () => closeAnim.start(() => dismiss())

  useEffect(() => {
    resetPositionAnim.start()
  }, [resetPositionAnim])

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (
          (direction === 'left' && gestureState.dx < 0) ||
          (direction === 'right' && gestureState.dx > 0) ||
          (direction === 'top' && gestureState.dy < 0) ||
          (direction === 'bottom' && gestureState.dy > 0)
        ) {
          Animated.event(
            [
              null,
              direction === 'left' || direction === 'right'
                ? { dx: pan }
                : { dy: pan },
            ],
            {
              useNativeDriver: false,
            },
          )(evt, gestureState)
        }
      },
      onPanResponderRelease: (_, gs) => {
        const moveThreshold =
          direction === 'left' || direction === 'right'
            ? screenWidth / 4
            : screenHeight / 4
        const velocityThreshold = 2

        const shouldNotClose =
          (direction === 'bottom' && gs.dy < 0) ||
          (direction === 'top' && gs.dy > 0) ||
          (direction === 'left' && gs.dx > 0) ||
          (direction === 'right' && gs.dx < 0)

        if (shouldNotClose) {
          return resetPositionAnim.start()
        }

        if (
          (direction === 'bottom' && gs.dy > 0 && gs.vy > velocityThreshold) ||
          (direction === 'top' && gs.dy < 0 && gs.vy < -velocityThreshold) ||
          (direction === 'left' && gs.dx < 0 && gs.vx < -velocityThreshold) ||
          (direction === 'right' && gs.dx > 0 && gs.vx > velocityThreshold) ||
          (Math.abs(gs.moveY) > moveThreshold &&
            (direction === 'bottom' || direction === 'top')) ||
          (Math.abs(gs.moveX) > moveThreshold &&
            (direction === 'left' || direction === 'right'))
        ) {
          return handleDismiss()
        }

        return resetPositionAnim.start()
      },
    }),
  ).current

  const dynamicStyles = {
    width:
      direction === 'left' || direction === 'right'
        ? screenWidth - 100
        : screenWidth,
    height:
      direction === 'bottom' || direction === 'top' ? 'auto' : screenHeight,
  }

  const findTransform = (direction: any) => {
    switch (direction) {
      case 'left': {
        return { translateX: pan }
      }
      case 'right': {
        return { translateX: pan }
      }
      case 'bottom': {
        return { translateY: pan }
      }
      case 'top': {
        return { translateY: pan }
      }
      default:
        return {}
    }
  }

  return isEnable ? (
    <Animated.View
      style={{
        ...dynamicStyles,
        transform: [findTransform(direction)],
        position: 'absolute',
        [direction]: 0,
      }}
      {...panResponders.panHandlers}
    >
      {children}
    </Animated.View>
  ) : (
    <View>{children}</View>
  )
}
