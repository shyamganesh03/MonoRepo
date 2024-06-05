import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAtom } from 'jotai'
import { appTheme } from '../utils/atom'
import { useTheme } from 'react-native-paper'
import { Text } from '@libs/components'

const ThemeSwitcher = () => {
  const [, setTheme] = useAtom(appTheme)
  const { colors } = useTheme()
  return (
    <View style={{ paddingRight: 20, flexDirection: 'row', gap: 20 }}>
      <TouchableOpacity onPress={() => setTheme('light')}>
        <Text color={colors.text}>Light</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTheme('dark')}>
        <Text color={colors.text}>Dark</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ThemeSwitcher
