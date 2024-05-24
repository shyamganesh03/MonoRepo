import React from 'react'
import { DarkTheme } from './DarkTheme'

export const ThemeProvider: any = React.createContext({
  theme: DarkTheme,
  setTheme: () => {},
})
