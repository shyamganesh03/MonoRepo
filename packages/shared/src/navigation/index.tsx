import React, { Suspense } from "react";
import Stacks from "./stack";
import Tabs from "./tabs";
import DrawerNavigator from "./drawer";

export default function AppNavigator() {
  return (
    <Suspense>
      {/* <Stacks /> */}
      {/* <Tabs /> */}
      <DrawerNavigator />
    </Suspense>
  );
}
