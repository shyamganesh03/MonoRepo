import React from 'react'
import {
  Button,
  Flex,
  Image,
  Text,
  TextInput,
  ToggleSwitch,
} from '@libs/components'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { MobileContainer } from '@libs/container'
import { Izzo } from 'assets'
import { Icon } from '@libs/native-icons'
import { useTheme } from 'react-native-paper'
import { spacing } from '@libs/theme'
import { useTranslation } from 'react-i18next'
import LinearGradient from 'react-native-linear-gradient'
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
          style={{ columnGap: 8 }}
        >
          {hasLeftIcon && (
            <Icon name={leftIconName} color={colors.textPrimary} />
          )}
          {heading && (
            <Text variant={isUserCard ? 'heading2' : 'functional1'}>
              {heading}
            </Text>
          )}
          {description && <Text variant="body1">{description}</Text>}
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
}: any) => {
  const { t } = useTranslation()
  const { colors } = useTheme<any>()

  return (
    <ScrollView>
      <MobileContainer hasKeyBoard style={{ paddingHorizontal: 16 }}>
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
              style={{ marginBottom: 32 }}
            />
          ) : (
            <View style={{ marginTop: 10 }}>
              <Flex direction="column" style={{ rowGap: 17 }}>
                <Text variant="heading2" style={{ fontWeight: '700' }}>
                  {t('AUTH.TITLE')}
                </Text>
                <Text variant="bodyCompact2" style={{ letterSpacing: 0.5 }}>
                  {t('AUTH.SUBTITLE')}
                </Text>
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
                      style={{ position: 'absolute', left: -25 }}
                    />
                  }
                />
                <LinearGradient
                  colors={['red', 'blue']}
                  start={{ x: 1, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  locations={[0.1, 0.6]}
                  style={{
                    marginTop: 14,
                    marginBottom: 32,
                    borderRadius: 16,
                  }}
                >
                  <Button
                    onPress={() => handleLogin()}
                    mode="contained"
                    label={t('BUTTON.Login_And_SIGN_UP')}
                    labelVariant="bodyBold1"
                    labelStyle={{ color: colors.textPrimary }}
                  />
                </LinearGradient>
              </Flex>
            </View>
          )}
          <ProfileTab
            heading={t('PROFILE.SAVED_EVENTS')}
            leftIconName="BookmarkIcon"
            rightIconName={userDetails?.email ? 'ArrowRightIcon' : 'LockIcon'}
            handlePress={() =>
              userDetails?.email ? handleNavigation('savedevents') : {}
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
              handlePress={() => handleNavigation('notificationsettings')}
            />
            {userDetails?.email ? (
              <ProfileTab
                heading={t('PROFILE.PROFILE_SETTINGS')}
                leftIconName="UserIcon"
                rightIconName="ArrowRightIcon"
                handlePress={() =>
                  userDetails?.email ? handleNavigation('profilesettings') : {}
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
              <Text variant="functional1" color={colors.textPrimary}>
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
              onPress={() => {}}
              mode="contained"
              label={t('BUTTON.SIGN_OUT')}
              labelStyle={{ color: colors.textPrimary }}
              labelVariant="bodyBold1"
              style={{
                backgroundColor: colors.secondaryContainer,
                marginTop: 32,
              }}
            />
          )}
        </Flex>
      </MobileContainer>
    </ScrollView>
  )
}

export default MobileView
