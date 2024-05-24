import { Button, Text } from '@libs/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@libs/native-icons'
import { useTheme } from '@react-navigation/native'
import { MobileContainer } from '@libs/container'
import { ScrollView, View } from 'react-native'
import { styles } from '../../../../../libs/ui-components/src/TextInput/styles'

const MobileView = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <View style={{flex:1}}>
    <ScrollView contentContainerStyle={{gap:10}}>
      <Text style={{ color: colors.primary }} variant='body1'>{t('AUTH.LOGIN')}</Text>
      <Text style={{ color: colors.primary }} variant='body2'>{t('AUTH.LOGIN')}</Text>
      <Text style={{ color: colors.primary }} variant='bodyBold1'>{t('AUTH.LOGIN')}</Text>
      <Text style={{ color: colors.primary }} variant='bodyBold2'>{t('AUTH.LOGIN')}</Text>
      <Text style={{ color: colors.primary }} variant='bodyCompact2'>{t('AUTH.LOGIN')}</Text>
      <Text style={{ color: colors.primary }} variant='bodyCompactBold2'>{t('AUTH.LOGIN')}</Text>
      <Text style={{ color: colors.primary }} variant='display1'>{t('AUTH.LOGIN')}</Text>
      <Text style={{ color: colors.primary }} variant='display2'>{t('AUTH.LOGIN')}</Text>
      <Text style={{ color: colors.primary }} variant='display3'>{t('AUTH.LOGIN')}</Text>
      <Text style={{ color: colors.primary }} variant='display4'>{t('AUTH.LOGIN')}</Text>
      <Text style={{ color: colors.primary }} variant='functional1'>{t('AUTH.LOGIN')}</Text>
      <Text style={{ color: colors.primary }} variant='heading1'>{t('AUTH.LOGIN')}</Text>
      <Text style={{ color: colors.primary }} variant='heading2'>{t('AUTH.LOGIN')}</Text>
      <Text style={{ color: colors.primary }} variant='heading3'>{t('AUTH.LOGIN')}</Text>
      <Text style={{ color: colors.primary }} variant='heading4'>{t('AUTH.LOGIN')}</Text>
      <Text style={{ color: colors.primary }} variant='heading5'>{t('AUTH.LOGIN')}</Text>
      <Text style={{ color: colors.primary }} variant='utility1'>{t('AUTH.LOGIN')}</Text>
      <Text style={{ color: colors.primary }} variant='utility2'>{t('AUTH.LOGIN')}</Text>
      <Text style={{ color: colors.primary }} variant='utilityBold1'>{t('AUTH.LOGIN')}</Text>
      <Text style={{ color: colors.primary }} variant='utilityCompact2'>{t('AUTH.LOGIN')}</Text>
      <Icon name="Home" width={20} height={20} color={'black'} />
      <Button
        mode={"contained"}
        onPress={() => { }}
        label='Check me'
      />
      <Button
        mode='outlined'
        onPress={() => { }}
        label='Check me'
      />
      <Button
        mode='text'
        onPress={() => { }}
        label='Check me'
      />
      <Button
        mode='elevated'
        onPress={() => { }}
        label='Check me'
      />
      <Button
        mode='contained-tonal'
        onPress={() => { }}
        label='Check me'
      />

    </ScrollView>
    </View>
  )
}

export default MobileView
