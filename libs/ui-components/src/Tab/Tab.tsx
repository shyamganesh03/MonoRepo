import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { spacing } from '@libs/theme'
import PropTypes from 'prop-types'
import RNPText from '../Text/Text'
import Flex from '../Flex'
import { useTheme } from 'react-native-paper'

interface TabProps {
  backgroundTab?: number
  bgColor: string
  data?: any[]
  setBackgroundTab: any
  style?: any
  textColor?: string
  tabColor?: string
  focusColor?: string
  indicatorColor: string
}

const Tab = (props: TabProps) => {
  const {
    backgroundTab = 0,
    bgColor,
    data = [],
    setBackgroundTab,
    style,
    textColor,
    tabColor,
    focusColor,
    indicatorColor,
  } = props
  const theme = useTheme()

  return (
    <Flex
      direction="row"
      style={StyleSheet.flatten([
        {
          backgroundColor: bgColor || theme.colors.background,
        },
        styles.tab,
        style,
      ])}
    >
      {data.map((option, index) => {
        return (
          <TouchableOpacity
            key={index.toString()}
            style={[
              {
                backgroundColor:
                  backgroundTab === index
                    ? tabColor || theme.colors.background
                    : 'transparent',
              },
              styles.tabItems,
            ]}
            onPress={() => {
              setBackgroundTab(index)
              option?.onPress(index)
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <RNPText
                variant="body2"
                color={
                  backgroundTab === index
                    ? focusColor || theme.colors.onPrimary
                    : textColor
                }
                style={{ textAlign: 'center' }}
              >
                {option.title}
              </RNPText>
              {option?.alertNo > 0 ? (
                <View
                  style={{
                    marginLeft: spacing.spacing3,
                    height: 8,
                    width: 8,
                    borderRadius: 4,
                    backgroundColor:
                      indicatorColor || theme.colors.onBackground,
                  }}
                />
              ) : (
                <View style={{ height: 22 }} />
              )}
            </View>
          </TouchableOpacity>
        )
      })}
    </Flex>
  )
}

Tab.propTypes = {
  bgColor: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setBackgroundTab: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textColor: PropTypes.string,
}

Tab.defaultProps = {
  bgColor: '',
  data: [
    {
      title: 'label1',
      alertNo: 10,
      onPress: () => {},
    },
    {
      title: 'label2',
      alertNo: 20,
      onPress: () => {},
    },
  ],
  setBackgroundTab: () => {},
  style: {},
  textColor: '',
}

const styles = StyleSheet.create({
  tab: {
    borderRadius: 104,
    padding: spacing.spacing2,
    width: '100%',
  },
  tabItems: {
    borderRadius: 52,
    flex: 1,
    paddingHorizontal: spacing.spacing3,
    paddingVertical: spacing.spacing3,
    alignItems: 'center',
  },
})

export default Tab
