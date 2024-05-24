import React, { useRef, useState, useEffect } from 'react'
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '@libs/components'
import { spacing } from '@libs/theme'
import { useTheme } from '@react-navigation/native'

const TabAnimation = ({ tabData, activeIndex = 0 }: any) => {
  const theme = useTheme()
  const [btnContainerWidth, setWidth] = useState(0)
  const btnWidth = btnContainerWidth / tabData.length
  const translateX = useRef(new Animated.Value(activeIndex * btnWidth)).current
  const translateXOpposit = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  })

  const onPress = (i: number) => {
    Animated.spring(translateX, {
      toValue: i * btnWidth,
      useNativeDriver: true,
      bounciness: 0,
    }).start()
  }

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: activeIndex * btnWidth,
      useNativeDriver: true,
      bounciness: 0,
    }).start()
  }, [activeIndex, btnWidth, translateX])

  return (
    <View
      style={[
        styles.btnContainer,
        { backgroundColor: theme.colors.backgroundSurface2 },
      ]}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      {tabData.map((tab: any, i: number) => (
        <TouchableOpacity
          key={tab.tabNum}
          style={styles.btn}
          onPress={() => {
            onPress(i)
            tab.onPress()
          }}
        >
          <Text variant="body2" color={theme.colors.textHints}>
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
      <Animated.View
        style={[
          styles.animatedBtnContainer,
          {
            width: btnWidth,
            transform: [{ translateX }],
            borderRadius: 52,
            backgroundColor: theme.colors.backgroundSurface,
          },
        ]}
      >
        {tabData.map((tab: any) => (
          <Animated.View
            key={tab.tabNum}
            style={[
              styles.animatedBtn,
              {
                width: btnWidth,
                transform: [{ translateX: translateXOpposit }],
                borderRadius: 52,
                backgroundColor: theme.colors.backgroundSurface,
              },
            ]}
          >
            <Text variant="body2" color={theme.colors.onNeutral}>
              {tab.title}
            </Text>
          </Animated.View>
        ))}
      </Animated.View>
    </View>
  )
}
export default TabAnimation
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    borderRadius: 104,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    paddingVertical: spacing.spacing4,
  },
  animatedBtnContainer: {
    flexDirection: 'row',
    position: 'absolute',
    overflow: 'hidden',
    paddingVertical: spacing.spacing2,
  },
  animatedBtn: {
    padding: spacing.spacing2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 52,
  },
})
