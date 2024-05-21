import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react-native'

export const LottieAnimation = (props) => {
  const { animationUrl } = props
  const [animationData, setAnimationData] = useState(null)
  const getAnimation = (uri) => {
    return new Promise((resolve, reject) => {
      fetch(uri)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          setAnimationData(data)
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
  useEffect(() => {
    ;(async () => {
      getAnimation(animationUrl)
    })()
  }, [])
  return (
    <Lottie
      source={animationUrl}
      style={{ height: 400, width: 400 }}
      autoPlay
      loop
    />
  )
}
