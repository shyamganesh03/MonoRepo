import { View, Image as ImageComponent, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import React from "react";

const Image = (props) => {
  const { aspectRatio, borderRadius, imageUrl, resizeMode, size, style } =
    props;
  return (
    <View
      style={StyleSheet.flatten([getAspectRatio({ size, aspectRatio }), style])}
    >
      <ImageComponent
        style={{ width: size, height: size, borderRadius }}
        source={{ uri: imageUrl }}
        resizeMode={resizeMode}
      />
    </View>
  );
};

const getAspectRatio = ({ size, aspectRatio }) => {
  const containStyle: any[] = [
    {
      width: size,
    },
  ];
  if (aspectRatio === "1:1") {
    containStyle.push({
      aspectRatio: 1,
    });
  }
  if (aspectRatio === "16:9") {
    containStyle.push({
      aspectRatio: 1.77,
    });
  }
  if (aspectRatio === "3:2") {
    containStyle.push({
      aspectRatio: 1.5,
    });
  }
  if (aspectRatio === "4:3") {
    containStyle.push({
      aspectRatio: 1.33,
    });
  }
  return containStyle;
};

Image.prototype = {
  aspectRatio: PropTypes.oneOf(["1:1", "16:9", "3:2", "4:3", "none"]),
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageUrl: PropTypes.string,
  resizeMode: PropTypes.oneOf([
    "cover",
    "contain",
    "stretch",
    "repeat",
    "center",
  ]),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Image.defaultProps = {
  aspectRatio: "none",
  borderRadius: 80,
  imageUrl: "",
  resizeMode: "cover",
  size: 40,
  style: {},
};

export default Image;
