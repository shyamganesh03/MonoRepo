import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'
import React from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import { spacing } from '@libs/theme'
import { Icon } from '@libs/native-icons'
import { Text } from '@libs/components'

import Layout from '../Layout'

interface ScreenDrawerProps {
  children: any
  drawerColor?: string
  hasBack?: boolean
  screenName: string
  hasFull?: boolean
  height: number
  hasPadding?: boolean
  hasPaddingTop: boolean
  hasNotchIcon: boolean
  textColor: string
}

const ScreenDrawer = (props: ScreenDrawerProps) => {
  const theme: any = useTheme()
  const {
    children,
    drawerColor = theme.colors.backgroundSurface1,
    hasBack = false,
    screenName,
    hasFull = false,
    height,
    hasPadding = true,
    hasPaddingTop = true,
    hasNotchIcon = true,
    textColor,
  } = props

  const navigation = useNavigation()
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={hasPaddingTop && { paddingTop: 40 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1 }} />
      <View
        style={[
          styles.container,
          hasPadding && { paddingHorizontal: spacing.spacing5 },
          { backgroundColor: drawerColor },
          hasFull && { height: height || '100%' },
        ]}
      >
        {hasNotchIcon && (
          <View
            style={[
              styles.topNotch,
              { backgroundColor: theme.colors.dividerLong },
            ]}
          />
        )}

        <Layout hasPadding={false}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: spacing.spacing4,
            }}
          >
            {hasBack && (
              <TouchableOpacity
                onPress={() =>
                  Platform.OS === 'web'
                    ? window.history.go(-1)
                    : navigation.goBack()
                }
                style={{ marginLeft: !hasPadding ? spacing.spacing6 : 0 }}
              >
                <Icon
                  name="LeftIcon"
                  color={textColor || theme.colors.textPrimary}
                  width={20}
                  height={20}
                />
              </TouchableOpacity>
            )}
            {screenName && (
              <Text
                variant="heading2"
                color={textColor || theme.colors.textPrimary}
                style={{
                  marginLeft: spacing.spacing5,
                }}
              >
                {screenName}
              </Text>
            )}
          </View>
        </Layout>

        {children}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.spacing3,
    borderTopStartRadius: 16,
    borderTopRightRadius: 16,
  },
  topNotch: {
    height: 4,
    width: 32,
    alignSelf: 'center',
    marginBottom: spacing.spacing6,
    borderRadius: 100,
  },
})

export default ScreenDrawer
