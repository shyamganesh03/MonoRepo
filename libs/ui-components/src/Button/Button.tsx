import * as React from 'react';
import { Button as RNPButton } from 'react-native-paper';


const Button = (props:any) => (
  <RNPButton icon = {props.icon} 
  mode={props.mode || "contained"} 
  onPress={props.onPress}
  style = {[{borderRadius:18}, props.style]}
  >
    {props.label}
  </RNPButton>
);

export default Button;
