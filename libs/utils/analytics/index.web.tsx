import ReactGA from 'react-ga4'
import branch from 'branch-sdk'

const BranchEvents = []

class Analytics {
  static init() {}

  static logScreenView = async (currentRouteName) => {
    ReactGA.initialize('G-1GS27Y0EPF')
    ReactGA.set({ page: currentRouteName })
    ReactGA.pageview(currentRouteName)
  }

  static logEvent = (body) => {
    ReactGA.initialize('G-1GS27Y0EPF')
    ReactGA.event({
      category: body.entityType,
      action: body.action,
      label: body.details?.accessCode
        ? body.details.accessCode
        : body.entityId?.toString(),
    })
    if (BranchEvents.includes(body.action)) {
      branch.logEvent(body.action, { ...body })
    }

    ReactGA.event({
      category: body.entityType,
      action: body.action,
      label: body.details?.accessCode
        ? body.details.accessCode
        : body.entityId?.toString(),
    })
    if (
      body.action === 'SignUp-Cognito' ||
      body.action === 'SignUp-Google' ||
      body.action === 'SignUp-Facebook'
    ) {
      window.lintrk('track', { conversion_id: 7196681 })
      window.rdt('track', 'SignUp')
      window.twttr.conversion.trackPid('o7uyi', {
        tw_sale_amount: 0,
        tw_order_quantity: 0,
      })
    }
  }

  static onSignIn = async (userObject) => {
    const { userId } = userObject
    ReactGA.set({ userId })
  }
}

export default Analytics
