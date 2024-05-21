import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useContext } from "react";
import { BlurWidget } from "@mono-repo/blurwidget";
import EdvnzTheme from "@mono-repo/provider";
import { colors, spacing } from "@mono-repo/theme";
import { Text, Row, Button, Drawer } from "@mono-repo/components";
import { Behavior, TypeofControl } from "@mono-repo/constants";

const AddRolesDrawer = (props) => {
  const {
    showDrawer,
    onClose = () => {},
    headerTitle,
    recommendedRoles = [],
    handleAdd,
    careerPath,
    greyOut = {
      CompareRole: false,
      ChangeDreamRole: false,
    },
    handleDreamRole = () => {},
    navigation,
    isFetchingNextStep,
    userData,
  } = props;
  const { theme } = useContext(EdvnzTheme);
  return (
    <Drawer
      showDrawer={showDrawer}
      setShowDrawer={() => onClose()}
      showBackground={<BlurWidget variant='blur80' onPress={() => onClose()} />}
      containerStyle={{ height: (Dimensions.get("screen").height / 100) * 87 }}
    >
      {isFetchingNextStep ? (
        <ActivityIndicator
          color={colors.primary}
          size='large'
          style={{ marginTop: 100 }}
        />
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={{
            paddingBottom: 32,
          }}
        >
          <Text variant='heading5' style={{ marginHorizontal: 16 }}>
            {greyOut?.CompareRole ? "Select your dream role" : headerTitle}
          </Text>
          {greyOut?.CompareRole && (
            <Text
              variant='bodyCompact2'
              style={{ marginHorizontal: 16, marginTop: 10 }}
            >
              {`Recommendations basis your last step addition mid “${careerPath?.[0]?.Role}".`}
            </Text>
          )}
          {!greyOut?.CompareRole && (
            <Text
              variant='bodyCompact2'
              style={{ marginHorizontal: 16, marginTop: 10 }}
            >
              AI generated recommendations based on your data inputs.
            </Text>
          )}
          {!recommendedRoles?.length > 0 && !greyOut?.CompareRole && (
            <Text
              variant='body1'
              style={{
                marginVertical: spacing.spacing3,
                marginHorizontal: spacing.spacing5,
              }}
            >
              No Career Steps found!
            </Text>
          )}
          {!greyOut?.CompareRole &&
            recommendedRoles?.map?.((item) => (
              <>
                <View
                  style={{
                    paddingHorizontal: 16,
                    paddingTop: spacing.spacing6,
                  }}
                >
                  <Text
                    variant='heading5'
                    style={{ marginVertical: spacing.spacing2 }}
                    numberOfLines={1}
                  >
                    {item?.Role}
                  </Text>

                  <Text variant='bodyCompact2' numberOfLines={1}>
                    {item?.Salary} p.a.
                  </Text>

                  <Row style={styles.paddingButton}>
                    <Button
                      textVariant='bodyCompact2'
                      label='Add to career map'
                      testingProps={{
                        screenName: "RoleDrawer",
                        typeofControl: TypeofControl.BUTTON_DRAWER,
                        behavior: Behavior.ADD,
                      }}
                      onPress={() => {
                        handleAdd(item?.Role_Id);
                        onClose();
                      }}
                      style={styles.paddingV}
                    />

                    <Button
                      appearance='text'
                      textVariant='bodyCompact2'
                      label='Add to compare'
                      testingProps={{
                        screenName: "RoleDrawer",
                        typeofControl: TypeofControl.BUTTON_NAVIGATE,
                        behavior: "add-compare-role",
                      }}
                      onPress={() => {
                        navigation.navigate("add-compare-role", {
                          roleId: item?.Role_Id,
                          // isFrom: 'add-compare-role',
                        });
                        // handleCompare(item?.Role_Id)
                        onClose();
                      }}
                      style={styles.paddingV}
                    />
                  </Row>
                </View>
                <View
                  style={{
                    backgroundColor: theme?.colors.dividerLong,
                    height: 1,
                  }}
                />
              </>
            ))}

          {greyOut?.CompareRole && (
            <>
              {greyOut?.CompareRole && (
                <Text
                  variant='heading4'
                  style={{ marginHorizontal: 16, paddingTop: spacing.spacing6 }}
                >
                  Recommended for you
                </Text>
              )}
              {recommendedRoles?.map?.((item, index) => (
                <RoleCard
                  item={item}
                  handleAddCompare={() => {
                    props.navigation.navigate("add-compare-role", {
                      roleId: item?.Role_Id,
                    });
                    onClose();
                  }}
                  handleAddRole={() => {
                    onClose();
                    handleDreamRole(item);
                  }}
                />
              ))}
              <View
                style={{
                  height: 5,
                  backgroundColor: theme.colors.dividerShort,
                  marginVertical: 50,
                }}
              />

              <Text variant='heading5' style={{ marginHorizontal: 16 }}>
                Roles in your career path
              </Text>
              {careerPath?.map((item) => (
                <RoleCard
                  item={item}
                  handleAddCompare={() => {
                    props.navigation.navigate("add-compare-role", {
                      roleId: item?.Role_Id,
                    });
                    onClose();
                  }}
                  handleAddRole={() => {
                    onClose();
                    handleDreamRole(item);
                  }}
                  userData={userData}
                />
              ))}
            </>
          )}
        </ScrollView>
      )}
    </Drawer>
  );
};

const RoleCard = (props) => {
  const {
    item,
    handleAddCompare = () => {},
    handleAddRole = () => {},
    userData,
  } = props;
  const { theme } = useContext(EdvnzTheme);

  if (userData?.currentRoleId === item?.Role_Id) return null;

  return (
    <>
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: spacing.spacing6,
        }}
      >
        <Text
          variant='heading4'
          style={{ marginVertical: spacing.spacing2 }}
          numberOfLines={1}
        >
          {item?.Role}
        </Text>

        <Text variant='bodyCompact2' numberOfLines={1}>
          {item?.Salary} p.a.
        </Text>

        <Row style={styles.paddingButton}>
          <Button
            textVariant='bodyCompact2'
            label='Select as dream role'
            onPress={handleAddRole}
            testingProps={{
              screenName: "RoleCard",
              typeofControl: TypeofControl.BUTTON,
              behavior: Behavior.ADD,
            }}
            style={styles.paddingV}
          />

          <Button
            appearance='text'
            textVariant='bodyCompact2'
            label='Add to compare'
            onPress={handleAddCompare}
            style={styles.paddingV}
            testingProps={{
              screenName: "RoleCard",
              typeofControl: TypeofControl.BUTTON_NAVIGATE,
              behavior: "add-compare-role",
            }}
          />
        </Row>
      </View>
      <View
        style={{
          backgroundColor: theme?.colors.dividerLong,
          height: 1,
        }}
      />
    </>
  );
};

export default AddRolesDrawer;

const styles = StyleSheet.create({
  paddingV: {
    paddingVertical: 9,
  },
  paddingButton: {
    paddingTop: spacing.spacing5,
    paddingBottom: spacing.spacing6,
    alignSelf: "flex-start",
  },
});
