import { Text } from 'react-native'
import React from 'react'
import { Icon } from '@libs/native-icons'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@react-navigation/native'
import { DesktopContainer } from '@libs/container'
import { CheckBox } from '../../../../../libs/ui-components/src'
import DropDown from '../../../../../libs/ui-components/src/DropDown/DropDown'

const DesktopView = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const mockList = [
    { value: 'item1', label: 'Item 1' },
    { value: 'item2', label: 'Item 2' },
    { value: 'item3', label: 'Item 3' },
    { value: 'item4', label: 'Item 4' },
    { value: 'item5', label: 'Item 5' },
  ]

  return (
    <DesktopContainer backgroundColor={colors.background}>
      <Text style={{ color: colors.primary }}>{t('AUTH.LOGIN')}</Text>
      <Icon name="Home" width={30} height={30} />
      <CheckBox
        status="checked"
        onPress={() => {
          console.log('hi')
        }}
        disabled={false}
        iconName="CocktailIcon"
        iconColor="red"
      />
      <DropDown
        label={`${mockList?.label}`}
        mode="outlined"
        // value={().toString()}
        list={mockList}
        // error={error}
        // onFocus={onFocus}
        // setValue={(text) =>
        //   onChangeText({ ...data, indexOrder: index }, text, fieldName)
        // }
        // style={style}
        // disabled={disabled}
      />
    </DesktopContainer>
  )
}

export default DesktopView
