export function dateformat(dateString: string) {
  const splittedDate = dateString?.split('T')[0].split('-')
  return splittedDate?.reverse().join('.') || ''
}

export function getDayName(dateString: string) {
  const date = new Date(dateString)

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const dayIndex = date.getDay()

  const dayName = dayNames[dayIndex]

  return dayName
}
