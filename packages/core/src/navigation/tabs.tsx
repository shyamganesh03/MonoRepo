import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '@libs/native-icons'
import { useTheme } from '@react-navigation/native'
import HomePage from '../screens/home'
import Map from '../screens/map'
import Search from '../screens/search'
import Profile from '../screens/profile'
import Auth from '../screens/auth'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  const { colors } = useTheme()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingHorizontal: 30,
          height: 70,
        },
        headerShown: false,
      }}
      initialRouteName="home"
    >
      <Tab.Screen
        name="home"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="HomeIcon"
              color={focused ? colors.primary : ''}
              width={40}
              height={40}
            />
          ),
          title: '',
        }}
      />
      <Tab.Screen
        name="maps"
        component={Auth}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="MapIcon"
              color={focused ? colors.primary : ''}
              width={40}
              height={40}
            />
          ),
          headerShown: false,
          title: '',
        }}
      />
      <Tab.Screen
        name="search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="SearchIcon"
              color={focused ? colors.primary : ''}
              width={40}
              height={40}
            />
          ),
          headerShown: false,
          title: '',
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="UserIcon"
              color={focused ? colors.primary : ''}
              width={40}
              height={40}
            />
          ),
          headerShown: false,
          title: '',
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs
