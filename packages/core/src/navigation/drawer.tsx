import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Dashboard from '../screens/dashboard'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
