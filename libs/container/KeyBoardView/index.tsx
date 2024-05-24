import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const KeyBoardView = ({ children }: any) => {
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        minHeight: '100%',
        height: '100%',
      }}
      extraHeight={120}
    >
      {children}
    </KeyboardAwareScrollView>
  )
}

export default KeyBoardView
