import { noop } from 'helpers/noop/noop'

describe('noop helper', () => {
  it("doesn't do anything", () => {
    const result = noop()
    expect(result).toBeUndefined()
  })
})
