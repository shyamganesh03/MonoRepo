import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import News from '../screens/news'
import HomePage from '../screens/home'
import Map from '../screens/map'
import Search from '../screens/search'
import Profile from '../screens/profile'
import Genres from '../screens/genres'
import EventDetailScreen from '../screens/eventDetails'
import Auth from '../screens/auth'
import WebView from '../screens/webView'
import NotificationSettings from '../screens/notificationSettings'
import ProfileSettings from '../screens/profileSettings'
import SavedEvents from '../screens/savedEvents'
import PdfView from '../screens/pdfView'
import { Icon } from '../../../../libs/icons/output'
import { Flex, IconButton, Text } from '../../../../libs/ui-components/src'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import { t } from 'i18next'

const Stack = createNativeStackNavigator()

const Stacks = () => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="maps"
        component={Map}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="news"
        component={News}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="genres"
        component={Genres}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="eventDetail"
        component={EventDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="auth"
        component={Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="webView"
        component={WebView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="notificationsettings"
        component={NotificationSettings}
        options={{
          header: () => (
            <Flex
              direction="row"
              style={{
                paddingHorizontal: 16,
                paddingVertical: 32,
                alignItems: 'center',
                backgroundColor: colors.background,
              }}
            >
              <IconButton
                name="ArrowLeftIcon"
                color={colors.textPrimary}
                onPress={() => {
                  navigation.goBack()
                }}
              />
              <Text
                variant="heading2"
                style={{ flex: 1, textAlign: 'center', marginRight: 20 }}
              >
                {t('NOTIFICATION_SETTINGS.NOTIFICATION_SETTINGS')}
              </Text>
            </Flex>
          ),
        }}
      />
      <Stack.Screen
        name="profilesettings"
        component={ProfileSettings}
        options={{
          header: () => (
            <Flex
              direction="row"
              style={{
                paddingHorizontal: 16,
                paddingVertical: 32,
                alignItems: 'center',
                backgroundColor: colors.background,
              }}
            >
              <IconButton
                name="ArrowLeftIcon"
                color={colors.textPrimary}
                onPress={() => {
                  navigation.goBack()
                }}
              />
              <Text
                variant="heading2"
                style={{ flex: 1, textAlign: 'center', marginRight: 20 }}
              >
                {t('PROFILE.PROFILE_SETTINGS')}
              </Text>
            </Flex>
          ),
        }}
      />
      <Stack.Screen
        name="savedevents"
        component={SavedEvents}
        options={{
          header: () => (
            <Flex
              direction="row"
              style={{
                paddingHorizontal: 16,
                paddingVertical: 32,
                alignItems: 'center',
                backgroundColor: colors.background,
              }}
            >
              <IconButton
                name="ArrowLeftIcon"
                color={colors.textPrimary}
                onPress={() => {
                  navigation.goBack()
                }}
              />
              <Text
                variant="heading2"
                style={{ flex: 1, textAlign: 'center', marginRight: 20 }}
              >
                {t('SAVED_EVENTS.TITLE')}
              </Text>
            </Flex>
          ),
        }}
      />
      <Stack.Screen
        name="pdfview"
        component={PdfView}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default Stacks
