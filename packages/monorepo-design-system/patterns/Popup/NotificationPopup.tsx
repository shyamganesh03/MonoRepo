import React, { useContext } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Icon } from "@mono-repo/native-icons";
import { spacing } from "@mono-repo/theme";
import { ScreenLayout } from "@mono-repo/utils";
import EdvnzTheme from "@mono-repo/provider";
import { Text, CheckBox } from "@mono-repo/components";

const NotificationPopup = (props) => {
  const {
    icon = true,
    visible,
    setVisible,
    imageStyle,
    showBackground,
    hasClose = true,
    text,
    text1,
    text2,
    style,
    variant,
    textAlign,
    color,
    activeState,
    children,
    setActiveState = () => {},
    hasIcon = false,
    onPress = () => {},
  } = props;
  const isDesktop = ScreenLayout?.isWeb(Dimensions.get("window").width);
  const { theme } = useContext(EdvnzTheme);
  return (
    <Modal visible={visible} transparent>
      <View style={styles.containerMain}>
        {showBackground}
        <View
          style={{
            backgroundColor: theme.colors.backgroundSurface1,
            width: isDesktop ? "50%" : "100%",
            borderRadius: 16,
            marginTop: spacing.spacing13,
          }}
        >
          {hasClose && (
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 20,
                right: 20,
              }}
              onPress={() => setVisible(false)}
            >
              <Icon
                name='CloseIcon'
                color={theme.colors.textPrimary}
                width={13.33}
                height={13.33}
              />
            </TouchableOpacity>
          )}
          {icon && (
            <Image
              source={icon}
              style={StyleSheet.flatten([
                {
                  width: 144,
                  height: 114,
                  marginTop: -40,
                },
                imageStyle,
              ])}
              resizeMode='contain'
            />
          )}
          {children}
        </View>
        <View
          style={[
            {
              backgroundColor: "#2E2B36",
            },
            styles.cardContain,
          ]}
        >
          {text && (
            <View
              style={{
                paddingHorizontal: spacing.spacing3,
                flexDirection: "row",
              }}
            >
              {hasIcon && (
                <CheckBox
                  size={20}
                  activeState={activeState}
                  setActiveState={setActiveState}
                  iconColor={theme.colors.textPrimary}
                  backgroundColor='rgba(183, 165, 250, 0.3)'
                />
              )}

              <Text
                variant={variant}
                style={StyleSheet.flatten([{ textAlign, color }, style])}
              >
                {text}
              </Text>
            </View>
          )}

          {(text1 || text2) && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon
                name='ExclamationErrorIcon'
                color={theme.colors.textPrimary}
                width={13}
                height={13}
              />
              <Text
                variant='utility2'
                style={{ paddingLeft: spacing.spacing3 }}
              >
                {text1}
              </Text>

              <TouchableOpacity onPress={onPress}>
                <Text
                  variant='utility2'
                  style={{
                    textDecorationLine: "underline",
                    textDecorationStyle: "solid",
                    textDecorationColor: "#fff",
                  }}
                >
                  {text2}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: spacing.spacing5,
    paddingRight: spacing.spacing5,
  },

  cardContain: {
    paddingHorizontal: spacing.spacing5,
    paddingVertical: spacing.spacing5,
    borderRadius: 8,
    marginTop: spacing.spacing12,
    justifyContent: "flex-end",
  },
});

export default NotificationPopup;
