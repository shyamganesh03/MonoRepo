import { View, useWindowDimensions } from "react-native";
import React, { useContext } from "react";
import { spacing } from "@mono-repo/theme";
import EdvnzTheme from "@mono-repo/provider";
import { Icon } from "@mono-repo/native-icons";
import { Layout } from "@mono-repo/container";
import { ScreenLayout } from "@mono-repo/utils";
import { Text } from "@mono-repo/components";

const NotificationToast = ({ toast }) => {
  const { theme } = useContext(EdvnzTheme);
  const windowWidth = useWindowDimensions().width;
  const isDesktop = ScreenLayout?.isWeb(windowWidth);
  return (
    <View style={{ flexDirection: "row", width: "100%", height: "100%" }}>
      {isDesktop && <View style={{ maxWidth: 475, width: "100%" }} />}
      <View style={{ flex: 1 }}>
        <Layout>
          <View
            style={{
              padding: spacing.spacing5,
              backgroundColor: theme.colors.onNeutral,
              flexDirection: "row",
              borderRadius: 8,
              marginTop: 100,
              borderColor: theme.colors.primaryVariant2,
              borderWidth: 1,
            }}
          >
            <Icon
              name='CheckIcon'
              color={theme.colors.textPrimary}
              width={20}
              height={20}
            />
            <Text
              variant='body2'
              color={theme.colors.textPrimary}
              style={{
                marginLeft: spacing.spacing4,
                paddingRight: spacing.spacing3,
              }}
            >
              {toast.message}
            </Text>
          </View>
        </Layout>
      </View>
    </View>
  );
};

export default NotificationToast;
