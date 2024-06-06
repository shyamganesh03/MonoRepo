import { useTheme } from 'react-native-paper'
import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from '@libs/components'
import { Icon } from '@libs/native-icons'
import { spacing } from '@libs/theme'

const BlogCard = ({
  blogPost,
  titleNumberOfLines,
  handleBlogPage,
}: {
  blogPost: any
  titleNumberOfLines: number
  handleBlogPage: any
}) => {
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
    <TouchableOpacity
      onPress={() => handleBlogPage(blogPost?.link?.cached_url)}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: blogPost?.backgroundColor?.value },
        ]}
      >
        <View style={[styles.titleContainer]}>
          <View
            style={{
              maxWidth: blogPost?.isNew || blogPost?.isPinned ? '68%' : '100%',
            }}
          >
            <Text color={blogPost?.textColor?.value} variant="headlineSmall">
              {blogPost?.title}
            </Text>
          </View>

          {(blogPost?.isPinned || blogPost?.isNew) && (
            <View style={[styles.badge, { backgroundColor: colors.primary }]}>
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
                <View style={styles.badgeText}>
                  <Text
                    variant="labelLarge"
                    textTransform="uppercase"
                    color={colors.textPrimary}
                  >
                    {blogPost?.isPinned
                      ? blogPost?.pinnedText
                      : blogPost?.isNew
                        ? blogPost?.newText
                        : null}
                  </Text>
                </View>
              ) : null}
            </View>
          )}
        </View>
        <View style={styles.contentContainer}>
          <Text
            color={blogPost?.textColor?.value}
            variant="labelLarge"
            numberOfLines={titleNumberOfLines}
          >
            {blogPost?.description}
          </Text>
          <View style={{ marginTop: spacing.spacing3 }}>
            <Text color={blogPost?.textColor?.value} variant="labelLarge">
              {formatDate(blogPost?.date)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 16,
    gap: 3,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.spacing2,
  },

  badge: {
    position: 'absolute',
    right: -18,
    top: -13,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    textTransform: 'uppercase',
    marginLeft: 20,
  },
  contentContainer: {
    flexDirection: 'column',
  },
})

export default BlogCard
