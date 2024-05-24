import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import messaging from '@react-native-firebase/messaging'
import { AppState } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { RootNavigator } from '@edvnz/navigation'
import { store } from '../store/storeProvider'
import { updatePreLoginUserDeviceInfo } from '../api'
import { getNotificationNavigation } from '../hooks/getNotificationNavigation'

const notificationService = () => {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // console.log('Message handled in the background!', remoteMessage)
  })
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister(token) {
      // console.log('TOKEN:', token)
    },
    // (required) Called when a remote or local notification is opened or received
    onNotification(notification) {
      // console.log('REMOTE NOTIFICATION ==>', notification)

      // const routes = useNavigationState((state) => state.routes)
      // const currentRoute = routes[routes.length - 1].name
      if (AppState.currentState === 'background') {
        getNotificationNavigation({
          data: notification.data,
          navigation: RootNavigator.navigateWithParams,
        })
      } else if (!notification.foreground) {
        store.dispatch({
          type: 'SET_NOTIFICATION_ROUTE',
          data: notification.data,
        })
        notification.finish(PushNotificationIOS.FetchResult.NoData)
      }
    },
    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction(notification) {
      // console.log('ACTION:', notification.action)
      // console.log('NOTIFICATION:', notification)
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
}
export default notificationService

export const getFCMToken = async () => {
  const fcmToken = await messaging().getToken()
  const deviceId = DeviceInfo?.getUniqueId()
  await updatePreLoginUserDeviceInfo({
    deviceId,
    notificationDeviceId: fcmToken,
  })
  return fcmToken
}
