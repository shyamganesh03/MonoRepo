type RequestOptions = {
  method: string
  payload?: any
  selectedFilters?: Record<string, string>
  blogPost?: boolean
}

type FetchResponse = Response | any

const noAuthCall = async (
  url: string,
  options: RequestOptions,
): Promise<FetchResponse> => {
  try {
    const baseUrl = options.blogPost
      ? 'https://www.izzo-app.com'
      : 'https://api.izzo-app.com'
    const queryString = options.selectedFilters
      ? `?${new URLSearchParams(options.selectedFilters).toString()}`
      : ''
    const requestOptions: RequestInit = {
      method: options.method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options.payload),
    }

    const response = await fetch(
      `${baseUrl}/${url}${queryString}`,
      requestOptions,
    )

    if (!response.ok) {
      return response
    }

    try {
      return await response.json()
    } catch {
      return response
    }
  } catch (error) {
    console.error('Error in noAuthCall:', error)
    throw error
  }
}

export const getAllEvents = async () => noAuthCall('event', { method: 'GET' })

export const getGenres = async () => noAuthCall('genre', { method: 'GET' })

export const getBlogPosts = async () =>
  noAuthCall('_next/data/Ben4SLcxvhvzm_DOV0XN2/blog.json?slug=blog', {
    method: 'GET',
    blogPost: true,
  })

export const getEventDetails = async (eventName: string) => {
  try {
    return await noAuthCall(`event/${eventName}`, { method: 'GET' })
  } catch (error) {
    console.error('Error in getEventDetails:', error)
    throw error
  }
}

export const getRegions = async () => noAuthCall('region', { method: 'GET' })

export const getFilteredEvents = async (
  selectedFilters: Record<string, string>,
) => noAuthCall('event/filtered', { method: 'GET', selectedFilters })
