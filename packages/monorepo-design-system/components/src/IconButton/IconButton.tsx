import { TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import EdvnzTheme from "@mono-repo/provider";
import { testProps } from "@mono-repo/utils";
import { TypeofControl } from "@mono-repo/constants";

const IconButton = (props) => {
  const { theme } = useContext(EdvnzTheme);
  const { bgColor, icon, onPress, size, style, testingProps } = props;
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={{
          alignItems: "center",
          backgroundColor: bgColor || theme.colors.onPrimary,
          borderRadius: 100,
          height: size,
          justifyContent: "center",
          width: size,
          ...style,
        }}
        {...testProps(
          `${testingProps?.screenName}_${TypeofControl.BUTTON_ICON}_${testingProps?.behavior}`
        )}
      >
        {icon}
      </TouchableOpacity>
    </>
  );
};
IconButton.propTypes = {
  bgColor: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  onPress: PropTypes.func,
  size: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

IconButton.defaultProps = {
  bgColor: "",
  icon: false,
  onPress: () => {},
  size: 32,
  style: {},
};

export default IconButton;
