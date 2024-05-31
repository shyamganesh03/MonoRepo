export const noAuthCall = async (url: string, options: any) => {
  try {
    const baseUrl = options?.blogPost
      ? 'https://www.izzo-app.com'
      : 'https://api.izzo-app.com'

    const queryString = options?.selectedFilters
      ? '?' + new URLSearchParams(options.selectedFilters).toString()
      : ''

    const requestOptions = {
      method: options?.method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options?.payload),
    }

    const response = await fetch(
      `${baseUrl}/${url}${queryString}`,
      requestOptions,
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error in noAuthCall for ${url}: ${error}`)
    throw error
  }
}

export const getAllEvents = async () =>
  await noAuthCall('event', {
    method: 'GET',
  })

export const getGenres = async () =>
  await noAuthCall('genre', {
    method: 'GET',
  })

export const getBlogPosts = async () =>
  await noAuthCall('_next/data/Ben4SLcxvhvzm_DOV0XN2/blog.json?slug=blog', {
    method: 'GET',
    blogPost: true,
  })

export const getEventDetails = async (eventName: string) =>
  await noAuthCall(`event/${eventName}`, { method: 'GET' })

export const getRegions = async () =>
  await noAuthCall('region', { method: 'GET' })

export const getFilteredEvents = async (selectedFilters: any) =>
  await noAuthCall('event/filtered', { method: 'GET', selectedFilters })
