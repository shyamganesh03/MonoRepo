import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import Splash5 from "assets/newImages/splashTutorial5.png";
import { spacing } from "@mono-repo/theme";
import EdvnzTheme from "@mono-repo/provider";
import { BlurWidget } from "@mono-repo/blurwidget";
import { Button, Popup, Text } from "@mono-repo/components";
import { Behavior, TypeofControl } from "@mono-repo/constants";

const CareerPopup = (props) => {
  const {
    visible,
    setVisible,
    heading,
    content,
    buttonText,
    onPress = () => {},
    secondaryButton,
    handleSecondaryButton = () => {},
    headingStyle,
    hasClose = true,
  } = props;
  const { theme } = useContext(EdvnzTheme);

  return (
    <Popup
      icon={Splash5}
      visible={visible}
      showBackground={<BlurWidget variant='blur80' disabled />}
      imageStyle={styles.image}
      setVisible={setVisible}
      hasClose={hasClose}
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
          testingProps={{
            screenName: "CareerPopup",
            typeofControl: TypeofControl.BUTTON_POPUP,
            behavior: Behavior.PRIMARY_SUBMIT,
          }}
          textVariant='functional1'
          label={buttonText}
          onPress={() => {
            setVisible(false);
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

export default CareerPopup;

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
