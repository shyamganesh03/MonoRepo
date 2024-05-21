import { TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@libs/theme';

interface IconButtonProps {
  bgColor: string;
  icon: any;
  onPress: any;
  size: number;
  style: any;
}

const IconButton = (props: IconButtonProps) => {
  const { theme } = useContext(ThemeProvider);
  const { bgColor, icon, onPress, size, style } = props;
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={{
          alignItems: 'center',
          backgroundColor: bgColor || theme.colors.onPrimary,
          borderRadius: 100,
          height: size,
          justifyContent: 'center',
          width: size,
          ...style,
        }}
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
  bgColor: '',
  icon: false,
  onPress: () => {},
  size: 32,
  style: {},
};

export default IconButton;