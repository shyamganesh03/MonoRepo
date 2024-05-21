import React, { useRef } from "react";
import * as Sentry from "@sentry/react-native";
import AppNavigator from "./navigation";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { appTheme } from "@lib/utils";
import {
  LightTheme as LightThemeColors,
  DarkTheme as DarkThemeColors,
  spacing,
} from "../../monorepo-design-system/theme";
import { navigationRef } from "./navigation/RootNavigator";
import { Amplify } from "aws-amplify";
import { Provider as JotaiProvider, useAtom } from "jotai";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { Platform, View, useWindowDimensions } from "react-native";
import awsConfig from "../awsConfig";
import { sentryUrl } from "./config";

Sentry.init({
  dsn: sentryUrl,
  tracesSampleRate: 1.0,
});

const customLightTheme = {
  ...DefaultTheme.colors,
  ...LightThemeColors,
  colors: {
    ...DefaultTheme.colors,
    ...LightThemeColors,
  },
  spacing,
};

const customDarkTheme = {
  ...DarkTheme.colors,
  ...DarkThemeColors,
  colors: {
    ...DarkTheme.colors,
    ...DarkThemeColors,
  },
  spacing,
};

const getThemeColor = (themeState: string) => {
  if (themeState === "dark") {
    return customDarkTheme;
  }
  return customLightTheme;
};

const App = () => {
  Amplify.configure(awsConfig);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <JotaiProvider>
        <AppSubWrapper />
      </JotaiProvider>
    </SafeAreaProvider>
  );
};

const AppSubWrapper = () => {
  const routeNameRef = useRef();
  const height = useWindowDimensions().height;
  const [themeState] = useAtom(appTheme);
  const theme = getThemeColor(themeState);
  return (
    <View style={{ minHeight: height }}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() =>
          (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
        }
        // @ts-ignore
        theme={theme}
        onStateChange={async () => {
          const currentRouteName = navigationRef.current.getCurrentRoute().name;
          routeNameRef.current = currentRouteName;
        }}
        // @ts-ignore
        linking={{ enabled: true }}
      >
        <AppNavigator />
      </NavigationContainer>
    </View>
  );
};

Sentry.setTag("Platform:", Platform.OS);

export default Sentry.withProfiler(App);
