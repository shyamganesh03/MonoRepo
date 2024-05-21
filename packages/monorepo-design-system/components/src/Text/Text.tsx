import { Text as TextElement, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { typography } from "@mono-repo/theme";
import EdvnzTheme from "@mono-repo/provider";
import React, { useContext } from "react";

const Text = (props) => {
  const {
    children,
    color = "",
    numberOfLines,
    style = {},
    textAlign,
    variant = "",
  } = props;
  const { theme } = useContext(EdvnzTheme);

  return (
    <TextElement
      style={StyleSheet.flatten([
        typography[variant],
        { textAlign, color: color || theme.colors.textPrimary },
        style,
      ])}
      numberOfLines={numberOfLines}
    >
      {children}
    </TextElement>
  );
};

const variants = [
  "body1",
  "body2",
  "bodyBold1",
  "bodyBold2",
  "bodyCompact2",
  "bodyCompactBold2",
  "display1",
  "display2",
  "display3",
  "display4",
  "functional1",
  "heading1",
  "heading2",
  "heading3",
  "heading4",
  "heading5",
  "utility1",
  "utility2",
  "utilityBold2",
  "utilityCompact2",
];

Text.propTypes = {
  color: PropTypes.string,
  textAlign: PropTypes.oneOf(["left", "center", "right"]),
  variant: PropTypes.oneOf(variants),
};

Text.defaultProps = {
  color: "",
  textAlign: "left",
  variant: "bodyCompactBold2",
};

Text.variants = variants;

export default Text;
