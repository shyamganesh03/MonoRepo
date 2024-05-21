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
import { Text, Drawer, Button, Tag, TextInput } from "@mono-repo/components";
import EdvnzTheme from "@mono-repo/provider";
import { Icon } from "@mono-repo/native-icons";
import { Behavior, TypeofControl } from "@mono-repo/constants";
// import Toast from 'react-native-toast-notifications'

const MultipleInputDrawer = (props) => {
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
    disabled,
    drawerTitle,
    onSubmitEditing = () => null,
    returnKeyType,
    maxlength,
    handleSave = () => {},
    handleSelectPress = () => {},
  } = props;
  const { theme } = useContext(EdvnzTheme);
  const [showDrawer, setShowDrawer] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const screenHeight = useWindowDimensions().height;
  const cleanClose = () => {
    setShowDrawer(false);
  };

  return (
    <>
      <Text
        color={theme.colors.textHints}
        variant='body2'
        style={{
          marginBottom: spacing.spacing4,
          opacity: disabled ? 0.5 : 1,
          textTransform: "uppercase",
        }}
      >
        {DrawerHeader}
      </Text>
      <SelectedMenu
        value={value}
        onPress={() => {
          setShowDrawer(true);
          handleSelectPress();
        }}
        placeholder={placeholder}
        disabled={disabled}
        iconLeft={iconLeft}
        iconRight={iconRight}
        theme={theme}
        field={field}
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
        <DrawerTop drawerTitle={drawerTitle} cleanClose={cleanClose} />
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
            value={inputValue}
            onChangeText={(text) => {
              setInputValue(text);
              onChangeText(text);
            }}
            maxlength={maxlength}
            returnKeyType={returnKeyType}
            onSubmitEditing={({ nativeEvent: { text } }) => {
              onSubmitEditing(text);
            }}
          />
        )}
        {inputValue?.length > 0 ? (
          <DrawerContent
            key={field ? value?.[field] : value}
            data={data}
            cleanClose={cleanClose}
            onSelect={onSelect}
            hasSearch={hasSearch}
            field={field}
            valueSelected={field ? value?.[field] : value}
            setInputValue={setInputValue}
            value={value}
          />
        ) : (
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row" }}>
              {value?.length > 0 && (
                <>
                  <Text
                    variant='bodyBold1'
                    style={{ paddingVertical: spacing.spacing5 }}
                  >
                    Recently Added
                  </Text>
                  <Tag
                    tagType='alertTag'
                    textVariant='body1'
                    label={value?.length}
                    bgColor={theme.colors.alertBorder}
                    style={{
                      borderRadius: 50,
                      marginLeft: spacing.spacing3,
                    }}
                    labelColor={theme.colors.backgroundSurface1}
                  />
                </>
              )}
            </View>
            {value && typeof value === "object" ? (
              <>
                {value?.map((v) => (
                  <TouchableOpacity
                    style={{
                      marginRight: spacing.spacing5,
                      marginBottom: spacing.spacing5,
                    }}
                    onPress={() => {
                      onSelect(v);
                    }}
                  >
                    <Tag
                      tagType='skillTag1'
                      label={v}
                      bgColor={theme.colors.primaryVariant3}
                      labelColor={theme.colors.textPrimary}
                      style={{ alignSelf: "baseline" }}
                      hasCloseButton
                    />
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <>
                {value && (
                  <TouchableOpacity
                    style={{
                      marginRight: spacing.spacing5,
                      marginBottom: spacing.spacing5,
                    }}
                    onPress={() => {
                      onSelect(value);
                    }}
                  >
                    <Tag
                      tagType='skillTag1'
                      label={value}
                      bgColor={theme.colors.primaryVariant3}
                      labelColor={theme.colors.textPrimary}
                      style={{ alignSelf: "baseline" }}
                      hasCloseButton
                    />
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        )}

        <Button
          label='Save'
          style={{ marginTop: 5 }}
          textVariant='functional1'
          testingProps={{
            screenName: "MultiInputDrawer",
            typeofControl: TypeofControl.BUTTON_DRAWER,
            behavior: Behavior.SAVE,
          }}
          onPress={() => {
            handleSave();
            cleanClose();
          }}
        />
      </Drawer>
    </>
  );
};

const SelectedMenu = ({
  onPress,
  placeholder,
  disabled,
  iconLeft,
  iconRight,
  theme,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.input,
        { opacity: disabled ? 0.5 : 1, borderColor: theme.colors.textPrimary },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {iconLeft && (
        <View style={{ marginRight: spacing.spacing5 }}>{iconLeft}</View>
      )}
      <View style={[styles.row, { flex: 1 }]}>
        <Text color={theme.colors.textHints} variant='body1'>
          {placeholder}
        </Text>
      </View>
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
        paddingHorizontal: spacing.spacing5,
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
  onSelect,
  field,
  valueSelected,
  setInputValue,
}) => {
  const { theme } = useContext(EdvnzTheme);
  const handleSelect = (v) => {
    if (!valueSelected?.includes(v)) {
      onSelect(v);
    } else {
      toast?.hideAll();
      toast?.show(`${v} is already added`, {
        type: "danger",
      });
    }
    setInputValue("");
  };
  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        if (nativeEvent.contentOffset.y > 0) {
          Keyboard.dismiss();
        }
      }}
    >
      {Object?.entries(data).map(([key, value]) => (
        <>
          <TouchableOpacity
            onPress={() => handleSelect(value)}
            style={{
              paddingVertical: spacing.spacing5,
              paddingHorizontal: spacing.spacing5,
              backgroundColor:
                valueSelected === value
                  ? theme.colors.backgroundSurface3
                  : "transparent",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {valueSelected === value && (
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
              <Text variant='body2'>{field ? value[field] : value}</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{ height: 1, backgroundColor: theme.colors.onNeutral }}
          />
        </>
      ))}
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default MultipleInputDrawer;
