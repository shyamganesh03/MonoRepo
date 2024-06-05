import React from 'react'
import { RadioButton, Text } from '@libs/components'
import { TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Icon } from '@libs/native-icons'
import MobileContainer from '../../../../../libs/container/MobileContainer'
import { ShimmerPlaceholder } from '@libs/skeletons'

const MobileView = ({
  languageOptions,
  selectedLanguage,
  handleSelection,
}: any) => {
  const { colors } = useTheme()

  return (
    <MobileContainer style={{ paddingVertical: 20 }}>
      {selectedLanguage
        ? languageOptions?.map((language: any) => {
            const isSelectedLanguage = language?.code === selectedLanguage
            return (
              <TouchableOpacity
                style={{
                  padding: 16,
                  borderRadius: 16,
                  backgroundColor: colors.onSecondaryContainer,
                  marginBottom: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 10,
                }}
                key={language?.code}
                onPress={() => handleSelection(language?.code)}
              >
                <Icon name={language?.code} width={24} height={24} />
                <View style={[isSelectedLanguage ? {} : {}, { flex: 1 }]}>
                  <Text variant="titleMedium">
                    {language.label} ({language?.code})
                  </Text>
                </View>

                <RadioButton
                  size={30}
                  activeState={isSelectedLanguage}
                  color={colors.primary}
                  onPress={() => handleSelection(language?.code)}
                />
              </TouchableOpacity>
            )
          })
        : [...Array(2)].map(() => (
            <ShimmerPlaceholder
              style={{
                marginVertical: 10,
                borderRadius: 16,
                height: 50,
                width: '100%',
              }}
            />
          ))}
    </MobileContainer>
  )
}

export default MobileView
