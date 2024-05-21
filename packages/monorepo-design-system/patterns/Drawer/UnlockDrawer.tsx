import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Icon } from "@mono-repo/native-icons";
import EdvnzTheme from "@mono-repo/provider";
import { spacing } from "@mono-repo/theme";
import unlockImage from "assets/newImages/register-unlock.png";
import unlockBgImage from "assets/newImages/UnlockBgImage.png";
import { Text, Drawer } from "@mono-repo/components";
import { appUtil, testProps } from "@mono-repo/utils";
import { Behavior, TypeofControl } from "@mono-repo/constants";

const UnlockDrawer = (props) => {
  const {
    showDrawer,
    setShowDrawer = () => {},
    iconButtonBgColor,
    iconOnPress,
    showBackground = false,
    title,
    description,
    description2,
    showButton = false,
    showSecondaryButton = false,
    children,
    source = unlockImage,
    hasClose = true,
    userProfile,
    descriptionVariant,
    isSwipeEnable,
    showSwipeIcon,
    imageStyle,
  } = props;
  const { theme } = useContext(EdvnzTheme);
  return (
    <Drawer
      showDrawer={showDrawer}
      setShowDrawer={() => setShowDrawer(false)}
      showBackground={showBackground}
      containerStyle={{
        paddingTop: 0,
        paddingBottom: 0,
        paddingHorizontal: 0,
      }}
      isUnlockDrawer
      showSwipeIcon={false}
      isEnable={isSwipeEnable}
    >
      <Image source={unlockBgImage} style={styles.image} />
      <Image style={[styles.stretch, imageStyle]} source={source} />
      {children}
      <View style={styles.contentContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={styles.titleText}
            variant='heading1'
            color={theme.colors.textPrimary}
          >
            {title}
          </Text>
        </View>
        {userProfile && (
          <Text
            style={{
              flexDirection: "row",
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                color: theme.colors.primaryVariant1,
              }}
              variant='heading1'
            >
              {appUtil.capitalizeString(userProfile?.firstName)}
            </Text>
            <Text
              style={{
                color: theme.colors.primaryVariant1,
              }}
              variant='heading1'
            >
              {" "}
              {appUtil.capitalizeString(userProfile?.secondName)}
            </Text>
          </Text>
        )}
        {description && (
          <Text
            style={styles.descriptionText}
            variant={descriptionVariant || "body1"}
            color={theme.colors.textPrimary}
          >
            {description}
          </Text>
        )}
        {description2 && (
          <Text
            variant={descriptionVariant || "body1"}
            color={theme.colors.textPrimary}
          >
            {description2}
          </Text>
        )}
        {showButton}
        {showSecondaryButton}
      </View>
      {showSwipeIcon && (
        <View
          style={{
            width: "100%",
            position: "absolute",
            top: 8,
            left: 170,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.textPrimary,
              borderRadius: 50,
              height: 4,
              marginBottom: 20,
              width: 32,
            }}
          />
        </View>
      )}
      {hasClose && (
        <TouchableOpacity
          style={{
            position: "absolute",
            backgroundColor: `${iconButtonBgColor}`,
            width: 32,
            height: 32,
            right: 16,
            top: 16,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
          }}
          onPress={iconOnPress}
          {...testProps(
            `UnlockDrawer_${TypeofControl.BUTTON_ICON}_${Behavior.CLOSE}`
          )}
        >
          <Icon
            name='CloseIcon'
            color={theme.colors.primary}
            width={13.33}
            height={13.33}
          />
        </TouchableOpacity>
      )}
    </Drawer>
  );
};

const styles = StyleSheet.create({
  stretch: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    top: 60,
    bottom: 0,
    position: "absolute",
  },
  contentContainer: {
    flexDirection: "column",
    paddingTop: spacing.spacing8,
    paddingBottom: spacing.spacing7,
    paddingHorizontal: spacing.spacing5,
  },
  titleText: {
    paddingBottom: spacing.spacing3,
  },
  descriptionText: {
    paddingBottom: spacing.spacing6,
  },
  image: {
    justifyContent: "center",
    position: "relative",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: "100%",
    height: 360,
  },
});

export default UnlockDrawer;
