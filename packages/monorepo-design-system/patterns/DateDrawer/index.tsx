import React, { useEffect, useState, useContext } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { spacing } from "@mono-repo/theme";
import { Icon } from "@mono-repo/native-icons";
import { Text, Drawer, Button, Row } from "@mono-repo/components";
import EdvnzTheme from "@mono-repo/provider";
import { Behavior, TypeofControl } from "@mono-repo/constants";
import { testProps } from "@mono-repo/utils";
import { constantMonths } from "./utils";
import DatePicker from "./DatePicker";

const DateDrawer = (props) => {
  const {
    showDrawer,
    setShowDrawer,
    showBackground = false,
    drawerHeader,
    date,
    setDate,
    placeholder,
    iconLeft,
    disabled,
    format = "",
    label,
    testingProps,
  } = props;
  const { theme } = useContext(EdvnzTheme);
  const [tempData, setTempData] = useState(new Date(date));
  const [finalData, setFinalDate] = useState("");

  useEffect(() => {
    if (date) {
      setTempData(date);
      const tmpDate = new Date(date);
      const monthsZero =
        tmpDate.getMonth() < 9
          ? `0${tmpDate.getMonth() + 1}`
          : tmpDate.getMonth() + 1;
      if (format === "mm-yyyy") {
        const date1 = `${monthsZero}/${tmpDate.getFullYear()}`;
        setFinalDate(date1);
      } else {
        const date1 = `${tmpDate.getDate()} ${
          constantMonths[tmpDate.getMonth()]
        } ${tmpDate.getFullYear()}`;
        setFinalDate(date1);
      }
    } else {
      const tmpDate = new Date(2010, 0, 1);
      setTempData(tmpDate);
      setFinalDate("");
    }
  }, [date]);

  const cleanClose = () => {
    setShowDrawer(false);
  };

  return (
    <>
      <Text
        color={theme.colors.textPrimary}
        variant='body1'
        style={{ marginBottom: spacing.spacing4, opacity: disabled ? 0.5 : 1 }}
      >
        {label}
      </Text>
      <SelectedMenu
        value={finalData}
        onPress={() => {
          setShowDrawer(true);
        }}
        placeholder={placeholder}
        disabled={disabled}
        iconLeft={iconLeft}
        testingProps={testingProps}
      />
      <Drawer
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        showBackground={showBackground}
        containerStyle={[
          {
            paddingTop: spacing.spacing7,
            paddingBottom: spacing.spacing7,
            paddingHorizontal: spacing.spacing5,
          },
        ]}
      >
        <DrawerTop drawerTitle={drawerHeader} cleanClose={cleanClose} />
        <View
          style={{
            height: 1,
            backgroundColor: theme.colors.dividerLong,
            marginVertical: spacing.spacing5,
          }}
        />
        <DatePicker format={format} value={tempData} onChange={setTempData} />

        <Button
          style={{
            marginTop: spacing.spacing4,
          }}
          textVariant='functional1'
          label='Set'
          testingProps={{
            screenName: "DateDrawer",
            typeofControl: TypeofControl.BUTTON_DRAWER,
            behavior: Behavior.SUBMIT,
          }}
          onPress={() => {
            setShowDrawer(false);
            setDate(tempData);
          }}
        />
      </Drawer>
    </>
  );
};

const SelectedMenu = ({
  onPress,
  value,
  placeholder,
  disabled,
  iconLeft,
  testingProps,
  iconRight = false,
}) => {
  const { theme } = useContext(EdvnzTheme);
  return (
    <TouchableOpacity
      style={[
        styles.inputContain,
        { opacity: disabled ? 0.5 : 1, borderColor: theme.colors.textPrimary },
      ]}
      onPress={onPress}
      disabled={disabled}
      {...testProps(
        `${testingProps?.screenName}_${TypeofControl.BUTTON_CARD}_${testingProps?.behavior}`
      )}
    >
      <Row>
        {iconLeft && (
          <View style={{ marginRight: spacing.spacing5 }}>{iconLeft}</View>
        )}
        <Text color={theme.colors.textHints} variant='body1'>
          {value || placeholder}
        </Text>
      </Row>
      {iconRight && (
        <View style={{ marginLeft: spacing.spacing5 }}>{iconRight}</View>
      )}
    </TouchableOpacity>
  );
};

const DrawerTop = ({ drawerTitle, cleanClose }) => {
  const { theme } = useContext(EdvnzTheme);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing.spacing6,
      }}
    >
      <TouchableOpacity onPress={() => cleanClose()}>
        <Icon
          name='LeftIcon'
          color={theme.colors.textPrimary}
          width={20}
          height={20}
        />
      </TouchableOpacity>
      <Text
        variant='heading2'
        color={theme.colors.textPrimary}
        style={{
          marginLeft: spacing.spacing5,
        }}
      >
        {drawerTitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.spacing5,
    borderWidth: 1,
    height: 48,
    borderRadius: 4,
    marginBottom: spacing.spacing6,
  },
});

export default DateDrawer;
