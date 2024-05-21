import React, { Suspense } from "react";
import Tabs from "./tabs";

export default function AppNavigator() {
  return (
    <Suspense>
      <Tabs />
    </Suspense>
  );
}
