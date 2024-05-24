import FingerprintJS from '@fingerprintjs/fingerprintjs'

const fingerprint = {
  async getVisitorId() {
    const fpPromise = FingerprintJS.load()
    const fp = await fpPromise
    const getData = await fp.get()
    // exclude the browser plugins
    const {
      screenResolution,
      screenFrame,
      plugins,
      touchSupport,
      ...components
    } = getData.components
    const visitorId = FingerprintJS.hashComponents(components)
    return visitorId
  },
}

export default fingerprint
