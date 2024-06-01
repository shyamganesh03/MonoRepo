import { TouchableOpacity } from 'react-native'
import React from 'react'
import Share from 'react-native-share'

export interface ShareComponentProps {
  children: any
  data?: any
  onClick?: Function
  onPress?: Function
  isExternalLink?: boolean
  style?: any
  itemID: string
}

export const ShareComponent = (props: ShareComponentProps) => {
  const {
    children,
    data = {},
    onClick = () => {},
    onPress,
    isExternalLink,
    style,
  } = props

  const search = (obj: any) => {
    const str = []
    for (const p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(obj[p]))
      }
    return str.join('&')
  }

  const handleShare = async () => {
    const url = isExternalLink
      ? data?.appUrl
      : `${data?.appUrl}/${data?.pathName}/${search(data?.params)}`

    const options = {
      title: data?.title || 'Izzo',
      subject: data?.text || '',
      message: url,
    }
    await Share.open(options)
      .then(() => {
        onClick()
        console.log('Share Successfully')
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  return (
    <TouchableOpacity
      onPress={async () => {
        if (onPress) {
          await onPress()
        } else {
          await handleShare()
        }
      }}
      style={style}
    >
      {children}
    </TouchableOpacity>
  )
}
