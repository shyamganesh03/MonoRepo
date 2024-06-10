import React from 'react'
import { spacing } from '@libs/theme'
import { Flex } from '@libs/components'
import { useTheme } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const MobileContainer = (props: any) => {
  const {
    style,
    children,
    hasPadding = true,
    hasKeyBoard = false,
    backgroundColor,
    direction = 'column',
    ...rest
  } = props

  const { colors } = useTheme()

  if (hasKeyBoard) {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          backgroundColor: colors.background,
          flexGrow: 1,
        }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        keyboardShouldPersistTaps="handled"
        scrollEnabled
      >
        <Flex
          direction={direction}
          style={[
            hasPadding
              ? {
                  paddingHorizontal: spacing.spacing7,
                  paddingVertical: spacing.spacing8,
                }
              : '',
            {
              flex: 1,
              height: '100%',
              backgroundColor: backgroundColor,
            },
            style,
          ]}
          {...rest}
        >
          {children}
        </Flex>
      </KeyboardAwareScrollView>
    )
  }
  return (
    <Flex
      direction={direction}
      style={[
        hasPadding
          ? {
              paddingHorizontal: spacing.spacing7,
              paddingVertical: spacing.spacing8,
            }
          : '',
        {
          height: '100%',
          backgroundColor: backgroundColor || colors.background,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Flex>
  )
}

export default MobileContainer
