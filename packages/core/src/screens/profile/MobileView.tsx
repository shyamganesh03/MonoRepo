import React from 'react'
import {
  Button,
  Flex,
  Image,
  Text,
  TextInput,
  ToggleSwitch,
} from '@libs/components'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'
import { Izzo } from 'assets'
import { Icon } from '@libs/native-icons'
import { useTheme } from 'react-native-paper'
import { spacing } from '@libs/theme'
import { useTranslation } from 'react-i18next'
import {
  agbUrl,
  faqUrl,
  privacyPolicyUrl,
  supportUrl,
} from '../../utils/redirectUrl'

const ProfileTab = ({
  leftIconName,
  rightIconName,
  isUserCard,
  heading,
  description,
  style,
  handlePress = () => {},
}: any) => {
  const { colors } = useTheme<any>()
  const hasLeftIcon = !!leftIconName
  const hasRightIcon = !!rightIconName

  return (
    <TouchableOpacity onPress={handlePress}>
      <Flex
        direction={'row'}
        style={[
          {
            paddingHorizontal: 16,
            paddingVertical: isUserCard ? 20 : 10,
            borderRadius: spacing.spacing5,
            justifyContent: 'space-between',
            backgroundColor: colors.onPrimaryContainer,
          },
          style,
        ]}
      >
        <Flex
          direction={!isUserCard ? 'row' : 'column'}
          style={[
            { columnGap: 8 },
            !isUserCard ? { alignItems: 'center' } : {},
          ]}
        >
          {hasLeftIcon && (
            <Icon name={leftIconName} color={colors.textPrimary} />
          )}
          {heading && (
            <Text variant={isUserCard ? 'headlineMedium' : 'titleMedium'}>
              {heading}
            </Text>
          )}
          {description && <Text variant="bodyMedium">{description}</Text>}
        </Flex>
        {hasRightIcon && (
          <Icon
            name={rightIconName}
            color={colors.placeHolderTextColor}
            height={24}
            width={24}
          />
        )}
      </Flex>
    </TouchableOpacity>
  )
}

const MobileView = ({
  drunkMode,
  email,
  userDetails,
  setDrunkMode,
  setEmail,
  handlePress,
  handleLogin,
  handleNavigation,
  handleSignOut,
}: any) => {
  const { t } = useTranslation()
  const { colors } = useTheme<any>()

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
      >
        <Flex
          direction="row"
          style={{
            justifyContent: 'center',
            paddingHorizontal: 16,
          }}
        >
          <Image imageUrl={Izzo} size={80} resizeMode="contain" />
        </Flex>
        <Flex direction="column">
          {userDetails ? (
            <ProfileTab
              heading={userDetails.name}
              description={userDetails.email}
              handlePress={handlePress}
              isUserCard
              style={{ marginBottom: 32, marginTop: 10 }}
            />
          ) : (
            <View style={{ marginTop: 16 }}>
              <Flex direction="column" style={{ rowGap: 17 }}>
                <Text variant="headlineMedium">{t('AUTH.TITLE')}</Text>
                <Text variant="titleSmall">{t('AUTH.SUBTITLE')}</Text>
              </Flex>
              <Flex direction="column" style={{ marginTop: 32, rowGap: 5 }}>
                <TextInput
                  placeholder={t('INPUT_TEXT.EMAIL_PLACEHOLDER')}
                  outlineStyle={{ borderWidth: 0 }}
                  onChangeText={(value: string) => setEmail(value)}
                  value={email}
                  dense={true}
                  contentStyle={{ fontSize: 16, fontWeight: '500' }}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <Icon name="AtIcon" color={colors.onSurfaceVariant} />
                      )}
                      style={{ position: 'absolute', left: -20 }}
                    />
                  }
                />
              </Flex>
              <Button
                onPress={() => handleLogin()}
                mode="contained"
                label={t('BUTTON.Login_And_SIGN_UP')}
                labelVariant="titleLarge"
                labelStyle={{ color: colors.textPrimary }}
                isLinearGradient
                gradientColors={colors.gradient.primary}
                style={{ marginTop: 18, marginBottom: 32 }}
              />
            </View>
          )}
          <ProfileTab
            heading={t('PROFILE.SAVED_EVENTS')}
            leftIconName="BookmarkIcon"
            rightIconName={userDetails?.email ? 'ArrowRightIcon' : 'LockIcon'}
            handlePress={() =>
              userDetails?.email ? handleNavigation('savedEvents') : {}
            }
            style={{ marginBottom: 32 }}
          />
          <Flex
            direction="column"
            style={{ marginBottom: 32, rowGap: !userDetails ? 0 : 8 }}
          >
            <ProfileTab
              heading={t('PROFILE.PUSH_NOTIFICATION')}
              leftIconName="BellIcon"
              rightIconName="ArrowRightIcon"
              handlePress={() => handleNavigation('notificationSettings')}
            />
            {userDetails?.email ? (
              <ProfileTab
                heading={t('PROFILE.PROFILE_SETTINGS')}
                leftIconName="UserIcon"
                rightIconName="ArrowRightIcon"
                handlePress={() =>
                  userDetails?.email ? handleNavigation('profileSettings') : {}
                }
              />
            ) : null}
          </Flex>
          <Flex
            style={{
              backgroundColor: colors.onPrimaryContainer,
              paddingHorizontal: spacing.spacing5,
              paddingVertical: spacing.spacing3,
              borderRadius: spacing.spacing5,
              justifyContent: 'space-between',
              marginBottom: 32,
            }}
            direction="row"
          >
            <Flex
              direction="row"
              style={{ alignItems: 'center', columnGap: 8 }}
            >
              <Icon name="CocktailIcon" width={24} height={24} />
              <Text variant="titleMedium" color={colors.textPrimary}>
                {t('PROFILE.DRUNK_MODE')}
              </Text>
            </Flex>
            <ToggleSwitch
              activeState={drunkMode}
              setActiveState={setDrunkMode}
            />
          </Flex>
          <Flex direction="column" style={{ gap: spacing.spacing3 }}>
            <ProfileTab
              heading={t('PROFILE.FAQ')}
              rightIconName="SignOutSquareIcon"
              handlePress={() => handleNavigation(faqUrl, true)}
            />
            <ProfileTab
              heading={t('PROFILE.SUPPORT')}
              rightIconName="SignOutSquareIcon"
              handlePress={() => handleNavigation(supportUrl, true)}
            />
            <ProfileTab
              heading={t('PROFILE.AGB')}
              rightIconName="SignOutSquareIcon"
              handlePress={() => handleNavigation(agbUrl, true)}
            />
            <ProfileTab
              heading={t('PROFILE.PRIVACY')}
              rightIconName="SignOutSquareIcon"
              handlePress={() => handleNavigation(privacyPolicyUrl, true)}
            />
          </Flex>
          {userDetails && (
            <Button
              onPress={() => handleSignOut()}
              mode="contained"
              label={t('BUTTON.SIGN_OUT')}
              labelStyle={{ color: colors.textPrimary }}
              labelVariant="titleLarge"
              style={{
                backgroundColor: colors.secondaryContainer,
                marginTop: 32,
              }}
            />
          )}
        </Flex>
        <View style={{ marginBottom: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default MobileView
