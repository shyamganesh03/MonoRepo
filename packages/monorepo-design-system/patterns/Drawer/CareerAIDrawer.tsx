import { View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Drawer, Text } from "@mono-repo/components";
import { BlurWidget } from "@mono-repo/blurwidget";
import EdvnzTheme from "@mono-repo/provider";
import { Icon } from "@mono-repo/native-icons";

const CareerDrawer = (props) => {
  const {
    showDrawer,
    setShowDrawer,
    handleChangeRole,
    handleCompareRole,
    handleDreamRole,
    handleMarkCurrentRole,
    handleChangeCurrentRole,
  } = props;

  return (
    <Drawer
      showDrawer={showDrawer}
      setShowDrawer={setShowDrawer}
      showBackground={
        <BlurWidget
          variant='blur80'
          onPress={() => setShowDrawer(!showDrawer)}
        />
      }
    >
      <View style={{ marginTop: 40 }}>
        {handleCompareRole && (
          <Menu
            iconName='Compare'
            active
            title='Add to compare'
            onPress={() => {
              setShowDrawer(false);
              handleCompareRole();
            }}
          />
        )}

        {handleMarkCurrentRole && (
          <Menu
            iconName='CurrentRole'
            active
            title='Mark as Current Role'
            onPress={() => {
              setShowDrawer(false);
              handleMarkCurrentRole();
            }}
          />
        )}

        {handleDreamRole && (
          <Menu
            iconName='DreamRole'
            active
            title='Change Dream Role'
            onPress={() => {
              setShowDrawer(false);
              handleDreamRole();
            }}
          />
        )}

        {handleChangeRole && (
          <Menu
            iconName='DreamRole'
            title='Change Dream Role'
            active
            onPress={() => {
              setShowDrawer(false);
              handleChangeRole();
            }}
          />
        )}

        {handleChangeCurrentRole && (
          <Menu
            iconName='CurrentRole'
            active
            title='Change Current  Role'
            onPress={() => {
              setShowDrawer(false);
              handleChangeCurrentRole();
            }}
          />
        )}
      </View>
    </Drawer>
  );
};

const Menu = (props) => {
  const { onPress, active, title, iconName, disabled } = props;
  const { theme } = useContext(EdvnzTheme);
  return (
    <>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 34,
            paddingVertical: 16,
            alignItems: "center",
          }}
        >
          <Icon
            name={iconName}
            color={
              active ? theme.colors.textPrimary : theme.colors.textInactive
            }
            width={20}
            height={20}
          />
          <Text
            variant='body1'
            color={
              active !== true
                ? theme.colors.textInactive
                : theme.colors.textPrimary
            }
            style={{ marginLeft: 10 }}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: 1,
          backgroundColor: theme.colors.dividerLong,
        }}
      />
    </>
  );
};

export default CareerDrawer;
