import React, { useCallback, useState } from 'react'
import { Icon } from '@libs/native-icons'
import { Drawer, Text } from '@libs/components'

import { TouchableOpacity, View } from 'react-native'
import { BlurWidget } from '@libs/blurwidget'
import { Layout } from '@libs/container'
import { spacing } from '@libs/theme'
import { ShareComponentProps } from '.'
import { useTheme } from 'react-native-paper'

const externalOpen = (URL: string) => window.open(URL, '_blank', 'noopener')

const iconList = {
  facebook: {
    name: 'SocialFacebook',
    e: (l: string) =>
      externalOpen(`https://www.facebook.com/sharer/sharer.php?u=${l}`),
  },
  twitter: {
    name: 'SocialTwitter',
    e: (l: string, t: string) =>
      externalOpen(`https://twitter.com/intent/tweet?text=${t}&url=${l}`),
  },
  whatsapp: {
    name: 'SocialWhatsapp',
    e: (l: string, t: string) =>
      externalOpen(`https://api.whatsapp.com/send?text=${t} ${l}`),
  },
  reddit: {
    name: 'SocialReddit',
    e: (l: string, t: string) =>
      externalOpen(`https://www.reddit.com/submit?url=${l}&title=${t}`),
  },
  telegram: {
    name: 'SocialTelegram',
    e: (l: string, t: string) =>
      externalOpen(`https://telegram.me/share/msg?url=${l}&text=${t}`),
  },
  linkedin: {
    name: 'SocialLinkedin',
    e: (l: string, t: string, ti: string) =>
      externalOpen(
        `https://www.linkedin.com/shareArticle?mini=true&url=${l}&title=${ti}&summary=${t}`,
      ),
  },
  mail: {
    name: 'SocialGmail',
    e: (l: string, t: string) => externalOpen(`mailto:?body=${l}&subject=${t}`),
  },
  copy: {
    name: 'SocialCopy',
    e: (l: string) => navigator?.clipboard?.writeText(decodeURIComponent(l)),
  },
}

export const ShareComponent = (props: ShareComponentProps) => {
  const { children, data = {}, onClick, onPress, isExternalLink } = props

  const theme: any = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = useCallback(() => setIsOpen(true), [])
  const onClose = useCallback(() => setIsOpen(false), [])

  let url: any = ''

  if (data?.appUrl) {
    url = isExternalLink
      ? data?.appUrl
      : `${data?.appUrl}/${data?.pathName}/${data?.params.eventId}`
  }

  const options = {
    title: data?.title || 'Izzo',
    text: data?.text,
    url,
  }

  const handleOnIconClicked = (e: any) => {
    onClick && onClick() // callback
    e(encodeURIComponent(url), data.text, data.title)
    onClose()
  }

  const handleOnClick = useCallback(async () => {
    if (window.navigator.share) {
      try {
        await window.navigator.share(options)
        props.onClick()
      } catch (e) {
        console.warn(e)
      }
    } else {
      onOpen()
    }
  }, [options])

  return (
    <>
      <TouchableOpacity
        onPress={onPress ? () => onPress() : () => handleOnClick()}
      >
        <View>{children}</View>
      </TouchableOpacity>
      {isOpen && (
        <Drawer
          showDrawer={isOpen}
          setShowDrawer={onClose}
          showBackground={<BlurWidget variant="blur80" onPress={onClose} />}
        >
          <Layout>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {Object?.values(iconList)?.map((value) => {
                if (value?.name === 'SocialCopy') {
                  return (
                    <TouchableOpacity
                      style={{ margin: spacing.spacing4 }}
                      onPress={() => {
                        // copy(data, isExternalLink)
                        onClick()
                        onClose()
                      }}
                    >
                      <Icon name={value.name} width={60} height={60} />
                    </TouchableOpacity>
                  )
                }
                return (
                  <TouchableOpacity
                    style={{ margin: spacing.spacing4 }}
                    onPress={() => handleOnIconClicked(value?.e)}
                  >
                    <Icon name={value.name} width={60} height={60} />
                  </TouchableOpacity>
                )
              })}
            </View>
          </Layout>
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.backgroundSurface2,
              padding: spacing.spacing4,
              marginTop: spacing.spacing4,
              alignItems: 'center',
            }}
            onPress={onClose}
          >
            <Text variant="functional1">Close</Text>
          </TouchableOpacity>
        </Drawer>
      )}
    </>
  )
}
