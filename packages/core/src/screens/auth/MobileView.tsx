import { Image, Flex } from '@libs/components'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { MobileContainer } from '@libs/container'
import { ScrollView, View } from 'react-native'
import LoginAndSignUp from '../../components/auth/LoginAndSignUp'
import Registration from '../../components/auth/Registration'
import { Izzo } from 'assets'

const MobileView = () => {
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
