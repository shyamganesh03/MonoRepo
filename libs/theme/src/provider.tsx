import React from 'react';
import { DarkTheme } from './DarkTheme';

const ThemeProvider = React.createContext({
  theme: DarkTheme,
  setTheme: () => {},
});
export { ThemeProvider };
