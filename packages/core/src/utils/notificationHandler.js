import PushNotification from 'react-native-push-notification'
import messaging from '@react-native-firebase/messaging'
import { AppState } from 'react-native'
import * as RootNavigator from '../navigation/RootNavigator'
import { getNotificationNavigation } from '@izzo/hooks'

const notificationService = async () => {
  try {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage)
    })
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister(token) {
        console.log('TOKEN:', token)
      },
      // (required) Called when a remote or local notification is opened or received
      async onNotification(notification) {
        console.log('REMOTE NOTIFICATION ==>', notification.data)
        if (AppState.currentState === 'background') {
          getNotificationNavigation(
            notification.data,
            RootNavigator.navigateWithParams,
          )
        }
      },
      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction(notification) {
        console.log('ACTION:', notification.action)
        console.log('NOTIFICATION:', notification)
        // process the action
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    })
  } catch (error) {
    console.log({ error })
  }
}
export default notificationService

export const getFCMToken = async () => {
  const fcmToken = await messaging().getToken()
  console.log({ fcmToken })
  return fcmToken
}
