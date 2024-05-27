## BottomSheet

A bottom sheet component for React Native that allows the user to swipe down to dismiss it.

## Installation

To install the BottomSheet component, run the following command:

```
$ npm install @libs/bottom-sheet
# or
$ yarn add @libs/bottom-sheet
```

## Features

- Swipe down to dismiss: the user can swipe down on the bottom sheet to dismiss it.
- Animations: the bottom sheet has animations when it is shown or dismissed, using the Animated component from react-native.
- Responsive: the bottom sheet adjusts to the screen size and orientation of the device.
- Customizable: the bottom sheet can be customized with props such as the isEnable prop to enable or disable the swipe down gesture.
- Compatible with other components: the bottom sheet can contain any content and can be used in combination with other components.

## Usage

To use the `BottomSheet` component, you need to import it and wrap the content you want to display in the bottom sheet with it. You also need to provide a `dismiss` function to handle the dismissal of the bottom sheet.

```
import { BottomSheet } from '@libs/bottom-sheet';

const MyComponent = () => {
  const dismiss = () => {
    // Dismiss the bottom sheet
  };

  return (
    <Sheet dismiss={dismiss}>
      {/* Content of the bottom sheet */}
    </Sheet>
  );
};

```

## Props

| Prop name  | Type       | Description                                                                                                                                             |
| :--------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dismiss`  | `required` | a function that is called when the bottom sheet is dismissed.                                                                                           |
| `isEnable` | `optional` | a boolean that specifies whether the bottom sheet is enabled or not. If `false`, the bottom sheet will not be dismissible. The default value is `true`. |

## Example

Here is an example of how to use the BottomSheet component:

```
import React from 'react';
import { View, Button } from 'react-native';
import { BottomSheet } from 'bottom-sheet';

const MyComponent = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const dismiss = () => setIsVisible(false);

  return (
    <View>
      <Button
        title="Show  sheet"
        onPress={() => setIsVisible(true)}
      />
      <Sheet dismiss={dismiss} isEnable={isVisible}>
        <View>
          {/* Content of the bottom sheet */}
        </View>
      </Sheet>
    </View>
  );
};

```
