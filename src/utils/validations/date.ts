import i18n from 'i18n/i18n'
import { number, object } from 'yup'

type DateInput = {
  month: number
  day: number
  year: number
}

export const isValidDate = ({ month, day, year }: DateInput) => {
  if (isNaN(month) || isNaN(day) || isNaN(year)) {
    return false
  }
  const parsedDate = Date.parse(`${year}-${month}-${day}`)
  return !!parsedDate
}

export const yupDate = () =>
  object({
    month: number().required(),
    day: number().required(),
    year: number().min(4).required(),
  }).test({
    name: 'isValidDate',
    message: i18n.t('components:dateInput.error.invalid'),
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
