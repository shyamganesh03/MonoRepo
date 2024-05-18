import React from "react";
//@ts-ignore
import type { PropsWithChildren } from "react";
import AppNavigator from "./navigation";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

//@ts-ignore
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default App;
