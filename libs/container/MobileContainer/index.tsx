import React from 'react'
import { View } from 'react-native'
import { spacing } from '@libs/theme'
import KeyBoardView from '../KeyBoardView'

const MobileContainer = (props: any) => {
  const {
    style,
    children,
    hasPadding = true,
    hasKeyBoard = false,
    backgroundColor,
    ...rest
  } = props

  if (hasKeyBoard) {
    return (
      <KeyBoardView>
        <View
          style={[
            hasPadding
              ? {
                  paddingHorizontal: spacing.spacing7,
                  paddingVertical: spacing.spacing10,
                }
              : '',
            { height: '100%', backgroundColor: backgroundColor },
            style,
          ]}
          {...rest}
        >
          {children}
        </View>
      </KeyBoardView>
    )
  }
  return (
    <View
      style={[
        hasPadding
          ? {
              paddingHorizontal: spacing.spacing7,
              paddingVertical: spacing.spacing10,
            }
          : '',
        { height: '100%', backgroundColor: backgroundColor },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  )
}

export default MobileContainer
