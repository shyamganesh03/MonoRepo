import React from 'react'
import PdfView from '@libs/pdf-view/src'
const MobileView = (props: any) => {
  return <PdfView uri={props?.uri} />
}
export default MobileView
