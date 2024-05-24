import { useTheme } from '@react-navigation/native'
import React from 'react'
import { ActivityIndicator, Modal, View } from 'react-native'

interface LoaderProps {
  visible: boolean
  colorVariant?: string
}

const Loader = (props: LoaderProps) => {
  const { visible, colorVariant = 'primaryVariant1' } = props
  const theme: any = useTheme()

  return (
    <Modal visible={visible} transparent>
      <View
        style={{
          alignItems: 'center',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator color={theme.colors[colorVariant]} size="large" />
      </View>
    </Modal>
  )
}
export default Loader
