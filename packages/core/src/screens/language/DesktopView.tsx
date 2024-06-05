import React from 'react'
import { useTheme } from 'react-native-paper'
import { DesktopContainer } from '@libs/container'
import { Text } from '@libs/components'

const DesktopView = () => {
  const { colors } = useTheme()

  return (
    <DesktopContainer backgroundColor={colors.background}>
      <Text variant="functional1">Language DesktopView</Text>
    </DesktopContainer>
  )
}

export default DesktopView
