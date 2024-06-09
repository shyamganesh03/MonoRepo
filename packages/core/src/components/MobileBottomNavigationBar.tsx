import React from 'react'
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native'
import { Surface, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@libs/native-icons'
import { spacing } from '@libs/theme'

export const BottomNavLayout = () => {
  const { colors } = useTheme()
  const navigation: any = useNavigation()
  const currentRoute = navigation.getCurrentRoute()
  const windowWidth = useWindowDimensions().width
  const routeNames = ['home', 'maps', 'search', 'profile', 'savedEvents']

  const renderBottomIcon = (
    name: string,
    route: string,
    isDisabled = false,
  ) => {
    const isActiveIcon = () => route === currentRoute?.name

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(route)
        }}
        disabled={isDisabled}
      >
        <View style={styles.iconContainer}>
          <Icon
            color={isActiveIcon() ? colors.primary : colors.onSurface}
            name={name}
            height={24}
            width={24}
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
        height: routeNames.includes(currentRoute?.name) ? 56 : 0,
        paddingHorizontal: spacing.spacing6,
        display: routeNames.includes(currentRoute?.name) ? 'flex' : 'none',
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
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: spacing.spacing2,
  },
  icons: {},
})

export default BottomNavLayout
