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
import { View } from 'react-native'
import { Flex, IconButton, Text } from '@libs/components'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import { t } from 'i18next'
import LanguageSelector from '../screens/language'

const Stack = createNativeStackNavigator()

const Stacks = () => {
  const navigation = useNavigation()
  const { colors } = useTheme<any>()
  return (
    <Stack.Navigator initialRouteName="login">
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
                iconStyle={{ height: 20, width: 20 }}
                onPress={() => {
                  navigation.goBack()
                }}
              />
              <View style={{ flex: 1, marginRight: 20 }}>
                <Text variant="headlineMedium" textAlign="center">
                  {t('HOME.NEWS')}
                </Text>
              </View>
            </Flex>
          ),
        }}
      />
      <Stack.Screen
        name="genres"
        component={Genres}
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
              <View
                style={{
                  flex: 1,
                  marginRight: 20,
                }}
              >
                <Text variant="headlineMedium" textAlign="center">
                  {t('HOME.GENRES')}
                </Text>
              </View>
            </Flex>
          ),
        }}
      />
      <Stack.Screen
        name="eventDetail"
        component={EventDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="loginAndSignUp"
        component={Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        component={Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="register"
        component={Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="webView"
        component={WebView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="notificationSettings"
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
                iconStyle={{ height: 20, width: 20 }}
                onPress={() => {
                  navigation.goBack()
                }}
              />
              <View style={{ flex: 1, marginRight: 20 }}>
                <Text variant="headlineMedium" textAlign="center">
                  {t('NOTIFICATION_SETTINGS.NOTIFICATION_SETTINGS')}
                </Text>
              </View>
            </Flex>
          ),
        }}
      />
      <Stack.Screen
        name="profileSettings"
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
              <View style={{ flex: 1, marginRight: 20 }}>
                <Text variant="titleMedium" textAlign="center">
                  {t('PROFILE.PROFILE_SETTINGS')}
                </Text>
              </View>
            </Flex>
          ),
        }}
      />
      <Stack.Screen
        name="savedEvents"
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
                iconStyle={{ height: 20, width: 20 }}
                onPress={() => {
                  navigation.goBack()
                }}
              />
              <View style={{ flex: 1, marginRight: 20 }}>
                <Text variant="headlineMedium" textAlign="center">
                  {t('SAVED_EVENTS.TITLE')}
                </Text>
              </View>
            </Flex>
          ),
        }}
      />
      <Stack.Screen
        name="pdfView"
        component={PdfView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="languageSettings"
        component={LanguageSelector}
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
                iconStyle={{ height: 20, width: 20 }}
                onPress={() => {
                  navigation.goBack()
                }}
              />
              <View style={{ flex: 1, marginRight: 20 }}>
                <Text variant="headlineMedium" textAlign="center">
                  {t('BUTTON.CHANGE_LANGUAGE')}
                </Text>
              </View>
            </Flex>
          ),
        }}
      />
    </Stack.Navigator>
  )
}

export default Stacks
