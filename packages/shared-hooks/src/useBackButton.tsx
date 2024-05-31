import { BackHandler } from 'react-native'
import { useEffect } from 'react'

export const useBackButton = (handler: any) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handler)
    }
  }, [handler])
}
