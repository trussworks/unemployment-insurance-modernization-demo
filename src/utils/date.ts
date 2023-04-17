type DateInput = {
  month: number
  day: number
  year: number
}

export const isValidDate = ({ month, day, year }: DateInput) => {
  if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
    const dateIsValid = Date.parse(`${year}-${month}-${day}`)
    return dateIsValid ? true : false
  }
  return true
}
