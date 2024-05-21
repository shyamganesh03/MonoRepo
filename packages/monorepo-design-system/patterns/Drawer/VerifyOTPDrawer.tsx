import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useContext, useRef, useEffect, useState } from "react";
import { Drawer, Button, Row, Text } from "@mono-repo/components";
import { spacing } from "@mono-repo/theme";
import { MobileBackCom } from "@mono-repo/container";
import EdvnzTheme from "@mono-repo/provider";
import { Icon } from "@mono-repo/native-icons";
import { Behavior, TypeofControl } from "@mono-repo/constants";

const VerifyOTPDrawer = (props) => {
  const {
    showOTPDrawer,
    setShowOTPDrawer,
    mobileNumber,
    countryPrefix,
    pins,
    otpArray,
    hasOTPError,
    setHasOTPError,
    onOtpChange,
    getOtp = () => {},
    validateOtp,
    minutes = 0,
    setMinutes,
  } = props;
  const { theme } = useContext(EdvnzTheme);
  const references = useRef([]);
  const [seconds, setSeconds] = useState(59);
  references.current = pins?.map((_ref, index) => {
    return (references.current[index] = useRef());
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    references?.current[0]?.current?.focus();
  }, []);
  // Math.floor((counter % (1000 * 60 * 60)) / (1000 * 60))
  return (
    <Drawer
      showDrawer={showOTPDrawer}
      showBackground={<MobileBackCom />}
      containerStyle={{ height: "93%" }}
    >
      <ScrollView
        style={{ padding: spacing.spacing6 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <TouchableOpacity
          onPress={() => {
            setShowOTPDrawer(false);
            setHasOTPError(false);
          }}
          style={{ flexDirection: "row" }}
        >
          <Icon
            name='LeftIcon'
            color={theme.colors.textPrimary}
            width={20}
            height={20}
          />
          <Text
            style={{ paddingHorizontal: spacing.spacing5 }}
            variant='heading2'
            color={theme.colors.textPrimary}
          >
            Almost There!
          </Text>
        </TouchableOpacity>
        <Text
          variant='body1'
          color={theme.colors.textPrimary}
          style={{ marginTop: spacing.spacing4 }}
        >
          Please enter the OTP sent to - {`\n`}
          {countryPrefix}-{mobileNumber} 🤝
        </Text>
        <Row
          style={{
            flex: 1,
            marginVertical: spacing.spacing9,
            marginHorizontal: spacing.spacing6,
          }}
        >
          {pins?.map((v, index) => (
            <TextInput
              keyboardType='numeric'
              style={styles(theme).inputBox}
              key={`code${index + 1}`}
              name={`code${index + 1}`}
              placeholder='-'
              placeholderTextColor={theme.colors.textSecondary}
              maxLength={1}
              value={otpArray[index]}
              onChangeText={(val) => {
                onOtpChange(val, index);
                if (index < 3 && val !== "") {
                  references.current[index + 1].current?.focus();
                }
              }}
              onKeyPress={
                index > 0 &&
                (({ nativeEvent }) => {
                  if (
                    nativeEvent.key === "Backspace" &&
                    Platform.OS !== "web"
                  ) {
                    references.current[index - 1].current?.focus();
                  }
                })
              }
              onKeyUp={
                index > 0 &&
                (({ nativeEvent }) => {
                  if (
                    nativeEvent.key === "Backspace" &&
                    Platform.OS === "web"
                  ) {
                    references.current[index - 1].current?.focus();
                  }
                })
              }
              ref={references.current[index]}
            />
          ))}
        </Row>

        <View style={{ flex: 1 }} />

        {hasOTPError && otpArray?.length !== 0 && (
          <View style={[styles(theme).alertContainer]}>
            <Text variant='bodyCompact2' color={theme.colors.onAlertContainer}>
              {hasOTPError}
            </Text>
          </View>
        )}

        <View style={{ alignItems: "center", marginTop: 250 }}>
          {(seconds !== 0 || minutes !== 0) && (
            <Text color={theme.colors.textPrimary}>
              {seconds < 10
                ? `${minutes === 0 ? "00" : minutes}:0${seconds} Sec`
                : `${minutes === 0 ? "00" : minutes}:${seconds} Sec`}
            </Text>
          )}

          <View
            style={{
              flexDirection: "row",
              paddingVertical: spacing.spacing3,
            }}
          >
            <Text variant='body1' color={theme.colors.textPrimary}>
              Did not receive code ?
            </Text>
            <TouchableOpacity
              onPress={() => {
                getOtp(countryPrefix, mobileNumber);
                setHasOTPError(false);
                setSeconds(60);
              }}
              disabled={seconds !== 0 || minutes !== 0}
            >
              <Text
                color={
                  seconds !== 0 || minutes !== 0
                    ? theme.colors.textInactive
                    : theme.colors.primary
                }
                variant='body1'
              >
                {" "}
                Re-send
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            style={{
              width: "100%",
              marginBottom: spacing.spacing3,
              marginTop: spacing.spacing3,
            }}
            label='Verify'
            testingProps={{
              screenName: "VerifyOTPDrawer",
              typeofControl: TypeofControl.BUTTON_DRAWER,
              behavior: Behavior.SUBMIT,
            }}
            onPress={() => {
              validateOtp(otpArray.join(""));
            }}
          />
        </View>
      </ScrollView>
    </Drawer>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    alertContainer: {
      width: "100%",
      backgroundColor: theme.colors.alertContainer,
      borderRadius: 8,
      paddingHorizontal: spacing.spacing5,
      marginBottom: spacing.spacing7,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: spacing.spacing5,
    },
    inputBox: {
      color: theme.colors.textPrimary,
      borderColor: theme.colors.border,
      width: 51,
      height: 48,
      borderWidth: 1,
      borderRadius: 4,
      textAlign: "center",
    },
  });

export default VerifyOTPDrawer;
