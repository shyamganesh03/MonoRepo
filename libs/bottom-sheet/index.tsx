import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, PanResponder, View } from 'react-native';

export const BottomSheet = (props: { dismiss: any; isEnable?: boolean; children: any }) => {
  const { dismiss, isEnable = true, children } = props;
  const screenHeight = Dimensions.get('screen').height;
  // Ref for Animated.Value
  const panY = useRef(new Animated.Value(screenHeight)).current;

  // Animation to reset position of the bottom sheet
  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  // Animation to close the bottom sheet
  const closeAnim = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 500,
    useNativeDriver: true,
  });

  // Interpolation to translate the view along the Y-axis
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  // Function to dismiss the bottom sheet
  const handleDismiss = () => closeAnim.start(() => dismiss());

  // Reset the position when component is mounted
  useEffect(() => {
    resetPositionAnim.start();
  }, [resetPositionAnim]);

  // PanResponder to handle swipe gesture
  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: Animated.event([null, { dy: panY }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gs) => {
        // If user swiped down with a velocity > 2 or moved the bottom sheet down more than 1/4 of the screen height
        if ((gs.dy > 0 && gs.vy > 2) || gs.moveY > screenHeight - screenHeight / 4) {
          return handleDismiss();
        }
        // Reset the position of the bottom sheet
        return resetPositionAnim.start();
      },
    })
  ).current;

  return isEnable ? (
    <Animated.View
      style={{
        transform: [{ translateY }],
      }}
      {...panResponders.panHandlers}
    >
      {children}
    </Animated.View>
  ) : (
    <View>{children}</View>
  );
};
