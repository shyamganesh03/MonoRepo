import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import Splash4 from "assets/newImages/splashTutorial4.png";
import { spacing } from "@mono-repo/theme";
import EdvnzTheme from "@mono-repo/provider";
import { BlurWidget } from "@mono-repo/blurwidget";
import { Button, Popup, Text } from "@mono-repo/components";
import { Behavior, TypeofControl } from "@mono-repo/constants";

const LoginPopup = (props) => {
  const {
    visible,
    setVisible,
    heading,
    content,
    buttonText,
    onPress,
    secondaryButton,
    handleSecondaryButton = () => {},
    headingStyle,
  } = props;
  const { theme } = useContext(EdvnzTheme);
  return (
    <Popup
      icon={Splash4}
      visible={visible}
      hasClose={false}
      showBackground={
        <BlurWidget variant='blur80' onPress={() => setVisible(!visible)} />
      }
      imageStyle={styles.image}
    >
      <View
        style={{
          paddingHorizontal: spacing.spacing5,
        }}
      >
        <Text
          variant='heading1'
          color={theme.colors.textPrimary}
          style={headingStyle}
        >
          {heading}
        </Text>
        <Text
          style={styles.content}
          variant='body1'
          color={theme.colors.textPrimary}
        >
          {content}
        </Text>
        <Button
          style={{
            marginBottom: spacing.spacing6,
            marginTop: spacing.spacing9,
          }}
          textVariant='functional1'
          label={buttonText}
          testingProps={{
            screenName: "LoginPopup",
            typeofControl: TypeofControl.BUTTON_DRAWER,
            behavior: Behavior.PRIMARY_SUBMIT,
          }}
          onPress={() => {
            // setVisible(false)
            onPress();
          }}
        />
        {secondaryButton && (
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              handleSecondaryButton();
            }}
          >
            <Text style={styles.secondaryButton} variant='bodyCompact2'>
              {secondaryButton}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Popup>
  );
};

export default LoginPopup;

const styles = StyleSheet.create({
  secondaryButton: {
    marginBottom: spacing.spacing8,
    alignItems: "center",
    alignSelf: "center",
  },
  content: {
    marginTop: spacing.spacing2,
  },
  image: {
    width: 159,
    height: 159,
    marginHorizontal: spacing.spacing5,
    marginTop: -56,
    marginBottom: spacing.spacing4,
  },
});
