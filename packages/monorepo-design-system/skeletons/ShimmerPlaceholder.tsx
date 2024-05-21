 
import React, { useContext } from "react";
import { Animated, StyleSheet, View } from "react-native";
import EdvnzTheme from "@mono-repo/provider";

const getOutputRange = (width, isReversed) =>
  isReversed ? [width, -width] : [-width, width];

const ShimmerPlaceholder = (props) => {
  const { delay, duration, isInteraction } = props;
  const beginShimmerPosition = new Animated.Value(-1);

  const animatedValue = Animated.loop(
    Animated.timing(beginShimmerPosition, {
      toValue: 2,
      delay,
      duration,
      useNativeDriver: false,
      isInteraction,
    })
  );
  return (
    <BasedShimmerPlaceholder
      {...props}
      animatedValue={animatedValue}
      beginShimmerPosition={beginShimmerPosition}
    />
  );
};

ShimmerPlaceholder.defaultProps = {
  delay: 0,
  duration: 1500,
  isInteraction: true,
};

const BasedShimmerPlaceholder = (props) => {
  const { theme } = useContext(EdvnzTheme);
  const {
    width = 277,
    height = 15,
    shimmerColors = [
      theme.colors.backgroundSurface1,
      theme.colors.backgroundSurface2,
    ],
    isReversed = false,
    stopAutoRun = false,
    visible,
    location = [0.3, 0.5, 0.7],
    style,
    contentStyle,
    shimmerStyle,
    LinearGradient = View,
    children,
    animatedValue,
    beginShimmerPosition,
    shimmerWidthPercent = 1,
    containerProps,
    shimmerContainerProps,
    childrenContainerProps,
  } = props;

  const linearTranslate = beginShimmerPosition.interpolate({
    inputRange: [-1, 1],
    outputRange: getOutputRange(width, isReversed),
  });

  React.useEffect(() => {
    if (!stopAutoRun) {
      animatedValue.start();
    }
    return () => {
      animatedValue.stop();
    };
  }, [stopAutoRun]);

  React.useEffect(() => {
    if (visible) {
      animatedValue.stop();
    }
    if (!visible && !stopAutoRun) {
      animatedValue.start();
    }
  }, [visible, stopAutoRun]);

  return (
    <View
      style={[
        !visible && { height, width },
        styles.container,
        !visible && shimmerStyle,
        style,
      ]}
      {...containerProps}
    >
      {/* Force render children to restrict rendering twice */}
      <View
        style={[
          !visible && { width: 0, height: 0, opacity: 0 },
          visible && contentStyle,
        ]}
        {...childrenContainerProps}
      >
        {children}
      </View>
      {!visible && (
        <View
          style={{ flex: 1, backgroundColor: shimmerColors[0] }}
          {...shimmerContainerProps}
        >
          <Animated.View
            style={{ flex: 1, transform: [{ translateX: linearTranslate }] }}
          >
            <LinearGradient
              colors={shimmerColors}
              style={{ flex: 1, width: width * shimmerWidthPercent }}
              start={{
                x: -1,
                y: 0.5,
              }}
              end={{
                x: 2,
                y: 0.5,
              }}
              locations={location}
            />
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
});

/**
 * To create ShimmerPlaceholder by Linear Gradient. Only useful when you use 3rd party,
 * For example: react-native-linear-gradient
 * @param {Linear Gradient Component} LinearGradient - 'expo-linear-gradient' by default
 *
 * @example
 *
 * import LinearGradient from 'react-native-linear-gradient';
 * import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
 *
 * const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
 *
 * ...
 *
 * <ShimmerPlaceHolder />
 */
export const createShimmerPlaceholder = (LinearGradient = View) =>
  React.forwardRef((props, ref) => (
    <ShimmerPlaceholder LinearGradient={LinearGradient} ref={ref} {...props} />
  ));

export default ShimmerPlaceholder;
