import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  Platform,
  useWindowDimensions,
  Animated,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { spacing } from '@libs/theme'
import { Icon } from '@libs/native-icons'
import { ScreenLayout } from '@libs/utils'
import { Sheet } from '@libs/sheet'
import RNPText from '../Text'
import { useTheme } from 'react-native-paper'

interface DrawerProps {
  children: any
  direction: any
  containerStyle?: any
  drawerColor?: string
  hasBack?: boolean
  isUnlockDrawer?: boolean
  screenName?: string
  setShowDrawer?: Function
  showBackground?: any
  showDrawer?: boolean
  showSwipeIcon?: boolean
  isEnable?: boolean
}

const Drawer = (props: DrawerProps) => {
  const theme: any = useTheme()

  const {
    children,
    containerStyle,
    drawerColor = theme.colors.background,
    hasBack,
    isUnlockDrawer = false,
    screenName,
    setShowDrawer = () => {},
    showBackground = false,
    showDrawer = false,
    showSwipeIcon = true,
    isEnable = true,
    direction = 'right',
  } = props
  const [screenHeight, setScreenHeight] = useState<any>('100%')
  const listenerShow = (e: any) => {
    setScreenHeight(
      Dimensions.get('screen').height -
        e.endCoordinates.height -
        (!(Platform.OS === 'ios') ? 60 : 0),
    )
  }
  const windowWidth = useWindowDimensions().width
  const isDesktop = ScreenLayout?.isWeb(windowWidth)

  const listenerRemove = () => setScreenHeight('100%')

  useEffect(() => {
    const keyboardDidShow = Keyboard?.addListener(
      'keyboardDidShow',
      listenerShow,
    )
    const keyboardDidHide = Keyboard?.addListener(
      'keyboardDidHide',
      listenerRemove,
    )
    return () => {
      keyboardDidShow.remove()
      keyboardDidHide.remove()
    }
  }, [showDrawer])

  const findBorderRadius = (direction: any) => {
    switch (direction) {
      case 'right': {
        return { borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }
      }
      case 'left': {
        return { borderTopRightRadius: 16, borderBottomRightRadius: 16 }
      }
      case 'top': {
        return { borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }
      }
      case 'bottom': {
        return { borderTopLeftRadius: 16, borderTopRightRadius: 16 }
      }
    }
  }

  return (
    <Modal
      visible={showDrawer}
      transparent
      onRequestClose={() => setShowDrawer(false)}
    >
      <View style={{ flexDirection: 'row', height: '100%', width: '100%' }}>
        {isDesktop && <View style={{ maxWidth: 475, width: '100%' }} />}

        <View style={[styles.wrapper, { height: screenHeight, flex: 1 }]}>
          {showBackground}
          <TouchableOpacity
            onPress={() => setShowDrawer(false)}
            style={{ flex: 1 }}
          />

          <Sheet
            dismiss={setShowDrawer}
            isEnable={isEnable}
            direction={direction}
          >
            <View style={{ width: '100%', alignItems: 'center' }}>
              <View
                style={[
                  styles.container,
                  {
                    maxWidth: 520,
                    width: '100%',
                    backgroundColor: drawerColor,
                    height: screenHeight,
                    ...findBorderRadius(direction),
                  },
                  containerStyle,
                ]}
              >
                {showSwipeIcon && (
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: isUnlockDrawer
                          ? theme.colors.textPrimary
                          : theme.colors.dividerLong,
                        borderRadius: 50,
                        height: 4,
                        marginBottom: 20,
                        width: 32,
                      }}
                    />
                  </View>
                )}
                {hasBack && (
                  <TouchableOpacity
                    onPress={() => {
                      setShowDrawer(false)
                    }}
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginBottom: spacing.spacing4,
                      paddingHorizontal: spacing.spacing5,
                    }}
                  >
                    <Icon
                      name="LeftIcon"
                      color={theme.colors.textPrimary}
                      width={20}
                      height={20}
                    />
                    <RNPText
                      variant="heading2"
                      color={theme.colors.textPrimary}
                      style={{
                        marginLeft: spacing.spacing5,
                      }}
                    >
                      {screenName}
                    </RNPText>
                  </TouchableOpacity>
                )}
                {children}
              </View>
            </View>
          </Sheet>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: Dimensions.get('window').height,
    width: '100%',
  },
  container: {
    bottom: 0,
    paddingBottom: spacing.spacing9,
    paddingTop: spacing.spacing3,
    width: '100%',
  },
})

export default Drawer
