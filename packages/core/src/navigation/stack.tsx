import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Tabs from './tabs'
import { NavigationContainer } from '@react-navigation/native'
import News from '../screens/news'
import EventDetailScreen from '../screens/eventDetailsScreen'

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
      <Stack.Screen
        name="eventDetailScreen"
        component={EventDetailScreen}
        options={{ headerShown: false }}
      />
    </NavigationContainer>
  )
}

export default Stacks
