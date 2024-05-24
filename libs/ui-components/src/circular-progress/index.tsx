import React from 'react'
import { View } from 'react-native'
import { Svg, Circle } from 'react-native-svg'
import { Icon } from '../../../icons/output'
import { Text } from '@libs/components'
import { spacing } from '@libs/theme'
import { useTheme } from '@react-navigation/native'

interface CircularProgressProps {
  authenticated?: boolean
  bgColor?: string
  iconColor?: string
  iconName?: string
  innerStrokeWidth?: string
  mainText?: string
  pgColor?: string
  progressPercent?: number
  size: number
  strokeWidth: number
  text?: string
  textColor?: string
  textVariant?: string
  isStatic?: boolean
}

const CircularProgress = (props: CircularProgressProps) => {
  const {
    authenticated,
    bgColor,
    iconColor,
    iconName,
    innerStrokeWidth,
    mainText,
    pgColor,
    progressPercent = 0,
    size,
    strokeWidth,
    text,
    textColor,
    textVariant,
    isStatic = true,
  } = props

  // Calculate the radius of the progress circle
  const radius = (size - strokeWidth) / 2

  // Calculate the circumference of the progress circle
  const circum = radius * 2 * Math.PI

  // Calculate the percentage of the progress circle to be displayed
  let svgProgress = 100 - progressPercent

  if (isStatic) {
    svgProgress = 100 - 45
  }

  // Get the theme context
  const theme: any = useTheme()

  return (
    <View
      style={{
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={size} height={size}>
        {/* Background Circle */}
        {innerStrokeWidth ? (
          <Circle
            stroke={bgColor || theme.colors.secondaryVariant2}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            {...{ innerStrokeWidth }}
          />
        ) : (
          <Circle
            stroke={bgColor || theme.colors.secondaryVariant2}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeDasharray={`${circum} ${circum}`}
            strokeDashoffset={isStatic ? circum * (svgProgress / 100) : 0}
            strokeLinecap="round"
            transform={`rotate(${isStatic ? 140 : 90}, ${size / 2}, ${size / 2})`}
            {...{ strokeWidth }}
          />
        )}
        {/* Progress Circle */}
        <Circle
          stroke={pgColor || theme.colors.secondaryVariant3}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circum} ${circum}`}
          strokeDashoffset={circum * (svgProgress / 100)}
          strokeLinecap="round"
          transform={`rotate(${isStatic ? -40 : -90}, ${size / 2}, ${size / 2})`}
          {...{ strokeWidth }}
        />
      </Svg>
      {/* View to position the text and icon */}
      <View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {!authenticated && iconName && (
          <Icon
            name={iconName}
            color={iconColor}
            width={size / 4.5}
            height={size / 4.5}
          />
        )}
        {mainText && authenticated && (
          <Text variant="heading1" color={theme.colors.textPrimary}>
            {mainText}
          </Text>
        )}
        <Text
          variant={textVariant}
          color={textColor}
          style={{ marginTop: mainText ? spacing.spacing3 : 0 }}
        >
          {text || 0}
        </Text>
      </View>
    </View>
  )
}

export default CircularProgress
