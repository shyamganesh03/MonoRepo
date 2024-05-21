## CircularProgress

A simple, customizable circular progress indicator for React Native.

## Installation

To install the BottomSheet component, run the following command:

```
$ npm install @mono-repo/circular-progress
# or
$ yarn add @mono-repo/circular-progress
```

## Features

- Display a customizable circular progress indicator
- Display a percentage or custom text in the center of the circle
- Optionally display an icon in the center of the circle
- Optionally display a main text in the center of the circle
- Customize the size, stroke width, and colors of the progress circle and background circle
- Customize the variant, color, and alignment of the text displayed in the center of the circle
- Use a default theme or customize the colors using the bgColor and pgColor props
- Use a progressPercent prop to specify the percentage of the progress circle to be displayed
- Use an innerStrokeWidth prop to display an inner circle within the progress circle

## Usage

```
import CircularProgress from 'circular-progress';

<CircularProgress
  size={200}
  strokeWidth={10}
  text="50%"
  progressPercent={50}
  authenticated
  iconName="check"
  mainText="Complete"
  textVariant="heading2"
  textColor="#000"
  iconColor="#000"
  bgColor="#ddd"
  pgColor="#00f"
/>

```

## Props

| Prop name          | Type      | Description                                                          |
| :----------------- | :-------- | :------------------------------------------------------------------- |
| `size`             | `number`  | The size of the progress circle.                                     |
| `strokeWidth`      | `number`  | The width of the progress circle's stroke.                           |
| `text`             | `string`  | The text to be displayed in the center of the progress circle.       |
| `innerStrokeWidth` | `number`  | The width of the inner stroke of the progress circle.                |
| `progressPercent`  | `number`  | The percentage of the progress circle to be displayed.               |
| `authenticated`    | `boolean` | Whether or not the progress is authenticated.                        |
| `iconName`         | `string`  | The name of the icon to be displayed in the center of the circle.    |
| `mainText`         | `string`  | The main text to be displayed in the center of the circle.           |
| `textVariant`      | `string`  | The variant of the text to be displayed in the center of the circle. |
| `textColor`        | `string`  | The color of the text to be displayed in the center of the circle.   |
| `iconColor`        | `string`  | The color of the icon to be displayed in the center of the circle.   |
| `bgColor`          | `string`  | The color of the background circle.                                  |
| `pgColor`          | `string`  | The color of the progress circle.                                    |
