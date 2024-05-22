import React from 'react';
import { useWindowDimensions } from 'react-native';

export const getScreenTypeLayout = ({
  width,
  desktopComponent,
  tabletComponent,
  mobileComponent,
}) => {
  if (width > 850) {
    return desktopComponent;
  }
  if (width > 600) {
    return tabletComponent;
  }
  return mobileComponent;
};

export const ScreenTypes = {
  desktop: 'desktop',
  tablet: 'tablet',
  mobile: 'mobile',
};

export const getScreenType = (width) => {
  if (width > 850) {
    return ScreenTypes.desktop;
  }
  if (width > 600) {
    return ScreenTypes.tablet;
  }
  return ScreenTypes.mobile;
};

export const isWeb = (width) => {
  if ([ScreenTypes.desktop].indexOf(getScreenType(width)) !== -1) return true;
  return false;
};

export const withLayoutView = (DesktopComponent, TabletComponent, MobileComponent) => {
  const LayoutView = (props) => {
    const { width } = useWindowDimensions();

    if (width > 850) {
      return React.createElement(DesktopComponent, props);
    }
    if (width > 600) {
      return React.createElement(TabletComponent, props);
    }
    return React.createElement(MobileComponent, props);
  };

  return LayoutView;
};
