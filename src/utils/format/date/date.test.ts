import { formatDate, formatTimestamp } from './date'

describe('formatDate', () => {
  it('formats to the correct locale string format', () => {
    const unformatted = new Date(2020, 0, 31)

    const formatted = formatDate(unformatted)

    expect(formatted).toEqual('Jan 31, 2020')
  })
})

describe('formatTimestamp', () => {
  it('formats to the correct locale string format in the AM', () => {
    const unformatted = new Date(2020, 0, 31, 11, 30)

    const formatted = formatTimestamp(unformatted)

    expect(formatted).toEqual('Jan 31, 2020, 11:30 AM')
  })

  it('formats to the correct locale string format in the PM', () => {
    const unformatted = new Date(2020, 0, 31, 12, 30)

    const formatted = formatTimestamp(unformatted)

    expect(formatted).toEqual('Jan 31, 2020, 12:30 PM')
  })

  it('ignores seconds', () => {
    const unformatted = new Date(2020, 0, 31, 12, 30, 35)

    const formatted = formatTimestamp(unformatted)

    expect(formatted).toEqual('Jan 31, 2020, 12:30 PM')
  })
})
