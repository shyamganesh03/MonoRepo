import { useNavigation, useNavigationState } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native'
import { Surface, useTheme } from 'react-native-paper'

import { Icon } from '@libs/native-icons'

import { spacing } from '@libs/theme'

export const BottomNavLayout = () => {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const currentRoute = useNavigationState(
    (state) => state?.routes?.[state.routes.length - 1] || { name: 'home' },
  )

  const windowWidth = useWindowDimensions().width

  const renderBottomIcon = (
    name: any,
    route: any,
    isDisable = false as boolean,
  ) => {
    const isActiveIcon = () => route === currentRoute?.name

    return (
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          navigation.navigate(route)
        }}
        disabled={isDisable}
      >
        <View style={styles.iconStyle}>
          <Icon
            color={isActiveIcon() ? colors.primary : colors.onSurface}
            name={name}
            height={40}
            width={40}
            strokeWidth={isActiveIcon() ? 2 : 1}
          />
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <Surface
      style={{
        position: Platform.OS === 'web' ? 'fixed' : 'absolute',
        bottom: 0,
        zIndex: 10,
        backgroundColor: colors.onPrimaryContainer,
        width: windowWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.spacing4,
        height: 80,
        paddingHorizontal: 35,
      }}
      elevation={1}
    >
      <View style={styles.icons}>{renderBottomIcon('HomeIcon', 'home')}</View>
      <View style={styles.icons}>{renderBottomIcon('MapIcon', 'maps')}</View>
      <View style={styles.icons}>
        {renderBottomIcon('SearchIcon', 'search')}
      </View>
      <View style={styles.icons}>
        {renderBottomIcon('UserIcon', 'profile')}
      </View>
    </Surface>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
  },
  iconContainer: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  iconStyle: {
    width: 30,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: spacing.spacing2,
  },
  icons: { flex: 1 },
})
