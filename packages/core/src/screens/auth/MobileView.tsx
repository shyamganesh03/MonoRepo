import React from 'react'
import { Image, Flex } from '@libs/components'
import { MobileContainer } from '@libs/container'
import { Izzo } from 'assets'
import { useTheme } from 'react-native-paper'

const MobileView: React.FC = ({ renderComponent }: any) => {
  const { colors } = useTheme<any>()

  return (
    <MobileContainer
      hasKeyBoard
      style={{ flex: 1, paddingHorizontal: 32, paddingVertical: 64 }}
    >
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
  )
}

export default MobileView
