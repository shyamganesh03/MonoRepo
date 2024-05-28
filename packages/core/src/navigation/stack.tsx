import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Tabs from './tabs'
import { NavigationContainer } from '@react-navigation/native'
import News from '../screens/news'

const Stack = createNativeStackNavigator()

const Stacks = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="home"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="viewAllScreen"
          component={News}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Stacks
