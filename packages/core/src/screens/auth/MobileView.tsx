import React from 'react'
import { ScrollView } from 'react-native'
import { Image, Flex } from '@libs/components'
import { MobileContainer } from '@libs/container'
import { Izzo } from 'assets'
import { useTheme } from 'react-native-paper'

const MobileView: React.FC = ({ renderComponent }: any) => {
  const { colors } = useTheme<any>()

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: colors.background }}
    >
      <MobileContainer hasKeyBoard style={{ flex: 1 }}>
        <Flex
          direction="row"
          style={{
            justifyContent: 'center',
            backgroundColor: colors.background,
          }}
        >
          <Image
            imageUrl={Izzo}
            size={150}
            resizeMode="contain"
            style={{ marginBottom: 40 }}
          />
        </Flex>
        {renderComponent}
      </MobileContainer>
    </ScrollView>
  )
}

export default MobileView
