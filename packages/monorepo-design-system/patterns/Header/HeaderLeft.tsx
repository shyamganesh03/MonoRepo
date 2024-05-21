import React, { useContext } from "react";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { Icon } from "@mono-repo/native-icons";
import { View, TouchableOpacity, Platform, Dimensions } from "react-native";
import { Text } from "@mono-repo/components";
import { spacing } from "@mono-repo/theme";
import EdvnzTheme from "@mono-repo/provider";
import { ScreenLayout, testProps } from "@mono-repo/utils";
import { TypeofControl } from "@mono-repo/constants";

const HeaderLeft = (props) => {
  const { logoColor, arrowColor, testingProps } = props;
  const navigation = useNavigation();
  const isDesktop = ScreenLayout?.isWeb(Dimensions.get("window").width);
  const { theme } = useContext(EdvnzTheme);
  const index = useNavigationState((state) => state.index);

  const handleBackNavigation = () => {
    if (Platform.OS === "web") {
      window.history.go(-1);
    } else {
      index === 0 ? navigation.navigate("home") : navigation.goBack();
    }
  };

  if (props.hasBack) {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: spacing.spacing6,
          paddingHorizontal: spacing.spacing5,
        }}
        {...testProps(
          `Header_${TypeofControl.BUTTON_ICON_NAVIGATE}_${testingProps?.behavior}`
        )}
        onPress={() => handleBackNavigation()}
      >
        <Icon
          name='LeftIcon'
          color={arrowColor || theme.colors.textPrimary}
          width={18}
          height={20}
        />
        <Text
          variant='utility1'
          color={arrowColor || theme.colors.textPrimary}
          style={{ paddingLeft: spacing.spacing4 }}
        >
          {isDesktop && "BACK"}
        </Text>
      </TouchableOpacity>
    );
  }
  if (props.hasHeaderLogo) {
    return (
      <Icon
        name='EdvanzaLogo'
        color={logoColor || theme.colors.textPrimary}
        width={140}
      />
    );
  }
  return <View />;
};

export default HeaderLeft;
