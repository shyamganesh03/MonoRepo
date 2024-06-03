import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import PDFView from 'react-native-view-pdf'
import { Flex, IconButton, Text } from '@libs/components'
import { t } from 'i18next'
import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const PdfView = (props: any) => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isPageCountVisible, setIsPageCountVisible] = useState(false)
  const { colors } = useTheme<any>()
  const resources = {
    url: props?.uri,
  }
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          alignItems: 'center',
          paddingVertical: 12,
          columnGap: 10,
          backgroundColor: colors.textSecondary,
        }}
      >
        <IconButton
          name="CloseRoundIcon"
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Flex direction="column">
          <Text style={{ color: colors.textPrimary }} variant="body2">
            {t('IZZ0')}
          </Text>
          <Text
            style={{ color: colors.textPrimary }}
            variant="body2"
            numberOfLines={1}
          >
            {resources?.url}
          </Text>
        </Flex>
      </View>

      <PDFView
        fadeInDuration={10.0}
        style={{ flex: 1 }}
        resource={resources?.url}
        resourceType="url"
        onError={(error) => console.log('Cannot render PDF', error)}
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
        onPageChanged={(page, numberOfPages) => {
          setCurrentPage(page + 1)
          setTotalPages(numberOfPages)
          setIsPageCountVisible(true)
        }}
      />

      {isPageCountVisible && (
        <View style={styles.pageCount}>
          <Text style={{ color: colors.textPrimary }} variant="body2">
            {currentPage} / {totalPages}
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  pageCount: {
    position: 'absolute',
    right: 20,
    top: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    borderRadius: 30,
    paddingVertical: 5,
  },
})

export default PdfView
