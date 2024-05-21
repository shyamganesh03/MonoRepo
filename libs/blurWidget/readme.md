## BlurWidget

A React Native component that applies a customizable blur effect to its content. Supports both native and web platforms, and allows users to specify the blur radius and background color.

## Installation

To install this package, run the following command:

```
$ npm install @libs/blurwidget
# or
$ yarn add @libs/blurwidget
```

## Features

- Customizable blur radius: allow users to specify the blur radius for the effect.
- Multiple blur variants: provide multiple blur variants to choose from, such as light, medium, and strong.
- Customizable background color: allow users to specify a custom background color for the component.
- Support for web: make the component work on the web as well as native platforms.
- Responsive design: make the component automatically adjust its size and layout based on the size of the screen or container.

## Props

| Prop name              | Type       | Description                                                       |
| :--------------------- | :--------- | :---------------------------------------------------------------- |
| `variant`              | `string`   | the variant of the blur effect. Can be either "blur80" or "blur8" |
| `onPress`              | `function` | a callback function that is called when the component is pressed. |
| `disabled`             | `boolean`  | a flag that indicates whether the component is disabled           |
| `backgroundColorStyle` | `string`   | the background color of the component.                            |

## Usage

```
import React from "react";
import BlurWidget from '@libs/blurwidget'

<BlurWidget variant="blur80" onPress={handlePress} />
```
