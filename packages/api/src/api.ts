export const noAuthCall = async (url: any, options: any) => {
  try {
    const izzoAppUrl = !options?.blogPost
      ? 'https://api.izzo-app.com'
      : 'https://www.izzo-app.com'

    const requestOptions = {
      method: options?.method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(options?.payload),
    }

    const response = await fetch(`${izzoAppUrl}/${url}`, requestOptions)

    if (!response?.ok) {
      return response
    }

    try {
      const data = await response.json()

      if (data) {
        return data
      }
    } catch (error) {
      return response
    }
  } catch (error) {
    console.log({ error })
    return error
  }
}

export const getAllEvents = async () =>
  noAuthCall('event', {
    method: 'GET',
  })

export const getGenres = async () =>
  noAuthCall('genre', {
    method: 'GET',
  })
export const getBlogPosts = async () =>
  await noAuthCall('_next/data/Ben4SLcxvhvzm_DOV0XN2/blog.json?slug=blog', {
    method: 'GET',
    blogPost: true,
  })
