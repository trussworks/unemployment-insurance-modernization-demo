const DATETIME_LOCALE = 'en-US'

export const formatDate = (date: Date) => {
  return date.toLocaleDateString(DATETIME_LOCALE, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const formatTimestamp = (timestamp: Date) => {
  return `${timestamp.toLocaleDateString(DATETIME_LOCALE, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })}, ${timestamp.toLocaleTimeString(DATETIME_LOCALE, {
    hour: 'numeric',
    minute: 'numeric',
    second: undefined,
  })}`
}
