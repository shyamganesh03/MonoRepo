import React from 'react'

const PdfView = (props: any) => {
  return (
    <div style={{ height: '100%' }}>
      <iframe src={props?.uri} width="100%" height="100%" />
    </div>
  )
}
export default PdfView
