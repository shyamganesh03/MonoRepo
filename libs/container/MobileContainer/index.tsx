import React from 'react';
import { View } from 'react-native';
import { spacing } from '@libs/theme';
import KeyBoardView from '../KeyBoardView';

const MobileContainer = (props: any) => {
  const { style, children, hasPadding = true, hasKeyBoard = false, ...rest } = props;

  if (hasKeyBoard) {
    return (
      <KeyBoardView>
        <View
          style={[
            hasPadding ? { paddingHorizontal: spacing.spacing5 } : '',
            { height: '100%' },
            style,
          ]}
          {...rest}
        >
          {children}
        </View>
      </KeyBoardView>
    );
  }
  return (
    <View
      style={[hasPadding ? { paddingHorizontal: spacing.spacing5 } : '', { height: '100%' }, style]}
      {...rest}
    >
      {children}
    </View>
  );
};

export default MobileContainer;
