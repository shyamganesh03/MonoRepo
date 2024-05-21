import { View, Text, useWindowDimensions, Animated } from "react-native";
import React, { useContext } from "react";
import { spacing } from "@mono-repo/theme";
import EdvnzTheme from "@mono-repo/provider";
import { Icon } from "@mono-repo/native-icons";
import { Layout } from "@mono-repo/container";
import { ScreenLayout } from "@mono-repo/utils";
import { useFadeInAnimation } from "@mono-repo/animation";

const SuccessToast = ({ toast }) => {
  const { theme } = useContext(EdvnzTheme);
  const windowWidth = useWindowDimensions().width;
  const isDesktop = ScreenLayout?.isWeb(windowWidth);
  const fadeIn = useFadeInAnimation();
  return (
    <Animated.View
      style={{
        flexDirection: "row",
        width: "100%",
        height: "100%",
        opacity: fadeIn,
      }}
    >
      {isDesktop && <View style={{ maxWidth: 475, width: "100%" }} />}
      <View style={{ flex: 1 }}>
        <Layout>
          <View
            style={{
              padding: spacing.spacing5,
              backgroundColor: theme.colors.backgroundSurface,
              flexDirection: "row",
              borderRadius: 8,
              marginTop: 100,
            }}
          >
            <Icon
              name='CheckIcon'
              color={theme.colors.primary}
              width={20}
              height={20}
            />
            <Text
              variant='body2'
              color={theme.colors.backgroundSurface3}
              style={{ marginLeft: spacing.spacing4 }}
            >
              {toast.message}
            </Text>
          </View>
        </Layout>
      </View>
    </Animated.View>
  );
};

export default SuccessToast;
