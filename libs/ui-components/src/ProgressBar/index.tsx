import React from 'react'
import { ProgressBar as RNPProgressBar, useTheme } from 'react-native-paper'
interface progressBarProps {
    color : string,
    progress : number,
    stillLoading ?: boolean,
    progressBackDropColor ?: string 
    height ?: number
}

export const ProgressBar = (props: progressBarProps) => {
  const {colors} = useTheme()
  return (
    <RNPProgressBar {...props} style={{height:7 || props.height,  borderRadius:40,}} fillStyle={{borderRadius:40}}/>
  )
}