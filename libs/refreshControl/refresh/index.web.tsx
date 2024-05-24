import React, { useRef, useEffect, useCallback, useMemo } from 'react'
import {
  View,
  Text,
  PanResponder,
  Animated,
  ActivityIndicator,
  findNodeHandle,
} from 'react-native'

export default function RefreshControl({
  refreshing,
  tintColor,
  colors,
  style,
  progressViewOffset,
  children,
  size,
  title,
  titleColor,
  onRefresh,
  enabled,
}) {
  const onRefreshRef = useRef(onRefresh)
  useEffect(() => {
    onRefreshRef.current = onRefresh
  }, [onRefresh])
  const enabledRef = useRef(enabled)
  useEffect(() => {
    enabledRef.current = enabled
  }, [enabled])

  const containerRef = useRef()
  const pullPosReachedState = useRef(0)
  const pullPosReachedAnimated = useRef(new Animated.Value(0))
  const pullDownSwipeMargin = useRef(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(pullDownSwipeMargin.current, {
      toValue: refreshing ? 50 : 0,
      duration: 350,
      useNativeDriver: false,
    }).start()
    if (refreshing) {
      pullPosReachedState.current = 0
      pullPosReachedAnimated.current.setValue(0)
    }
  }, [refreshing])

  const onPanResponderFinish = useCallback(() => {
    if (pullPosReachedState.current && onRefreshRef.current) {
      onRefreshRef.current()
    }
    if (!pullPosReachedState.current) {
      Animated.timing(pullDownSwipeMargin.current, {
        toValue: 0,
        duration: 350,
        useNativeDriver: false,
      }).start()
    }
  }, [])

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: () => {
        if (!containerRef.current) return false
        const containerDOM = findNodeHandle(containerRef.current)
        if (!containerDOM) return false
        return containerDOM.children[0].scrollTop === 0
      },
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderMove: (_, gestureState) => {
        if (enabledRef.current !== undefined && !enabledRef.current) return

        const adjustedDy =
          gestureState.dy <= 0
            ? 0
            : (gestureState.dy * 150) / (gestureState.dy + 120)
        pullDownSwipeMargin.current.setValue(adjustedDy)
        const newValue = adjustedDy > 45 ? 1 : 0
        if (newValue !== pullPosReachedState.current) {
          pullPosReachedState.current = newValue
          Animated.timing(pullPosReachedAnimated.current, {
            toValue: newValue,
            duration: 150,
            useNativeDriver: false,
          }).start()
        }
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: onPanResponderFinish,
      onPanResponderTerminate: onPanResponderFinish,
    }),
  )

  const refreshIndicatorColor = useMemo(
    () => tintColor || (colors && colors.length ? colors[0] : null),
    [colors, tintColor],
  )

  const containerStyle = useMemo(
    () => [
      style,
      {
        overflowY: 'hidden',
        overflow: 'hidden',
        paddingTop: progressViewOffset,
      },
    ],
    [progressViewOffset, style],
  )
  const indicatorTransformStyle = useMemo(
    () => ({
      alignSelf: 'center',
      marginTop: -40,
      height: 40,
      transform: [{ translateY: pullDownSwipeMargin.current }],
    }),
    [],
  )

  const AnimatedContentContainer = useMemo(
    () =>
      withAnimated((childProps) => (
        <children.props.children.type {...childProps} />
      )),
    [],
  )
  const newContentContainerStyle = useMemo(
    () => [
      children.props.children.props.style,
      { transform: [{ translateY: pullDownSwipeMargin.current }] },
    ],
    [children.props.children.props.style],
  )
  const newChildren = React.cloneElement(
    children,
    null,
    <>
      <Animated.View style={indicatorTransformStyle}>
        {refreshing && (
          <>
            <ActivityIndicator
              color={refreshIndicatorColor || undefined}
              size={size || undefined}
              style={{ marginVertical: 10 }}
            />
            {title && (
              <Text
                style={{ color: titleColor, textAlign: 'center', marginTop: 5 }}
              >
                {title}
              </Text>
            )}
          </>
        )}
      </Animated.View>
      <AnimatedContentContainer
        {...children.props.children.props}
        style={newContentContainerStyle}
      />
    </>,
  )

  return (
    <View
      ref={containerRef}
      style={containerStyle}
      {...panResponder.current.panHandlers}
    >
      {newChildren}
    </View>
  )
}

function withAnimated(WrappedComponent) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component'

  class WithAnimated extends React.Component {
    static displayName = `WithAnimated(${displayName})`

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return Animated.createAnimatedComponent(WithAnimated)
}
