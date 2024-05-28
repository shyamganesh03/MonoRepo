const apiUrl = 'https://api.izzo-app.com'

export const noAuthCall = async (url: any, options: any) => {
  try {
    const requestOptions = {
      method: options?.method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(options?.payload),
    }

    const response = await fetch(`${apiUrl}/${url}`, requestOptions)

    if (!response?.ok) {
      return response
    }

    try {
      const data = await response?.json()
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

export async function getEventDetails(eventName: string) {
  try {
    const eventData = await noAuthCall(`event/${eventName}`, { method: 'GET' })
    return eventData
  } catch (error) {
    console.log({ error })
  }
}
