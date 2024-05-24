import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dashboard from '../screens/dashboard'
import { Icon } from '@libs/native-icons'
import { useTheme } from '@react-navigation/native'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  const { colors } = useTheme()
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: () => <Icon name="HomeIcon" color={colors.primary} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs
