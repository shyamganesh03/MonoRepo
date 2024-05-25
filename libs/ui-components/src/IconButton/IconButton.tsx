import * as React from 'react';
import { IconButton as RNPIconButton,  } from 'react-native-paper';

interface IconButtonProps {
  icon: string;
  mode ?: 'outlined' | 'contained' | 'contained-tonal';
  iconColor?: string;
  containerColor?: string;
  selected?: boolean;
  disabled?: boolean;
  animated?: boolean;
  size?: number;
  onPress?: () => void;
}
const IconButton = (props:IconButtonProps) => {
  return(
  <RNPIconButton
  {...props}
  
  />
)
}

export default IconButton;