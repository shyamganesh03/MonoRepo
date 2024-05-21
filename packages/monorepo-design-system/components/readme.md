# EDVNZ Components

Edvnz components for rendering cross-platform applications Design-system based Edvnz components cover all essential use cases.

## Installation

```
$ npm install @mono-repo/components
# or
$ yarn add @mono-repo/components
```

## Features

- Full [theme support](https://www.npmjs.com/package/@mono-repo/provider)
- Cross-platform adaptation

## Button

Button make basic actions more accessible and enable users to perform activities more effectively. Buttons utilize labels,size and in some cases, icons to describe the action that will take place when the user pocesses them.

### Props

| Prop name     | Type                       | Description                                                                      |
| :------------ | :------------------------- | :------------------------------------------------------------------------------- |
| `appearance`  | `filled` `outlined` `text` | Appearance of the component. Can be filled, outline or text. Defaults to filled. |
| `status`      | `active` `inactive`        | Status of the component. Can be active or inactive. Defaults to active.          |
| `iconLeft`    | `element`                  | Icon to appear on the left side of the button                                    |
| `iconRight`   | `element`                  | Icon to appear on the right side of the button                                   |
| `label`       | `string`                   | Label text to be displayed inside the button                                     |
| `onPress`     | `func`                     | Function for onPress                                                             |
| `size`        | `large` `medium` `small`   | Size of the button                                                               |
| `style`       | `object`                   | Style for the button                                                             |
| `textStyle`   | `object`                   | Style for the button                                                             |
| `textVariant` | `string`                   | textVariant for the text/label inside the button                                 |

### Example

```
import React from "react";
import { Button } from '@mono-repo/components`

const Example = () => {
  return (
    <Button label="Sign In" size="large" style={{ width: "200px" }} />
  )
}
```
