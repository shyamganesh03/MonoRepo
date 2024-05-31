import { typography } from '@libs/theme'
import * as React from 'react'
import { Button as RNPButton } from 'react-native-paper'

const Button = (props: any) => (
  <RNPButton
    disabled={props.disabled}
    icon={props.icon}
    mode={props.mode || 'contained'}
    onPress={props.onPress}
    style={[{ borderRadius: 18 }, props.style]}
    //@ts-ignore
    labelStyle={[props.labelStyle, typography[props.labelVariant]]}
  >
    {props.label}
  </RNPButton>
)

export default Button