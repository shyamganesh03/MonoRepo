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

const Stack = createNativeStackNavigator()

const Stacks = () => {
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
    </Stack.Navigator>
  )
}

export default Stacks
