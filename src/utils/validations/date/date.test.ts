import { ValidationError } from 'yup'

import { isValidDate, yupDate } from './date'

describe('isValidDate', () => {
  it('returns true for a valid, parseable date', () => {
    const dateInput = { month: 2, day: 29, year: 2020 }

    const result = isValidDate(dateInput)

    expect(result).toEqual(true)
  })

  it('returns false for an invalid date', () => {
    const dateInput = { month: 2, day: 29, year: 2019 }

    const result = isValidDate(dateInput)

    expect(result).toEqual(false)
  })
})

describe('yupDate', () => {
  it('resolves valid dates', async () => {
    const value = { month: 2, day: 29, year: 2020 }

    const result = yupDate.validate(value)

    await expect(result).resolves.toBe(value)
  })

  it('rejects invalid dates', async () => {
    const value = { month: 2, day: 29, year: 2019 }

    const result = yupDate.validate(value)

    await expect(result).rejects.toMatchObject(
      new ValidationError('Date is invalid')
    )
  })

  it('rejects if month is missing', async () => {
    const value = { day: 29, year: 2019 }

    const result = yupDate.validate(value)

    await expect(result).rejects.toMatchObject({
      errors: ['Month is required'],
    })
  })

  it('rejects if day is missing', async () => {
    const value = { month: 2, year: 2019 }

    const result = yupDate.validate(value)

    await expect(result).rejects.toMatchObject({
      errors: ['Day is required'],
    })
  })

  it('rejects if year is missing', async () => {
    const value = { month: 2, day: 29 }

    const result = yupDate.validate(value)

    await expect(result).rejects.toMatchObject({
      errors: ['Year is required'],
    })
  })
})
