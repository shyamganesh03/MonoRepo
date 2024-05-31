import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Image, Flex } from '@libs/components'
import { MobileContainer } from '@libs/container'
import LoginAndSignUp from '../../components/auth/LoginAndSignUp'
import Registration from '../../components/auth/Registration'
import { Izzo } from 'assets'

const MobileView: React.FC = () => {
  const { colors } = useTheme()
  const [isLogin, setIsLogin] = useState(true)

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <MobileContainer hasKeyBoard>
          <Flex direction="row" justifyContent="center">
            <Image
              imageUrl={Izzo}
              size={150}
              resizeMode="contain"
              style={{ marginBottom: 40 }}
            />
          </Flex>
          {isLogin ? (
            <LoginAndSignUp setState={setIsLogin} />
          ) : (
            <Registration />
          )}
        </MobileContainer>
      </ScrollView>
    </View>
  )
}

export default MobileView
