type RequestOptions = {
  method: string
  payload?: any
  selectedFilters?: Record<string, string>
  blogPost?: boolean
}

type FetchResponse = Response | any

const apiCall = async (
  url: string,
  options: RequestOptions,
): Promise<FetchResponse> => {
  try {
    const baseUrl = options.blogPost
      ? 'https://www.monoRepo-app.com'
      : 'https://api.monoRepo-app.com'
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
