import React from 'react'
import {
  HelperText,
  TextInput as RNPTextInput,
  useTheme,
} from 'react-native-paper'

const TextInput = (props: any) => {
  const { colors } = useTheme<any>()
  return (
    <>
      <RNPTextInput
        {...props}
        theme={{
          colors: {
            onSurface: props.style?.color || colors.textPrimary,
          },
        }}
        mode="outlined"
        outlineColor={props.outlineColor || 'transparent'}
        activeOutlineColor={colors.onSurface}
        placeholderTextColor={props.placeholderTextColor || colors.onSecondary}
        style={{
          ...props?.style,
          backgroundColor: colors.elevation.level5,
          height: 40,
        }}
        onFocus={() => {
          props?.onFocus?.()
        }}
        onBlur={() => {
          props?.onBlur?.()
        }}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === 'Enter') {
            props?.method()
          }
        }}
        contentStyle={{
          ...props.style,
          height: 40,
        }}
        outlineStyle={{ borderRadius: 16, ...props?.outlineStyle }}
        cursorColor={colors.textPrimary}
        selectionColor={colors.textPrimary}
        underlineColor="transparent"
      />
      {props?.error && (
        <HelperText
          type="error"
          visible
          padding="none"
          numberOfLines={2}
          style={{ width: '95%' }}
        >
          {props?.error || props?.error?.type}
        </HelperText>
      )}
    </>
  )
}

TextInput.Affix = RNPTextInput.Affix
TextInput.Icon = RNPTextInput.Icon

export default TextInput
