import React from 'react'
import WebView from '@libs/web-view/src'
const MobileView = (props: any) => {
  return <WebView uri={props?.uri} />
}
export default MobileView
