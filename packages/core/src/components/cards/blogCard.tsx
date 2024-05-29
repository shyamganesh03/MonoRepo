import { useTheme } from 'react-native-paper'
import { Card, Text } from '@libs/components'
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Icon } from '@libs/native-icons'

const BlogCard = ({ blogPost }: any) => {
  const { colors } = useTheme()

  const formatDate = (blogDate: string) => {
    const [datePart] = blogDate?.split(' ')
    const [year, month, day] = datePart.split('-')
    return `${day}.${month}.${year}`
  }

  const showStatus = blogPost?.isPinned || blogPost?.isNew

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        borderRadius: 16,
        marginBottom: 11,
      }}
    >
      <Card
        title={blogPost?.title}
        titleStyle={{
          fontWeight: '900',
          fontSize: 20,
          color: `${blogPost?.textColor?.value}`,
          width: blogPost?.isNew || blogPost?.isPinned ? '80%' : '100%',
        }}
        right={() =>
          showStatus ? (
            <View
              style={{
                position: 'absolute',
                right: -10,
                top: -46,
                backgroundColor: colors.primary,
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderBottomLeftRadius: 16,
                borderTopRightRadius: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                // columnGap: 10,
                width: 124,
              }}
            >
              {blogPost?.isPinned ? (
                <Icon
                  name="BookmarkIcon"
                  fill={colors.textPrimary}
                  width={16}
                  height={16}
                />
              ) : null}
              {(showStatus && blogPost?.pinnedText?.length > 0) ||
              (showStatus && blogPost?.isNew.length > 0) ? (
                <Text
                  variant="utilityBold2"
                  style={{ textTransform: 'uppercase', marginLeft: 20 }}
                  color={colors.textPrimary}
                >
                  {blogPost?.isPinned
                    ? blogPost?.pinnedText
                    : blogPost?.isNew
                      ? blogPost?.newText
                      : null}
                </Text>
              ) : null}
            </View>
          ) : null
        }
        titleNumberOfLines={0}
        style={{
          backgroundColor: `${blogPost?.backgroundColor?.value}`,
          width: '100%',
          padding: 10,
        }}
        content={
          <View style={{ flexDirection: 'column' }}>
            <Text
              color={`${blogPost?.textColor?.value}`}
              style={{ lineHeight: 14.5 }}
              variant="utilityBold2"
            >
              {blogPost?.description}
            </Text>
            <Text
              style={{ marginTop: 8 }}
              color={`${blogPost?.textColor?.value}`}
            >
              {formatDate(blogPost?.date)}
            </Text>
          </View>
        }
      />
    </TouchableOpacity>
  )
}

export default BlogCard
