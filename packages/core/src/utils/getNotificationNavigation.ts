//@ts-ignore
export const getNotificationNavigation = async (data, navigation) => {
  if (data?.type === 'EVENT_DETAIL') {
    navigation('eventDetail', {
      eventId: data.id,
    })
  }
}
