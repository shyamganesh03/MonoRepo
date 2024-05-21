import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const BlurWidget = ({
  variant = '',
  onPress = () => {},
  disabled = false,
  backgroundColorStyle = null,
}) => {
  return (
    <TouchableOpacity style={styles.blur} disabled={disabled} onPress={onPress}>
      <BlurView
        style={{
          backgroundColor: backgroundColorStyle || 'rgba(183, 165, 250, 0.3)',
          height: '100%',
          width: '100%',
        }}
        blurRadius={variant === 'blur80' ? 20 : 8}
      />
    </TouchableOpacity>
  );
};
export default BlurWidget;

const styles = StyleSheet.create({
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
  },
});
