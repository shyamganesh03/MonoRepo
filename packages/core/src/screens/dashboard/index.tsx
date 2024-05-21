import { ScreenLayout } from '@libs/utils';
import { Suspense, useCallback } from 'react';
import DesktopView from './DesktopView';
import MobileView from './MobileView';
import React from 'react';

const Dashboard = () => {
  const viewProps = {};

  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    []
  );

  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  );
};

export default Dashboard;