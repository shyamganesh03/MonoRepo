import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '@libs/native-icons'
import HomePage from '../screens/home'
import Map from '../screens/map'
import Search from '../screens/search'
import Profile from '../screens/profile'
import { useTheme } from 'react-native-paper'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  const { colors } = useTheme()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingHorizontal: 30,
          height: 80,
          backgroundColor: colors.background,
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
        component={Map}
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
