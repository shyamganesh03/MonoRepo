import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  Platform,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { spacing } from "@mono-repo/theme";
import EdvnzTheme from "@mono-repo/provider";
import { Icon } from "@mono-repo/native-icons";
import { ScreenLayout, testProps } from "@mono-repo/utils";
import { BottomSheet } from "@mono-repo/bottom-sheet";
import { Behavior, TypeofControl } from "@mono-repo/constants";
import Text from "../Text/Text";

const Drawer = (props) => {
  const { theme } = useContext(EdvnzTheme);
  const {
    children,
    containerStyle,
    drawerColor = theme.colors.backgroundSurface1,
    hasBack,
    isUnlockDrawer = false,
    screenName,
    setShowDrawer = () => {},
    showBackground = false,
    showDrawer = false,
    showSwipeIcon = true,
    isEnable = true,
    auditProps,
  } = props;
  const [screenHeight, setScreenHeight] = useState("100%");
  const listenerShow = (e) => {
    setScreenHeight(
      Dimensions.get("screen").height -
        e.endCoordinates.height -
        (!(Platform.OS === "ios") && 60)
    );
  };
  const windowWidth = useWindowDimensions().width;
  const isDesktop = ScreenLayout?.isWeb(windowWidth);

  const listenerRemove = () => setScreenHeight("100%");

  useEffect(() => {
    const keyboardDidShow = Keyboard?.addListener(
      "keyboardDidShow",
      listenerShow
    );
    const keyboardDidHide = Keyboard?.addListener(
      "keyboardDidHide",
      listenerRemove
    );
    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, [showDrawer]);

  return (
    <Modal
      animation
      visible={showDrawer}
      transparent
      onRequestClose={() => setShowDrawer(false)}
      {...testProps(auditProps?.actionName)}
    >
      <View style={{ flexDirection: "row", height: "100%", width: "100%" }}>
        {isDesktop && <View style={{ maxWidth: 475, width: "100%" }} />}

        <View style={[styles.wrapper, { height: screenHeight, flex: 1 }]}>
          {showBackground}
          <TouchableOpacity
            onPress={() => setShowDrawer(false)}
            style={{ flex: 1 }}
          />

          <BottomSheet dismiss={setShowDrawer} isEnable={isEnable}>
            <View style={{ width: "100%", alignItems: "center" }}>
              <View
                style={[
                  styles.container,
                  {
                    maxWidth: 520,
                    width: "100%",
                    backgroundColor: drawerColor,
                  },
                  containerStyle,
                ]}
              >
                {showSwipeIcon && (
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: isUnlockDrawer
                          ? theme.colors.textPrimary
                          : theme.colors.dividerLong,
                        borderRadius: 50,
                        height: 4,
                        marginBottom: 20,
                        width: 32,
                      }}
                    />
                  </View>
                )}
                {hasBack && (
                  <TouchableOpacity
                    onPress={() => {
                      setShowDrawer(false);
                    }}
                    {...testProps(
                      `Drawer_${TypeofControl.BUTTON_ICON_NAVIGATION}_${Behavior.BACK}`
                    )}
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      marginBottom: spacing.spacing4,
                      paddingHorizontal: spacing.spacing5,
                    }}
                  >
                    <Icon
                      name='LeftIcon'
                      color={theme.colors.textPrimary}
                      width={20}
                      height={20}
                    />
                    <Text
                      variant='heading2'
                      color={theme.colors.textPrimary}
                      style={{
                        marginLeft: spacing.spacing5,
                      }}
                    >
                      {screenName}
                    </Text>
                  </TouchableOpacity>
                )}
                {children}
              </View>
            </View>
          </BottomSheet>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: Dimensions.get("window").height,
    width: "100%",
  },
  container: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    bottom: 0,
    paddingBottom: spacing.spacing9,
    paddingTop: spacing.spacing3,
    width: "100%",
  },
});

export default Drawer;
