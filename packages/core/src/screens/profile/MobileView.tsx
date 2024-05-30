import React from 'react'
import {
  Button,
  Flex,
  Image,
  Text,
  TextInput,
  ToggleSwitch,
} from '@libs/components'
import { ScrollView, TouchableOpacity } from 'react-native'
import { MobileContainer } from '@libs/container'
import { Izzo } from 'assets'
import { Icon } from '@libs/native-icons'
import { useTheme } from 'react-native-paper'
import { spacing } from '@libs/theme'
import { useTranslation } from 'react-i18next'
import LinearGradient from 'react-native-linear-gradient'

const MobileView = ({
  drunkMode,
  email,
  userDetails,
  setDrunkMode,
  setEmail,
  handlePress,
  handleLogin,
}: any) => {
  const { t } = useTranslation()
  const { colors } = useTheme<any>()

  return (
    <ScrollView>
      <MobileContainer hasKeyBoard>
        <Flex
          direction="row"
          style={{ justifyContent: 'center', marginBottom: spacing.spacing7 }}
        >
          <Image imageUrl={Izzo} size={150} resizeMode="contain" />
        </Flex>
        <Flex direction="column" style={{ gap: spacing.spacing7 }}>
          {userDetails ? (
            <ProfileTab
              heading={userDetails.name}
              description={userDetails.email}
              handlePress={handlePress}
              isUserCard
            />
          ) : (
            <Flex direction="column" style={{ gap: spacing.spacing7 }}>
              <TextInput
                placeholder={t('INPUT_TEXT.EMAIL_PLACEHOLDER')}
                outlineStyle={{ borderWidth: 0 }}
                onChangeText={(value: string) => setEmail(value)}
                value={email}
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
                colors={colors.gradient.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[0.6, 0.4]}
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
          )}
          <Flex direction="column">
            <ProfileTab
              heading={t('PROFILE.SAVED_EVENTS')}
              leftIconName="BookmarkIcon"
              rightIconName="ArrowRightIcon"
              handlePress={handlePress}
            />
          </Flex>
          <Flex direction="column" style={{ gap: spacing.spacing3 }}>
            <ProfileTab
              heading={t('PROFILE.PUSH_NOTIFICATION')}
              leftIconName="BellIcon"
              rightIconName="ArrowRightIcon"
              handlePress={handlePress}
            />
            <ProfileTab
              heading={t('PROFILE.PROFILE_SETTINGS')}
              leftIconName="UserIcon"
              rightIconName="ArrowRightIcon"
              handlePress={handlePress}
            />
          </Flex>
          <Flex
            style={{
              backgroundColor: colors.onPrimaryContainer,
              paddingHorizontal: spacing.spacing5,
              paddingVertical: spacing.spacing3,
              borderRadius: spacing.spacing5,
              justifyContent: 'space-between',
            }}
            direction="row"
          >
            <Flex
              direction="row"
              style={{ alignItems: 'center', columnGap: 20 }}
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
              handlePress={handlePress}
            />
            <ProfileTab
              heading={t('PROFILE.SUPPORT')}
              rightIconName="SignOutSquareIcon"
              handlePress={handlePress}
            />
            <ProfileTab
              heading={t('PROFILE.AGB')}
              rightIconName="SignOutSquareIcon"
              handlePress={handlePress}
            />
            <ProfileTab
              heading={t('PROFILE.PRIVACY')}
              rightIconName="SignOutSquareIcon"
              handlePress={handlePress}
            />
          </Flex>

          {userDetails && (
            <Button
              onPress={() => {}}
              mode="contained"
              label={t('BUTTON.SIGN_OUT')}
              labelStyle={{ color: colors.textPrimary }}
              labelVariant="bodyBold1"
              style={{ backgroundColor: colors.secondaryContainer }}
            />
          )}
        </Flex>
      </MobileContainer>
    </ScrollView>
  )
}

const ProfileTab = ({
  leftIconName,
  rightIconName,
  isUserCard,
  heading,
  description,
  handlePress = () => {},
}: any) => {
  const { colors } = useTheme<any>()
  return (
    <TouchableOpacity onPress={handlePress}>
      <Flex
        direction="row"
        style={{
          paddingHorizontal: spacing.spacing5,
          paddingVertical: isUserCard ? spacing.spacing7 : spacing.spacing5,
          borderRadius: spacing.spacing5,
          justifyContent: 'space-between',
          backgroundColor: colors.onPrimaryContainer,
        }}
      >
        {leftIconName && (
          <Icon name={leftIconName} color={colors.textPrimary} />
        )}
        <Flex direction="column">
          {heading && (
            <Text variant={isUserCard ? 'heading2' : 'functional1'}>
              {heading}
            </Text>
          )}
          {description && <Text variant="body1">{description}</Text>}
        </Flex>
        {rightIconName && (
          <Icon
            name={rightIconName}
            color={colors.placeHolderTextColor}
            height={20}
            width={20}
          />
        )}
      </Flex>
    </TouchableOpacity>
  )
}
export default MobileView
