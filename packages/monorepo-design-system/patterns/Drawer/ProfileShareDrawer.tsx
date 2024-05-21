import { View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Drawer, Text } from "@mono-repo/components";
import { BlurWidget } from "@mono-repo/blurwidget";
import EdvnzTheme from "@mono-repo/provider";
import { Icon } from "@mono-repo/native-icons";
import { Share } from "@mono-repo/share";

const ProfileShareDrawer = (props) => {
  const {
    showDrawer,
    setShowDrawer,
    shareData,
    handleFollow,
    handleCopy,
    handleFlag,
    handleBlock,
    handleUnFollow,
    handleRemoveConnection,
  } = props;
  const { theme } = useContext(EdvnzTheme);

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
        {shareData && (
          <>
            <Share
              onClick={() => {
                setShowDrawer(false);
              }}
              data={shareData}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 34,
                  paddingVertical: 16,
                  alignItems: "center",
                }}
              >
                <Icon
                  name='ShareIcon'
                  color={theme.colors.textPrimary}
                  width={20}
                  height={20}
                />
                <Text
                  variant='body1'
                  color={theme.colors.textPrimary}
                  style={{ marginLeft: 10 }}
                >
                  Share Profile
                </Text>
              </View>
            </Share>
            <View
              style={{
                height: 1,
                backgroundColor: theme.colors.dividerLong,
              }}
            />
          </>
        )}
        {handleFollow && (
          <Menu
            icon={
              <Icon
                name='ProfileIcon'
                color={theme.colors.textPrimary}
                width={20}
                height={20}
              />
            }
            title='Follow'
            active
            onPress={() => {
              handleFollow();
              setShowDrawer(false);
            }}
          />
        )}
        {handleUnFollow && (
          <Menu
            icon={
              <Icon
                name='ProfileIcon'
                color={theme.colors.textPrimary}
                width={20}
                height={20}
              />
            }
            title='Un Follow'
            active
            onPress={() => {
              handleUnFollow();
              setShowDrawer(false);
            }}
          />
        )}
        {handleRemoveConnection && (
          <Menu
            icon={
              <Icon
                name='ProfileIcon'
                color={theme.colors.textPrimary}
                width={20}
                height={20}
              />
            }
            title='Remove Connection'
            active
            onPress={() => {
              handleRemoveConnection();
              setShowDrawer(false);
            }}
          />
        )}
        {handleCopy && (
          <Menu
            icon={
              <Icon
                name='CopyIcon'
                color={theme.colors.textPrimary}
                width={20}
                height={20}
              />
            }
            title='Copy Link'
            active
            onPress={() => {
              handleCopy();
              setShowDrawer(false);
            }}
          />
        )}
        {handleFlag && (
          <Menu
            icon={
              <Icon
                name='Flag'
                color={theme.colors.textPrimary}
                width={20}
                height={20}
              />
            }
            active
            title='Report User'
            onPress={() => {
              handleFlag();
              setShowDrawer(false);
            }}
          />
        )}

        {handleBlock && (
          <Menu
            icon={
              <Icon
                name='BlockUserIcon'
                color={theme.colors.textPrimary}
                width={20}
                height={20}
              />
            }
            title='Block User'
            active
            onPress={() => {
              handleBlock();
              setShowDrawer(false);
            }}
          />
        )}
      </View>
    </Drawer>
  );
};

const Menu = (props) => {
  const { onPress, active, title, icon } = props;
  const { theme } = useContext(EdvnzTheme);
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 34,
            paddingVertical: 16,
            alignItems: "center",
          }}
        >
          {icon}
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

export default ProfileShareDrawer;
