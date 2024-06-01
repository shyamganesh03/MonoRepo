import React, { Suspense, useEffect } from 'react'
import Stacks from './stack'
import { Linking, View } from 'react-native'
import { BottomNavLayout } from '../components/index'
import { useNavigation } from '@react-navigation/native'

export function AppNavigator() {
  const navigation = useNavigation()

  useEffect(() => {
    const handleOpenURL = ({ url }) => {
      console.log(url)

      navigateToScreen(url)
    }

    Linking.addEventListener('url', handleOpenURL)

    Linking.getInitialURL().then((url) => {
      if (url) {
        handleOpenURL({ url })
      }
    })
  }, [])

  const navigateToScreen = (url: string) => {
    try {
      const pathSegments = url.split('/').reverse()

      // Check if the path matches the expected pattern
      if (pathSegments && pathSegments[1] === 'event') {
        const eventId = pathSegments[0]

        // Navigate to the screen if the eventId is present
        if (eventId) {
          navigation.navigate('eventDetail', { eventId })
        } else {
          console.error('Event ID is missing')
        }
      } else {
        console.error('Invalid URL path')
      }
    } catch (error) {
      console.error('Error parsing URL:', error)
    }
  }

  return (
    <Suspense>
      <View style={{ flex: 1 }}>
        <Stacks />
        <BottomNavLayout />
      </View>
    </Suspense>
  )
}
