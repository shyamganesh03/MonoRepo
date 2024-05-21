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
    handleMarkRole,
    handleCompareRole,
    handleRemove,
    handleRecreateMap,
    handleShiftToAi,
    disableMarkRole = false,
    handleCurrentRole,
    handleDreamRole,
    greyOut = {
      CompareRole: false,
      ChangeDreamRole: false,
    },
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
        {handleRemove && (
          <Menu
            active
            iconName='Remove'
            title='Remove Role'
            onPress={() => {
              setShowDrawer(false);
              handleRemove();
            }}
          />
        )}
        {handleCompareRole && (
          <Menu
            iconName='Compare'
            disabled={greyOut.CompareRole}
            active={!greyOut.CompareRole}
            title='Add to compare'
            onPress={() => {
              setShowDrawer(false);
              handleCompareRole();
            }}
          />
        )}

        {handleMarkRole && (
          <Menu
            iconName='CurrentRole'
            active={!disableMarkRole}
            disabled={disableMarkRole}
            title='Mark as Current Role'
            onPress={() => {
              setShowDrawer(false);
              handleMarkRole();
            }}
          />
        )}
        {handleDreamRole && (
          <Menu
            iconName='DreamRole'
            active={!disableMarkRole}
            disabled={disableMarkRole}
            title='Mark as Dream role'
            onPress={() => {
              setShowDrawer(false);
              handleDreamRole();
            }}
          />
        )}
        {handleChangeRole && (
          <Menu
            iconName='DreamRole'
            disabled={greyOut.ChangeDreamRole}
            active={!greyOut.ChangeDreamRole}
            title='Change Dream Role'
            onPress={() => {
              setShowDrawer(false);
              handleChangeRole();
            }}
          />
        )}

        {handleRecreateMap && (
          <Menu
            iconName='Compare'
            active
            title='Re create career map'
            onPress={() => {
              setShowDrawer(false);
              handleRecreateMap();
            }}
          />
        )}
        {handleShiftToAi && (
          <Menu
            iconName='Compare'
            active
            title='Shift to AI generated'
            onPress={() => {
              setShowDrawer(false);
              handleShiftToAi();
            }}
          />
        )}

        {handleCurrentRole && (
          <Menu
            iconName='CurrentRole'
            active={!disableMarkRole}
            disabled={disableMarkRole}
            title='Change Current Role'
            onPress={() => {
              setShowDrawer(false);
              handleCurrentRole();
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
