import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import EdvnzTheme from "@mono-repo/provider";

const DesktopContainer = (props) => {
  const { children, maxWidth = 540, backgroundColor } = props;
  const { theme } = useContext(EdvnzTheme);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor || theme.colors?.backgroundSurface1,
        },
      ]}
    >
      <View style={styles.layout}>
        <View style={{ flex: 1, overflow: "scroll" }}>
          <View
            style={{
              position: "relative",
              alignItems: "center",
              paddingHorizontal: 24,
            }}
          >
            <View style={{ maxWidth, width: "100%" }}>{children}</View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100vh",
    maxHeight: "100vh",
    overflow: "scroll",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  layout: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
});

export default DesktopContainer;
