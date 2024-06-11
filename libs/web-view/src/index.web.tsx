import React from 'react'

const WebView = (props: any) => {
  const googleTranslateUrl = `https://translate.google.com/translate?hl=&sl=auto&tl=en&u=https://www.monoRepo-app.com/faq`

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  React.useEffect(() => {
    openInNewTab(googleTranslateUrl)
  }, [])

  return (
    <div style={{ height: '100%' }}>
      <p>The translated page should open in a new tab.</p>
    </div>
  )
}

export default WebView
