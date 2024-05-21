import React, { useContext } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Icon } from "@mono-repo/native-icons";
import { spacing } from "@mono-repo/theme";
import EdvnzTheme from "@mono-repo/provider";
import { ScreenLayout, testProps } from "@mono-repo/utils";
import { Behavior, TypeofControl } from "@mono-repo/constants";

const Popup = (props) => {
  const {
    children,
    hasClose = true,
    icon = true,
    imageStyle,
    setVisible,
    showBackground,
    visible,
    onPress,
  } = props;
  const { theme } = useContext(EdvnzTheme);
  const windowWidth = useWindowDimensions().width;
  const isDesktop = ScreenLayout?.isWeb(windowWidth);

  return (
    <Modal
      visible={visible}
      transparent
      onBackdropPress={() => setVisible(false)}
      {...props}
    >
      <View style={{ flexDirection: "row", height: "100%", width: "100%" }}>
        {isDesktop && <View style={{ maxWidth: 475, width: "100%" }} />}
        <View style={styles.containerMain}>
          {showBackground}
          <View
            style={{
              backgroundColor: theme.colors.backgroundSurface1,
              borderRadius: 16,
              maxWidth: 520,
              width: "100%",
            }}
          >
            {hasClose && (
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 20,
                  top: 20,
                  width: 24,
                  height: 24,
                }}
                {...testProps(
                  `PopUp_${TypeofControl.BUTTON_ICON}_${Behavior.CLOSE}`
                )}
                onPress={() => {
                  if (onPress) {
                    onPress();
                  } else {
                    setVisible(false);
                  }
                }}
              >
                <Icon
                  color={theme.colors.textPrimary}
                  height={13.33}
                  name='CloseIcon'
                  width={13.33}
                />
              </TouchableOpacity>
            )}
            {icon && (
              <Image
                source={icon}
                style={StyleSheet.flatten([
                  {
                    height: 114,
                    marginTop: -40,
                    width: 144,
                  },
                  imageStyle,
                ])}
                resizeMode='contain'
              />
            )}
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    paddingLeft: spacing.spacing5,
    paddingRight: spacing.spacing5,
    paddingVertical: spacing.spacing7,
  },
});

export default Popup;
