import React from 'react'
import {
  Button,
  CheckBox,
  DropDown,
  Flex,
  Text,
  TextInput,
} from '@libs/components'
import { View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import { t } from 'i18next'
import { useTheme } from 'react-native-paper'

const MobileView = (props: any) => {
  const { colors } = useTheme<any>()
  const { userDetails, regionsData, handleChangeText } = props

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <View style={{ marginTop: 16 }}>
          <Text variant="titleLarge">{t('PROFILE_SETTINGS.NAME')}</Text>
          <Flex direction="column" style={{ marginTop: 16, rowGap: 8 }}>
            <TextInput
              onChangeText={(onChangeName: string) =>
                handleChangeText('name', onChangeName)
              }
              value={userDetails?.name}
              outlineStyle={{ borderWidth: 0 }}
              dense={true}
            />
            <TextInput
              onChangeText={(onChangeSurName: string) =>
                handleChangeText('surname', onChangeSurName)
              }
              value={userDetails?.surname}
              outlineStyle={{ borderWidth: 0 }}
              dense={true}
            />
          </Flex>
        </View>
        <Flex style={{ marginTop: 32, rowGap: 8 }} direction="column">
          <Text variant="titleLarge">{t('PROFILE_SETTINGS.EMAIL')}</Text>
          <TextInput
            onChangeText={(onChangeEmail: string) =>
              handleChangeText('email', onChangeEmail)
            }
            value={userDetails?.email}
            outlineStyle={{ borderWidth: 0 }}
            dense={true}
          />
        </Flex>
        <Flex style={{ marginTop: 32, rowGap: 8 }} direction="column">
          <Text variant="titleLarge">{t('PROFILE_SETTINGS.PHONE_NUMBER')}</Text>
          <TextInput
            onChangeText={(onChangePhoneNumber: string) =>
              handleChangeText('phone', onChangePhoneNumber)
            }
            value={userDetails?.phone}
            outlineStyle={{ borderWidth: 0 }}
            dense={true}
          />
        </Flex>

        <View style={{ marginTop: 16 }}>
          <Text variant="titleLarge">{t('PROFILE_SETTINGS.ADDRESS')}</Text>
          <Flex direction="column" style={{ marginTop: 16, rowGap: 8 }}>
            <TextInput
              outlineStyle={{ borderWidth: 0, borderRadius: 16 }}
              contentStyle={{ fontSize: 16, fontWeight: '500' }}
              onChangeText={(onChangeStreet: string) =>
                handleChangeText('street', onChangeStreet)
              }
              dense={true}
              value={userDetails?.street}
            />
            <DropDown
              dense={true}
              list={regionsData}
              placeholder={t('SEARCH.SELECT')}
              setValue={(value: any) => handleChangeText('region', value)}
              field="region"
              value={userDetails?.region}
            />
          </Flex>
        </View>
        <Flex
          direction="row"
          style={{
            gap: 10,
            marginTop: 32,
            marginLeft: 5,
            alignItems: 'center',
          }}
        >
          <CheckBox
            style={{ backgroundColor: colors.secondaryContainer }}
            status={userDetails?.isSendOffersAndNews}
            onPress={() =>
              handleChangeText(
                'isSendOffersAndNews',
                !userDetails?.isSendOffersAndNews,
              )
            }
          />
          <Text variant="titleLarge" color={colors.textPrimary}>
            {t('AUTH.CHECKBOX2')}
          </Text>
        </Flex>
        <Button
          style={{ backgroundColor: colors.primary, marginTop: 32 }}
          onPress={() => {}}
          label={t('PROFILE_SETTINGS.SAVE')}
          labelVariant="titleLarge"
          labelStyle={{ color: colors.textPrimary }}
        />
        <Flex direction="column" style={{ marginTop: 32 }}>
          <Text variant="titleLarge">
            {t('PROFILE_SETTINGS.ACCOUNT_DELETION')}
          </Text>
          <Button
            style={{
              backgroundColor: colors.errorContainer,
              marginTop: 16,
              marginBottom: 40,
            }}
            onPress={() => {}}
            label={t('PROFILE_SETTINGS.DELETE_BUTTON')}
            labelVariant="titleLarge"
            labelStyle={{ color: colors.textPrimary }}
          />
        </Flex>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
export default MobileView
