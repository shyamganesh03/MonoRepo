import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@mono-repo/native-icons";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { spacing } from "@mono-repo/theme";
import EdvnzTheme from "@mono-repo/provider";
import { Button, TextInput } from "@mono-repo/components";
import { Audit, ScreenLayout, testProps } from "@mono-repo/utils";
import {
  EventEntityType,
  EventAction,
  TypeofControl,
  Behavior,
} from "@mono-repo/constants";

const HeaderRight = (props) => {
  const {
    hasMenu,
    hasSearchBar,
    postButton,
    handleMenu = () => {},
    iconColor,
    hasSearchIcon,
    Screen,
  } = props;
  const navigation = useNavigation();
  const { theme } = useContext(EdvnzTheme);
  const windowWidth = useWindowDimensions().width;
  const isDesktop = ScreenLayout?.isWeb(windowWidth);

  if (hasMenu) {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingRight: spacing.spacing4,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            Audit.logEvent({
              action: EventAction?.CLICK,
              entityType: EventEntityType.SEARCH,
            });
            navigation.navigate("global-search");
          }}
          {...testProps(
            `Header_${TypeofControl.BUTTON_ICON_NAVIGATE}_${Behavior.GLOBAL_SEARCH}`
          )}
        >
          <Icon
            name='SearchIcon'
            color={theme.colors.textPrimary}
            width={20}
            height={20}
            style={styles.iconView}
          />
        </TouchableOpacity>

        {!isDesktop && (
          <TouchableOpacity
            onPress={() => {
              Audit.logEvent({
                action: EventAction?.CLICK,
                entityType: "HamburgerMenu",
              });
              handleMenu();
            }}
            {...testProps(
              `Header_${TypeofControl.BUTTON_ICON_NAVIGATE}_${Behavior.MENU}`
            )}
          >
            <Icon
              name='MenuIcon'
              color={theme.colors.textPrimary}
              width={20}
              height={20}
              style={styles.iconMenu}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
  if (hasSearchBar) {
    return (
      <View
        style={{
          flex: 1,
          width: 326,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TextInput
          inputLabel=''
          placeholder='Search '
          auditProps={{ actionName: "Header_input_Search" }}
          iconLeft={
            <Icon
              name='SearchIcon'
              color={theme.colors.textPrimary}
              width={13.33}
              height={13.33}
            />
          }
        />
      </View>
    );
  }
  if (postButton) {
    return (
      <View
        style={{
          paddingRight: spacing.spacing3,
        }}
      >
        <Button size='small' label='post' textVariant='utilityCompact2' />
      </View>
    );
  }
  // if (hasIcon) {
  //   return (
  //     <View
  //       style={{
  //         paddingRight: spacing.spacing3,
  //         flexDirection: 'row',
  //       }}
  //     >
  //       <Text style={{ paddingRight: spacing.spacing2 }} color={textColor}>
  //         50
  //       </Text>
  //       <TouchableOpacity>
  //         <Icon
  //           name="XpIcon"
  //           color={iconColor || theme.colors.textPrimary}
  //           width={13.33}
  //           height={13.33}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //   )
  // }
  if (hasSearchIcon) {
    return (
      <View
        style={{
          paddingRight: spacing.spacing3,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            Audit.logEvent({
              action: EventAction.GLOBAL_SEARCH_CLICK,
              entityType: "Search",
              details: {
                Screen,
              },
            });
            navigation.navigate("global-search");
          }}
          {...testProps(
            `Header_${TypeofControl.BUTTON_ICON_NAVIGATE}_${Behavior.GLOBAL_SEARCH}`
          )}
        >
          <Icon
            name='SearchIcon'
            color={iconColor || theme.colors.textPrimary}
            width={20}
            height={20}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return <View />;
};

const styles = StyleSheet.create({
  iconView: {
    marginLeft: spacing.spacing5,
  },
  iconMenu: {
    marginLeft: spacing.spacing5,
    marginRight: spacing.spacing4,
  },
});

export default HeaderRight;
