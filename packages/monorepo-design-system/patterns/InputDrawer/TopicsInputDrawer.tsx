import {
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import { spacing } from "@mono-repo/theme";
import { Text, Drawer, Row, Grid, TextInput } from "@mono-repo/components";
import EdvnzTheme from "@mono-repo/provider";
import { Icon } from "@mono-repo/native-icons";
import {
  Behavior,
  EventAction,
  EventEntityType,
  EventSection,
  TypeofControl,
} from "@mono-repo/constants";
import { TrendingTopicsCard } from "@mono-repo/card";
import { useNavigation } from "@react-navigation/native";
import { Audit, testProps } from "@mono-repo/utils";

const TopicsInputDrawer = (props) => {
  const navigation = useNavigation();
  const {
    showBackground = false,
    onChangeText,
    value,
    data,
    placeholder,
    iconLeft,
    iconRight,
    hasSearch,
    field,
    disabled,
    drawerTitle,
    inputValue,
    onSubmitEditing = () => null,
    returnKeyType,
    maxLength,
    recommendedData,
    renderSearchItem,
    testingProps,
    paddH = false,
  } = props;
  const { theme } = useContext(EdvnzTheme);
  const [showDrawer, setShowDrawer] = useState(false);
  const cleanClose = () => {
    onChangeText("");
    setShowDrawer(false);
  };
  const screenHeight = useWindowDimensions().height;

  return (
    <>
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
        paddH={paddH}
        testingProps={testingProps}
      />
      <Drawer
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        showBackground={showBackground}
        containerStyle={[
          {
            paddingTop: spacing.spacing3,
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
            onChangeText={onChangeText}
            maxLength={maxLength}
            returnKeyType={returnKeyType}
            onSubmitEditing={({ nativeEvent: { text } }) => {
              onSubmitEditing(text);
              setShowDrawer(false);
            }}
          />
        )}
        {inputValue.length > 0 ? (
          <>
            {data.length !== 0 ? (
              data?.map((item) => <>{renderSearchItem(item)}</>)
            ) : (
              <View style={{ alignItems: "center" }}>
                <View
                  style={[
                    {
                      backgroundColor: theme.colors.dividerLong,
                      height: 1,
                    },
                  ]}
                />
                <Text style={{ paddingTop: spacing.spacing8 }}>
                  No Result Found
                </Text>
              </View>
            )}
          </>
        ) : (
          <>
            <Text
              variant='bodyBold1'
              style={{
                textTransform: "uppercase",
                paddingTop: spacing.spacing5,
              }}
            >
              Recommended
            </Text>
            <Grid
              numColumns={2}
              data={recommendedData}
              renderItem={(item) => (
                <TouchableOpacity
                  onPress={() => {
                    Audit.logEvent({
                      action: EventAction.VIEW,
                      entityType: EventEntityType.TOPIC,
                      entityId: item?.id,
                      details: {
                        Screen: "Topic",
                        section: EventSection.TRENDING,
                      },
                    });
                    navigation.navigate("topics-forum", {
                      topicId: item?.id,
                    });
                    cleanClose();
                  }}
                  {...testProps(
                    `${testingProps?.screenName}_${TypeofControl.BUTTON_CARD_NAVIGATE}_${testingProps?.behavior}`
                  )}
                  style={{ marginBottom: spacing.spacing5 }}
                >
                  <TrendingTopicsCard item={item} />
                </TouchableOpacity>
              )}
              style={{ marginTop: spacing.spacing5 }}
            />
          </>
        )}
      </Drawer>
    </>
  );
};

const SelectedMenu = ({
  onPress,
  value,
  placeholder,
  testingProps,
  disabled,
  iconLeft,
  iconRight,
  theme,
  field,
  paddH,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.input,
        { opacity: disabled ? 0.5 : 1 },
        { borderColor: theme.colors.textPrimary },
        { marginHorizontal: paddH ? spacing.spacing5 : 0 },
      ]}
      onPress={onPress}
      disabled={disabled}
      {...testProps(
        `${testingProps?.screenName}_${TypeofControl.BUTTON_CARD_NAVIGATE}_${Behavior.SELECT}`
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
      <Text variant='heading2' color={theme.colors.textPrimary}>
        {drawerTitle}
      </Text>
    </View>
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

export default TopicsInputDrawer;
