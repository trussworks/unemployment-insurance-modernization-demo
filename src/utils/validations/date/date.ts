import i18n from 'i18n/i18n'
import { number, object } from 'yup'

type DateInput = {
  month: number
  day: number
  year: number
}

export const isValidDate = ({ month, day, year }: DateInput) => {
  if (isNaN(month) || isNaN(day) || isNaN(year)) {
    // TODO: These will never be NaN according to the typescript definitions.
    //       If it is possible to pass things like empty strings or undefined
    //       values, the type definition will need to be updated
    return false
  }

  const monthIndex = month - 1
  const parsedDate = new Date(year, monthIndex, day)

  const monthMatches = parsedDate.getMonth() === monthIndex
  const dayMatches = parsedDate.getDate() === day
  const yearMatches = parsedDate.getFullYear() === year

  return monthMatches && dayMatches && yearMatches
}

export const yupDate = object({
  month: number().required(
    i18n.t('components:dateInput.month.errors.required')
  ),
  day: number().required(i18n.t('components:dateInput.day.errors.required')),
  year: number().required(i18n.t('components:dateInput.year.errors.required')),
}).test({
  name: 'isValidDate',
  message: i18n.t('components:dateInput.errors.invalid'),
  test: (value: DateInput) => {
    if (value.month && value.day && value.year) {
      return isValidDate({
        month: value.month,
        day: value.day,
        year: value.year,
      })
    }
    return true
  },
})
