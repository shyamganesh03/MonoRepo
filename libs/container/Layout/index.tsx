import { View } from 'react-native';
import React from 'react';

const Layout = (props: any) => {
  const { children, maxWidth = 520, hasPadding = true, style } = props;
  return (
    <View
      {...props}
      style={[
        {
          position: 'relative',
          alignItems: 'center',
          paddingHorizontal: hasPadding ? 24 : 0,
        },
        style,
      ]}
    >
      <View style={{ maxWidth, width: '100%' }}>{children}</View>
    </View>
  );
};

export default Layout;
