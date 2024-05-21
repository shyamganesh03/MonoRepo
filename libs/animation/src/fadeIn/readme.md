# useFadeIn

This hook allows you to easily add a fadeIn animation to a component in your React Native application.

## Installation

To install this package, run the following command:

```
$ npm install @libs/animation
# or
$ yarn add @libs/animation
```

## Usage

To use the hook in your component, first import it:

```
import { useFadeInAnimation } from '@libs/animation';
```

Then, use the hook in your component's JSX:

```
const fadeIn = useFadeInAnimation();
```

You can then apply the opacity value as a style to your component, like so:

```
<Animated.View style={{ opacity: fadeIn }}>
  {/* Your component's content here */}
</Animated.View>
```

## Customization

You can customize the animation's duration by passing a duration prop to the hook:

```
const fadeIn = useFadeInAnimation(500);
```

The default duration is 300 milliseconds.

## Note

This hook uses the useIsFocused hook from React Navigation to determine if the component is currently focused on the screen. Make sure that your component is wrapped in a NavigationContainer from React Navigation in order for the hook to work properly.

## Conclusion

This hook makes it easy to add a fade-in animation to a component in your React Native application. You can customize the animation's duration to achieve the desired effect.
