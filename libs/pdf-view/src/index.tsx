import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import PDFView from 'react-native-view-pdf'
import { Button, Flex, IconButton, Text } from '@libs/components'
import { t } from 'i18next'
import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import RNFetchBlob from 'rn-fetch-blob'

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

  async function downloadPdf() {
    const fileName = resources?.url?.includes('agb')
      ? 'IzzoAGBs.pdf'
      : 'IzzoPrivacyPolicy.pdf'
    try {
      const { config, fs } = RNFetchBlob
      const downloads = fs.dirs.DownloadDir
      const filePath = `${downloads}/${fileName}`
      const exists = await fs.exists(filePath)

      if (exists) {
        await fs.unlink(filePath)
      }

      await config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: filePath,
          description: 'Downloading PDF document',
          mediaScannable: true,
        },
      }).fetch('GET', resources?.url)
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.textSecondary }}>
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
          <Text variant="labelMedium">{t('IZZ0')}</Text>
          <Text variant="labelMedium" numberOfLines={1}>
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

      <Button
        label="Download PDF"
        labelStyle={{
          color: colors.textPrimary,
        }}
        style={{ paddingVertical: 5 }}
        onPress={() => downloadPdf()}
      />

      {isPageCountVisible && (
        <View style={styles.pageCount}>
          <Text color={colors.textPrimary} variant="labelMedium">
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
