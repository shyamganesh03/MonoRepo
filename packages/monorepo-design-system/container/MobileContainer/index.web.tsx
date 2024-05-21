import React from "react";
import { Dimensions, View } from "react-native";
import { spacing } from "@mono-repo/theme";
import KeyBoardView from "../KeyBoardView";

const MobileContainer = (props) => {
  const {
    style,
    children,
    hasPadding = true,
    hasKeyBoard = false,
    hasHeader = false,
    ...rest
  } = props;

  const windowInnerHeight = Dimensions.get("window").height;

  if (hasKeyBoard) {
    return (
      <View style={{ height: "100%" }}>
        <KeyBoardView>
          <View
            style={[
              hasPadding ? { paddingHorizontal: spacing.spacing5 } : "",
              {
                height: "100%",
                paddingBottom: hasHeader ? 60 : 0,
                minHeight: `var(--100vh, ${windowInnerHeight}px)`,
                maxHeight: `var(--100vh, ${windowInnerHeight}px)`,
              },
              style,
            ]}
            {...rest}
          >
            {children}
          </View>
        </KeyBoardView>
      </View>
    );
  }

  return (
    <View
      style={[
        hasPadding ? { paddingHorizontal: spacing.spacing5 } : "",
        {
          height: "100%",
          minHeight: `var(--100vh, ${windowInnerHeight}px)`,
          maxHeight: `var(--100vh, ${windowInnerHeight}px)`,
          paddingBottom: hasHeader ? 60 : 0,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

export default MobileContainer;
