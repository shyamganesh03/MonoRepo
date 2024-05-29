import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomePage from '../screens/home'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="home">
      <Drawer.Screen name="home" component={HomePage} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
