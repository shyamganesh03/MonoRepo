import { TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Icon } from "@mono-repo/native-icons";
import PropTypes from "prop-types";
import EdvnzTheme from "@mono-repo/provider";
import { testProps } from "@mono-repo/utils";
import { Behavior, TypeofControl } from "@mono-repo/constants";

const CheckBox = (props) => {
  const { theme } = useContext(EdvnzTheme);
  const {
    activeState,
    setActiveState,
    size,
    style,
    iconColor,
    backgroundColor,
  } = props;

  return (
    <TouchableOpacity
      onPress={() => setActiveState(!activeState)}
      style={{
        alignItems: "center",
        backgroundColor: activeState
          ? backgroundColor || theme.colors.primaryVariant2
          : "transparent",
        borderColor: activeState
          ? iconColor || theme.colors.textLink
          : theme.colors.textPrimary,
        borderRadius: 100,
        borderWidth: 1,
        height: size,
        justifyContent: "center",
        width: size,
        ...style,
      }}
      {...testProps(`CheckBox_${TypeofControl.BUTTON}_${Behavior.SELECT}`)}
    >
      {activeState && (
        <Icon
          color={iconColor || theme.colors.primary}
          height={size / 1.8}
          name='SelectorTickIcon'
          width={size / 1.4}
        />
      )}
    </TouchableOpacity>
  );
};

CheckBox.propTypes = {
  activeState: PropTypes.bool,
  setActiveState: PropTypes.func,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

CheckBox.defaultProps = {
  activeState: false,
  setActiveState: () => {},
  size: 32,
  style: {},
};
export default CheckBox;
