import React from 'react'
import WebView from '@libs/web-view/src'
const DesktopView = (props: any) => {
  return <WebView props={props?.uri} />
}
export default DesktopView
