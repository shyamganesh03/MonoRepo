import {
  Button,
  CheckBox,
  Drawer,
  PasswordInput,
  Text,
  TextInput,
  Flex,
} from '@libs/components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@libs/native-icons'
import { useTheme } from 'react-native-paper'
import { MobileContainer } from '@libs/container'
import { ScrollView, View } from 'react-native'
import { DropDown } from '@libs/components'
import { BlurWidget } from '@libs/blurwidget'

const MobileView = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()

  const [showDrawer, setShowDrawer] = useState(false)
  const [dropDownValue, setDropDownValue] = useState('')
  const mockList = [
    { value: 'item1', label: 'Item 1' },
    { value: 'item2', label: 'Item 2' },
    { value: 'item3', label: 'Item 3' },
    { value: 'item4', label: 'Item 1' },
    { value: 'item5', label: 'Item 2' },
    { value: 'item6', label: 'Item 3' },
    { value: 'item7', label: 'Item 1' },
    { value: 'item8', label: 'Item 2' },
    { value: 'item9', label: 'Item 3' },
  ]

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <MobileContainer style={{ gap: 10 }}>
          {/* <Text style={{ color: colors.primary }} variant="body1">
        <MobileContainer
          style={{ gap: 10 }}
          backgroundColor={colors.background}
        >
          <Text style={{ color: colors.primary }} variant="body1">
            {t('AUTH.LOGIN')}
          </Text>
          <Text style={{ color: colors.primary }} variant="body2">
            {t('AUTH.LOGIN')}
          </Text>
          <Text style={{ color: colors.primary }} variant="bodyBold1">
            {t('AUTH.LOGIN')}
          </Text>
          <Text style={{ color: colors.primary }} variant="bodyBold2">
            {t('AUTH.LOGIN')}
          </Text>
          <Text style={{ color: colors.primary }} variant="bodyCompact2">
            {t('AUTH.LOGIN')}
          </Text>
          <Text style={{ color: colors.primary }} variant="bodyCompactBold2">
            {t('AUTH.LOGIN')}
          </Text>
          <Text style={{ color: colors.primary }} variant="display1">
            {t('AUTH.LOGIN')}
          </Text>
          <Text style={{ color: colors.primary }} variant="display2">
            {t('AUTH.LOGIN')}
          </Text>
          <Text style={{ color: colors.primary }} variant="display3">
            {t('AUTH.LOGIN')}
          </Text>
          <Text style={{ color: colors.primary }} variant="display4">
            {t('AUTH.LOGIN')}
          </Text>
          <Text style={{ color: colors.primary }} variant="functional1">
            {t('AUTH.LOGIN')}
          </Text>
          <Text style={{ color: colors.primary }} variant="heading1">
            {t('AUTH.LOGIN')}
          </Text>
          <Text style={{ color: colors.primary }} variant="heading2">
            {t('AUTH.LOGIN')}
          </Text>
          <Text style={{ color: colors.primary }} variant="heading3">
            {t('AUTH.LOGIN')}
          </Text>
          <Text style={{ color: colors.primary }} variant="heading4">
            {t('AUTH.LOGIN')}
          </Text>
          <Text style={{ color: colors.primary }} variant="heading5">
            {t('AUTH.LOGIN')}
          </Text>
          <Text style={{ color: colors.primary }} variant="utility1">
            {t('AUTH.LOGIN')}
          </Text>
          <Text style={{ color: colors.primary }} variant="utility2">
            {t('AUTH.LOGIN')}
          </Text>
          <Text style={{ color: colors.primary }} variant="utility1">
            {t('AUTH.LOGIN')}
          </Text>
          <Text style={{ color: colors.primary }} variant="utilityCompact2">
            {t('AUTH.LOGIN')}
          </Text>
          <Icon name="Home" width={20} height={20} color={'black'}  /> 
          <Button mode={'contained'} onPress={() => {}} label="Check me"/>
          <Button mode="outlined" onPress={() => {}} label="Check me" />
          <Button mode="text" onPress={() => {}} label="Check me" />
          <Button mode="elevated" onPress={() => {}} label="Check me" />
          <Button mode="contained-tonal" onPress={() => {}} label="Check me" />  
           <Loader animating={true} color={colors.primary} size={'small'} hidesWhenStopped={true}/> 
          
           */}
          <Flex direction="row" style={{ gap: 20 }}>
            <Text>working</Text>
            <Text>workings</Text>
          </Flex>

          <Icon name="Home" width={20} height={20} color={'black'} />
          <Button mode={'contained'} onPress={() => {}} label="Check me" />
          <Button mode="outlined" onPress={() => {}} label="Check me" />
          <Button mode="text" onPress={() => {}} label="Check me" />
          <Button mode="elevated" onPress={() => {}} label="Check me" />
          <Button
            mode="contained-tonal"
            onPress={() => setShowDrawer(!showDrawer)}
            label="Show Drawer"
          />
          <DropDown
            list={mockList}
            setValue={setDropDownValue}
            field="label"
            style={{ color: 'red' }}
            placeholderTextColor="blue"
            dropDownStyle={{ borderRadius: 20 }}
            placeholder="Slee"
          />

          <Drawer
            showDrawer={false}
            setShowDrawer={setShowDrawer}
            direction={'bottom'}
            showBackground={<BlurWidget variant="blur20" onPress={() => {}} />}
          >
            <View>
              <Text>Hello world</Text>
            </View>
          </Drawer>
          <CheckBox
            onPress={() => setShowDrawer(!showDrawer)}
            status={showDrawer ? 'checked' : 'unchecked'}
            size={20}
            width={12}
            height={12}
          />
          <PasswordInput
            onChangeText={(e: any) => console.log(e)}
            setIsValidPassword={setShowDrawer}
            placeholder={'Enter Password'}
          />
          <Text>{dropDownValue}</Text>
          <TextInput
            onChangeText={(e: string) => console.log(e)}
            left={<TextInput.Icon icon={() => <Icon name="HomeIcon" />} />}
            placeholder={'Enter Emaill'}
            style={{ color: colors.textPrimary }}
          />
        </MobileContainer>
      </ScrollView>
    </View>
  )
}

export default MobileView
