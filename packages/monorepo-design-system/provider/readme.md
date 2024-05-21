## EdvnzProvider

Edvnz Provider is a package of tools that allows developers to create a customised theme system in a few simple steps. You can use it to customize colors

## Installation

```
$ npm install @mono-repo/provider
# or
$ yarn add @mono-repo/provider
```

## Features

- Works in React and React Native

## Applying a Theme to whole Application

Edvnz exposes an EdvnzProvider component to allow custom themes. To support themes, you must wrap your root component in the provider.

```
import React, { useState, useEffect } from "react";
import EdvnzTheme from "@mono-repo/provider";
import { DarkTheme, LightTheme } from "@mono-repo/theme";

export const App = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const [theme, setTheme] = useState(DarkTheme);

    useEffect(() => {
        setTheme(isDarkTheme ? DarkTheme : LightTheme);
    }, [isDarkTheme]);

    const value = { theme };

    <EdvnzTheme.Provider value={value}>
        <HomeScreen />
    </EdvnzTheme.Provider>
}

```

By default, the EdvnzThemeProvider will apply the DarkTheme if no theme or value prop is passed to the provider.

## Accessing theme properties

Use the useContext() hook to get access to the theme's variables

```
import React, { useContext } from "react";
import EdvnzTheme from "@mono-repo/provider";

export const HomeScreen = () => {
   const { theme } = useContext(EdvnzTheme);

  return <View style={{ backgroundColor: theme.colors.primary }} />;
}
```
