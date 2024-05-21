import { TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { Icon } from '../../../icons/output';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@libs/theme';

interface CheckBoxProps {
  activeState: boolean;
  setActiveState: Function;
  size: number;
  style: any;
  iconColor: string;
  backgroundColor: string;
}

const CheckBox = (props: CheckBoxProps) => {
  const { theme } = useContext(ThemeProvider);
  const { activeState, setActiveState, size, style, iconColor, backgroundColor } = props;

  return (
    <TouchableOpacity
      onPress={() => setActiveState(!activeState)}
      style={{
        alignItems: 'center',
        backgroundColor: activeState
          ? backgroundColor || theme.colors.primaryVariant2
          : 'transparent',
        borderColor: activeState ? iconColor || theme.colors.textLink : theme.colors.textPrimary,
        borderRadius: 100,
        borderWidth: 1,
        height: size,
        justifyContent: 'center',
        width: size,
        ...style,
      }}
    >
      {activeState && (
        <Icon
          color={iconColor || theme.colors.primary}
          height={size / 1.8}
          name="SelectorTickIcon"
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
