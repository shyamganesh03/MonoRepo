import React from "react";
import { DarkTheme } from "@mono-repo/theme";

const EdvnzTheme = React.createContext({
  theme: DarkTheme,
  setTheme: () => {},
});
export default EdvnzTheme;
