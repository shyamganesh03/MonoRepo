import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View, StyleSheet } from 'react-native'

interface DesktopContainerProps {
  children?: any
  maxWidth?: number
  backgroundColor?: string
  style?: any
}

const DesktopContainer = (props: DesktopContainerProps) => {
  const { children, maxWidth = 540, backgroundColor, style } = props
  const theme: any = useTheme()

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor || theme.colors?.backgroundSurface1,
        },
        style,
      ]}
    >
      <View style={styles.layout}>
        <View style={{ flex: 1, overflow: 'scroll' }}>
          <View
            style={{
              position: 'relative',
              alignItems: 'center',
              paddingHorizontal: 24,
            }}
          >
            <View style={{ maxWidth, width: '100%' }}>{children}</View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //@ts-ignore
    minHeight: '100vh',
    //@ts-ignore
    maxHeight: '100vh',
    overflow: 'scroll',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  layout: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
})

export default DesktopContainer
