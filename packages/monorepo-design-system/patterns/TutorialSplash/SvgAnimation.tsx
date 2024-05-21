import React, { useContext } from "react";
import { View, Platform } from "react-native";
import { WebView } from "react-native-webview";
import EdvnzTheme from "@mono-repo/provider";

export const SvgAnimation = ({ animationUrl }) => {
  const { theme } = useContext(EdvnzTheme);
  const getHtml = () => {
    return `<style>body{background-color:${theme.colors.backgroundSurface1};}</style> 
    <img width="100%" height="100%" style="object-fit: contain"  src=${animationUrl} alt="Animation" />`;
  };
  return (
    <View style={{ height: "100%", alignItems: "center" }}>
      <WebView
        scalesPageToFit={Platform.OS === "android"}
        originWhitelist={["*"]}
        scrollEnabled={false}
        bounces={false}
        source={{
          html: getHtml(),
        }}
        style={{
          width: 400,
          height: 400,
          backgroundColor: theme.colors.backgroundSurface1,
        }}
      />
    </View>
  );
};
