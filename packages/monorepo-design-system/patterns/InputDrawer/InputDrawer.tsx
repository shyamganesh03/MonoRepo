import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import { spacing } from "@mono-repo/theme";
import { Text, Drawer, Row, TextInput } from "@mono-repo/components";
import EdvnzTheme from "@mono-repo/provider";
import { Icon } from "@mono-repo/native-icons";
import { testProps } from "@mono-repo/utils";
import { Behavior, TypeofControl } from "@mono-repo/constants";

const InputDrawer = (props) => {
  const {
    showBackground = false,
    DrawerHeader,
    onChangeText,
    value,
    data,
    placeholder,
    iconLeft,
    iconRight,
    hasSearch,
    onSelect,
    field,
    isMandatory,
    disabled,
    drawerTitle,
    inputValue,
    onSubmitEditing = () => null,
    returnKeyType,
    testingProps,
    maxLength,
  } = props;
  const { theme } = useContext(EdvnzTheme);
  const [showDrawer, setShowDrawer] = useState(false);
  const screenHeight = useWindowDimensions().height;
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
        {DrawerHeader}
        {isMandatory && (
          <Text color={theme.colors.textPrimary} variant='body1'>
            *
          </Text>
        )}
      </Text>
      <SelectedMenu
        value={value}
        onPress={() => {
          setShowDrawer(true);
        }}
        placeholder={placeholder}
        disabled={disabled}
        iconLeft={iconLeft}
        iconRight={iconRight}
        theme={theme}
        field={field}
        testingProps={testingProps}
      />
      <Drawer
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        showBackground={showBackground}
        containerStyle={[
          {
            paddingTop: spacing.spacing7,
            paddingHorizontal: spacing.spacing5,
          },
          hasSearch && { height: (screenHeight / 100) * 90 },
        ]}
      >
        <DrawerTop
          drawerTitle={drawerTitle}
          cleanClose={cleanClose}
          testingProps={testingProps}
        />
        {hasSearch && (
          <TextInput
            placeholder={placeholder}
            iconLeft={
              <Icon
                name='SearchIcon'
                color={theme.colors.textPrimary}
                width={17}
                height={17}
              />
            }
            testingProps={testingProps}
            value={inputValue}
            onChangeText={onChangeText}
            maxLength={maxLength}
            returnKeyType={returnKeyType}
            onSubmitEditing={({ nativeEvent: { text } }) => {
              onSubmitEditing(text);
              setShowDrawer(false);
            }}
          />
        )}
        <DrawerContent
          key={field ? value?.[field] : value}
          data={data}
          cleanClose={cleanClose}
          onSelect={onSelect}
          hasSearch={hasSearch}
          field={field}
          inputValue={inputValue}
          testingProps={testingProps}
          valueSelected={field ? value?.[field] : value}
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
  iconRight,
  theme,
  field,
  testingProps,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.input,
        { opacity: disabled ? 0.5 : 1 },
        { borderColor: theme.colors.textPrimary },
      ]}
      onPress={onPress}
      disabled={disabled}
      {...testProps(
        `${testingProps?.screenName}_${TypeofControl.INPUT_DRAWER}_${testingProps?.behavior}`
      )}
    >
      {iconLeft && (
        <View style={{ marginRight: spacing.spacing5 }}>{iconLeft}</View>
      )}
      <Row style={{ flex: 1 }}>
        {value ? (
          <Text
            color={theme.colors.textHints}
            variant='body1'
            numberOfLines={1}
          >
            {field ? value[field] : value}
          </Text>
        ) : (
          <Text color={theme.colors.textHints} variant='body1'>
            {placeholder}
          </Text>
        )}
      </Row>
      {iconRight && (
        <View style={{ marginLeft: spacing.spacing5 }}>{iconRight}</View>
      )}
    </TouchableOpacity>
  );
};

const DrawerTop = ({ drawerTitle, cleanClose, testingProps }) => {
  const { theme } = useContext(EdvnzTheme);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing.spacing6,
        paddingHorizontal: spacing.spacing5,
      }}
    >
      <TouchableOpacity
        onPress={() => cleanClose()}
        {...testProps(
          `${testingProps?.screenName}_${TypeofControl?.BUTTON_ICON}_${Behavior.CLOSE}`
        )}
      >
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

const DrawerContent = ({
  data,
  cleanClose,
  onSelect,
  hasSearch,
  field,
  valueSelected,
  inputValue,
  testingProps,
}) => {
  const { theme } = useContext(EdvnzTheme);

  const getSelectedBg = (value) => {
    if (field && valueSelected === value[field]) {
      return theme.colors.dividerLong;
    }
    if (valueSelected === value) {
      return theme.colors.dividerLong;
    }
    return "transparent";
  };
  const isFieldSame = (value) => {
    if (field && valueSelected === value[field]) {
      return true;
    }
    if (valueSelected === value) {
      return true;
    }
    return false;
  };

  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        if (nativeEvent.contentOffset.y > 0) {
          Keyboard.dismiss();
        }
      }}
      keyboardShouldPersistTaps='always'
    >
      {Object?.entries(data || {}).map(([key, value], index) => {
        return (
          <>
            <TouchableOpacity
              onPress={() => {
                cleanClose();
                onSelect(hasSearch ? value : { row: key });
              }}
              {...testProps(
                `${testingProps?.screenName}_${TypeofControl?.BUTTON_ICON}_${Behavior.SELECT}_${index}`
              )}
              style={{
                paddingVertical: spacing.spacing5,
                paddingHorizontal: spacing.spacing5,
                backgroundColor: getSelectedBg(value),
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {isFieldSame(value) && (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 100,
                      backgroundColor: theme.colors.secondary1,
                      marginRight: spacing.spacing2,
                    }}
                  />
                )}
                <Text
                  variant='body2'
                  style={{ color: theme.colors.textPrimary }}
                >
                  {field ? value[field] : value}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{ height: 1, backgroundColor: theme.colors.dividerLong }}
            />
          </>
        );
      })}
      {data?.length <= 0 && inputValue?.length > 0 && (
        <View>
          <View
            style={[
              {
                backgroundColor: theme.colors.dividerLong,
                height: 1,
              },
            ]}
          />
          <Text style={{ paddingTop: spacing.spacing8 }}>
            No results found...
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
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

export default InputDrawer;
