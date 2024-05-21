import { Text as TextElement, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { typography } from '@libs/theme';
import { ThemeProvider } from '@libs/theme';
import React, { useContext } from 'react';

interface TextProps {
  children: any;
  color?: string;
  numberOfLines?: number;
  style?: any;
  textAlign?: string;
  variant?: string;
}

const Text = (props: TextProps) => {
  const { children, color = '', numberOfLines, style = {}, textAlign, variant = 'body1' } = props;
  const { theme } = useContext(ThemeProvider);

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
  'body1',
  'body2',
  'bodyBold1',
  'bodyBold2',
  'bodyCompact2',
  'bodyCompactBold2',
  'display1',
  'display2',
  'display3',
  'display4',
  'functional1',
  'heading1',
  'heading2',
  'heading3',
  'heading4',
  'heading5',
  'utility1',
  'utility2',
  'utilityBold2',
  'utilityCompact2',
];

Text.propTypes = {
  color: PropTypes.string,
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  variant: PropTypes.oneOf(variants),
};

Text.defaultProps = {
  color: '',
  textAlign: 'left',
  variant: 'bodyCompactBold2',
};

Text.variants = variants;

export default Text;
