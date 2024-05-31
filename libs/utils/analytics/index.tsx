import analytics from '@react-native-firebase/analytics'
import crashlytics from '@react-native-firebase/crashlytics'
import { BranchEvent } from 'react-native-branch'

const BranchEvents = []
class Analytics {
  static init() {
    analytics().setAnalyticsCollectionEnabled(true)
  }

  static onSignIn = async (userObject: any) => {
    const { userId } = userObject
    await Promise.all([
      analytics().setUserId(userId),
      crashlytics().setUserId(userId),
    ])
  }

  static onSignUp = async (userObject) => {
    const { id } = userObject
    await Promise.all([
      analytics().setUserId(id),
      analytics().setUserProperty('created_at', new Date()),
      this.logEvent('sign_up'),
    ])
  }

  static logEvent = (body: any) => {
    if (BranchEvents.includes(body.action)) {
      const params = {
        alias: body.action,
        customData: { ...body, details: JSON.stringify(body.details) },
      }
      const event = new BranchEvent(body.action, null, params)
      event.logEvent()
    }
    analytics().logEvent(
      `${body.entityType}_${body.action?.replace(/-/g, '')}`,
      {
        userId: body.userId,
        entityId: body.entityId,
        accessCode: body.accessCode,
      },
    )
    // Smartlook.trackCustomEvent(
    //   `${body.entityType}_${body.action?.replace('-', '')}`,
    //   body,
    // )
  }

  static logScreenView = async (
    previousRouteName: string,
    currentRouteName: string,
  ) => {
    await analytics().logScreenView({
      screen_name: currentRouteName,
      screen_class: currentRouteName,
    })
  }

  static onSignOut = async () => {
    await analytics().resetAnalyticsData()
  }
}

export default Analytics
