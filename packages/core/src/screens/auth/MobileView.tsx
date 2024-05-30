import {
  Button,
  Text,
  Loader,
  IconButton,
  ProgressBar,
  Wrap,
  Image,
  Flex,
} from '@libs/components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@libs/native-icons'
import { useTheme } from 'react-native-paper'
import { MobileContainer } from '@libs/container'
import { ScrollView, View } from 'react-native'
import Login from '../../components/auth/login'
import LoginAndSignUp from '../../components/auth/loginAndSignUp'
import Registration from '../../components/auth/registration'
import { Izzo } from 'assets'

const MobileView = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const [state, setState] = useState(1)
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <MobileContainer hasKeyBoard>
          <Flex direction="row" style={{ justifyContent: 'center' }}>
            <Image
              imageUrl={Izzo}
              size={150}
              resizeMode="contain"
              style={{ marginBottom: 40 }}
            />
          </Flex>

          {state === 1 ? (
            <LoginAndSignUp setState={setState} />
          ) : (
            <Registration />
          )}
          {/* <Login/>   */}
        </MobileContainer>
      </ScrollView>
    </View>
  )
}

export default MobileView
