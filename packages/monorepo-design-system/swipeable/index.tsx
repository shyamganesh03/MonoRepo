import { View, TouchableOpacity } from "react-native";
import React, { useContext, useRef, useState } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Icon } from "@mono-repo/native-icons";
import EdvnzTheme from "@mono-repo/provider";
import { testProps } from "@mono-repo/utils";
import { Behavior, TypeofControl } from "@mono-repo/constants";

const CustomSwipe = (props) => {
  const {
    children,
    handleRightSecondary,
    handleRightPrimary,
    rightPrimaryIcon = "EditIcon",
    rightSecondaryIcon = "DeleteIcon",
    disabled,
    translateX = 0,
    sectionName,
    id = "",
  } = props;
  const { theme } = useContext(EdvnzTheme);
  const [opacity, setOpacity] = useState(1);
  const swipeRef = useRef(null);

  const closeSwipeable = async () => {
    setOpacity(0);
    await swipeRef.current.close();
    setTimeout(() => {
      setOpacity(1);
    }, 700);
  };

  const rightSwipeActions = () => {
    return (
      <View
        style={{
          backgroundColor: theme.colors.primaryVariant3,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          opacity,
        }}
      >
        {handleRightPrimary && (
          <TouchableOpacity
            style={{ paddingHorizontal: 20 }}
            onPress={() => {
              handleRightPrimary();
              closeSwipeable();
            }}
            {...testProps(
              `SwipeCard_${TypeofControl.BUTTON}_${Behavior.PRIMARY_SUBMIT}_${id}`
            )}
          >
            <Icon
              name={rightPrimaryIcon}
              width={20}
              height={20}
              color={theme.colors.textPrimary}
            />
          </TouchableOpacity>
        )}
        {handleRightPrimary && handleRightSecondary && (
          <View
            style={{
              width: 1,
              height: 32,
              backgroundColor: theme.colors.textPrimary,
            }}
          />
        )}
        {handleRightSecondary && (
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              transform: [
                {
                  rotate: rightSecondaryIcon === "MoreIcon" ? "90deg" : "0deg",
                },
              ],
            }}
            onPress={() => {
              handleRightSecondary();
              closeSwipeable();
            }}
            {...testProps(
              `SwipeCard_${TypeofControl.BUTTON}_${Behavior.SECONDARY_SUBMIT}_${id}`
            )}
          >
            <Icon
              name={rightSecondaryIcon}
              width={16}
              height={20}
              color={theme.colors.textPrimary}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const swipeFromRightOpen = () => {};

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={rightSwipeActions}
      onSwipeableRightOpen={swipeFromRightOpen}
      containerStyle={{ transform: [{ translateX }] }}
      {...testProps(
        `Swipe_${TypeofControl.BUTTON_CARD}_${Behavior.SWIPE}_${sectionName}_${id}`
      )}
    >
      {children}
    </Swipeable>
  );
};

export default CustomSwipe;
