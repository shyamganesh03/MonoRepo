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

export function formatDate(date: string) {
  const [datePart] = date?.split(' ')
  const [year, month, day] = datePart.split('-')
  return `${day}.${month}.${year}`
}
