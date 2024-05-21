import * as React from "react";

export const navigationRef: any = React.createRef();
export function navigate(name: string) {
  navigationRef.current?.navigate(name);
}

export function navigateWithParams(name: string, params: any) {
  navigationRef.current?.navigate(name, params);
}

export function getCurrent() {
  return navigationRef.current;
}

export function reset(name: string) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name }],
  });
}
