import React from 'react'
import PdfView from '@libs/pdf-view/src'
const DesktopView = (props: any) => {
  return <PdfView props={props?.uri} />
}
export default DesktopView
