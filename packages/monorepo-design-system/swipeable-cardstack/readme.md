## swipeable-cardstack

A swipeable card stack component for React Native that allows you to easily swipe card.

## Installation

```
$ npm install @mono-repo/swipeable-cardstack
# or
$ yarn add @mono-repo/swipeable-cardstack
```

## Props

| Prop name              | Type       | Description                                                                                                                                                                                                      |
| :--------------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                 | `array`    | An array of data that will be used to render each view in the stack.                                                                                                                                             |
| `renderItem`           | `function` | A callback function that takes an object as its argument and returns a component that will be rendered in each view of the stack. The object will contain the following properties: item, index, and separators. |
| `initialSelectedIndex` | `number`   | The initial index of the selected view in the stack.                                                                                                                                                             |
| `stackSpacing`         | `number`   | The spacing between each view in the stack.                                                                                                                                                                      |

## Usage

Here is a basic example of how you can use the

SwipeableCardStack component in your React Native app:

```
import React from 'react'
import { View } from 'react-native'
import SwipeableViewStack from 'react-native-swipeable-view-stack'

const data = [
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
  { id: 4, text: 'Item 4' },
]

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <SwipeableViewStack
        data={data}
        renderItem={({ item }) => {
          return <View style={{ padding: 20 }}>{item.text}</View>
        }}
      />
    </View>
  )
}

export default App
```
