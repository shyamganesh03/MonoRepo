import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { Linking } from 'react-native'

async function urlOpener(url: string, redirectUrl: string) {
  try {
    if (await InAppBrowser.isAvailable()) {
      //@ts-ignore
      const { type, url: newUrl } = await InAppBrowser.openAuth(
        url,
        redirectUrl,
        {
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
          ephemeralWebSession: true,
          showInRecents: true,
        },
      )
      if (type === 'success') {
        Linking.openURL(newUrl)
      }
    }
  } catch (e) {
    console.error(e)
  }
}
export default urlOpener
