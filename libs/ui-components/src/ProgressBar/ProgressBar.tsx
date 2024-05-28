import React from 'react'
import { ProgressBar as RNPProgressBar } from 'react-native-paper'
interface progressBarProps {
  color: string
  progress: number
  stillLoading?: boolean
  progressBackDropColor?: string
  height?: number
}

const ProgressBar = (props: progressBarProps) => {
  return (
    <RNPProgressBar
      {...props}
      style={{
        height: 7 || props.height,
        backgroundColor: props.progressBackDropColor || 'grey',
        borderRadius: 40,
      }}
      fillStyle={{ borderRadius: 40 }}
    />
  )
}

export default ProgressBar
