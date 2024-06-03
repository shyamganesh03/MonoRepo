import { useTheme } from 'react-native-paper'
import { Card, Text } from '@libs/components'
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Icon } from '@libs/native-icons'
import { spacing } from '@libs/theme'

const BlogCard = ({ blogPost }: { blogPost: any }) => {
  const { colors } = useTheme<any>()

  const formatDate = (blogDate: string) => {
    const [datePart] = blogDate?.split(' ')
    const [year, month, day] = datePart.split('-')
    return `${day}.${month}.${year}`
  }
  const pinTitle = blogPost?.isPinned
    ? blogPost?.pinnedText
    : blogPost?.isNew
      ? blogPost?.newText
      : ''

  return (
    <TouchableOpacity>
      <Card
        title={`${blogPost?.title}`}
        titleVariant="headlineSmall"
        titleStyle={{
          color: `${blogPost?.textColor?.value}`,
          maxWidth: blogPost?.isNew || blogPost?.isPinned ? '68%' : '100%',
          marginBottom:
            blogPost?.isNew || blogPost?.isPinned ? spacing.spacing4 : 0,
          lineHeight: 20,
        }}
        right={() =>
          (blogPost?.isPinned || blogPost?.isNew) && (
            <View
              style={{
                position: 'absolute',
                right: -16,
                top: -48,
                backgroundColor: colors.primary,
                paddingHorizontal: spacing.spacing5,
                paddingVertical: spacing.spacing3,
                borderBottomLeftRadius: spacing.spacing5,
                borderTopRightRadius: spacing.spacing5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:
                  pinTitle && blogPost?.isPinned ? 'center' : 'flex-start',
                width: 124,
              }}
            >
              {blogPost?.isPinned && (
                <Icon
                  name="BookmarkIcon"
                  fill={colors.textPrimary}
                  width={16}
                  height={16}
                />
              )}
              {(blogPost?.isPinned && blogPost?.pinnedText?.length > 0) ||
              (blogPost?.isNew && blogPost?.isNew.length > 0) ? (
                <View style={{ marginLeft: 20 }}>
                  <Text
                    variant="labelLarge"
                    color={colors.textPrimary}
                    textTransform="uppercase"
                  >
                    {pinTitle}
                  </Text>
                </View>
              ) : null}
            </View>
          )
        }
        titleNumberOfLines={0}
        style={{
          backgroundColor: `${blogPost?.backgroundColor?.value}`,
          width: '100%',
          paddingHorizontal: spacing.spacing5,
          paddingVertical: spacing.spacing4,
          borderRadius: spacing.spacing5,
        }}
        content={
          <View style={{ flexDirection: 'column', gap: spacing.spacing5 }}>
            <Text color={`${blogPost?.textColor?.value}`} variant="labelLarge">
              {blogPost?.description}
            </Text>

            <Text color={`${blogPost?.textColor?.value}`} variant="labelLarge">
              {formatDate(blogPost?.date)}
            </Text>
          </View>
        }
      />
    </TouchableOpacity>
  )
}

export default BlogCard
