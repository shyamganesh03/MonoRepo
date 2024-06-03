import React from 'react'
import { useTheme } from 'react-native-paper'
import { DesktopContainer } from '@libs/container'
import { Text } from '@libs/components'

const DesktopView = () => {
  const { colors } = useTheme()

  return (
    <DesktopContainer backgroundColor={colors.background}>
      <Text variant="titleMedium">Search DesktopView</Text>
    </DesktopContainer>
  )
}

export default DesktopView
