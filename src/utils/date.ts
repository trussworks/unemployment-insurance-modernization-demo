export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const formatTimestamp = (timestamp: Date) => {
  return `${timestamp.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })}, ${timestamp.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: undefined,
  })}`
}
