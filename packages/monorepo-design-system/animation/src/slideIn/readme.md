# useSlideIn

This hook allows you to easily add a slide-in animation to a component in your React Native application.

## Installation

To install this package, run the following command:

```
$ npm install @mono-repo/animation
# or
$ yarn add @mono-repo/animation
```

## Usage

To use the hook in your component, first import it:

```
import { useSlideInAnimation } from '@mono-repo/animation';
```

Then, use the hook in your component's JSX:

```
const translateX = useSlideInAnimation();
```

You can then apply the translateX value as a style to your component, like so:

```
<Animated.View style={{ transform: [{ translateX }] }}>
  {/* Your component's content here */}
</Animated.View>
```

Customization
You can customize the animation's duration by passing a duration prop to the hook:

```
const translateX = useSlideInAnimation(300);
```

The default duration is 150 milliseconds.

You can customize the input range and output range of the animation by passing inputRange and outputRange props to the hook:

```
const translateX = useSlideInAnimation(300, [0, 1], [-1, 0]);
```

The default input range is [-1, 0, 1] and the default output range is [0, 0, 1].

## Note

This hook uses the useIsFocused hook from React Navigation to determine if the component is currently focused on the screen. Make sure that your component is wrapped in a NavigationContainer from React Navigation in order for the hook to work properly.

Please make sure that you have installed the dependencies react-native-reanimated and react-native-gesture-handler for the hook to work properly.

## Conclusion

This hook makes it easy to add a slide-in animation to a component in your React Native application. You can customize the animation's duration, input range, and output range to achieve the desired effect.
