import React from 'react'

const PdfView = (props: any) => {
  return (
    <div style={{ height: '100%' }}>
      <embed
        src={props?.uri}
        type="application/pdf"
        width="100%"
        height="100%"
      />
    </div>
  )
}
export default PdfView
