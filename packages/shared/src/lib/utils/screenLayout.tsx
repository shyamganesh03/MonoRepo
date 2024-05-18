import React from "react";
import { useWindowDimensions } from "react-native";

interface getScreenTypeLayoutProps {
  width: number;
  desktopComponent: any;
  tabletComponent: any;
  mobileComponent: any;
}

export const getScreenTypeLayout = ({
  width,
  desktopComponent,
  tabletComponent,
  mobileComponent,
}: getScreenTypeLayoutProps) => {
  if (width > 850) {
    return desktopComponent;
  }
  if (width > 600) {
    return tabletComponent;
  }
  return mobileComponent;
};

export const ScreenTypes = {
  desktop: "desktop",
  tablet: "tablet",
  mobile: "mobile",
};

export const getScreenType = (width: number) => {
  if (width > 850) {
    return ScreenTypes.desktop;
  }
  if (width > 600) {
    return ScreenTypes.tablet;
  }
  return ScreenTypes.mobile;
};

export const isWeb = (width: number) => {
  if ([ScreenTypes.desktop].indexOf(getScreenType(width)) !== -1) return true;
  return false;
};

export const withLayoutView = (
  DesktopComponent: any,
  TabletComponent: any,
  MobileComponent: any
) => {
  const LayoutView = (props: any) => {
    const { width } = useWindowDimensions();

    if (width > 850) {
      return <DesktopComponent {...props} />;
    }
    if (width > 600) {
      return <TabletComponent {...props} />;
    }
    return <MobileComponent {...props} />;
  };

  return LayoutView;
};
