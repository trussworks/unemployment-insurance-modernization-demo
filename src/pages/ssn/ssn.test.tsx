import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SSN } from './ssn'

const SSN_HEADING = 'Access your records'
const SSN_LABEL = 'Social security number'
const NUMBER_TOGGLE_SHOW = 'Show number'
const ERROR_REQUIRED = 'Social Security number is required'
const ERROR_FORMAT =
  'Social Security number must be exactly 9 numbers with format 000-00-0000'

describe('SSN', () => {
  const renderSSNPage = () => {
    render(<SSN />)

    const heading = screen.getByText(SSN_HEADING)
    const ssnInputLabel = screen.getByText(SSN_LABEL)
    const ssnInput = screen.getByLabelText(SSN_LABEL)
    const numberToggle = screen.getByRole('button', {
      name: NUMBER_TOGGLE_SHOW,
    })

    const button = screen.getByRole('button', { name: 'Continue' })
    const queryForErrorMessage = (message: string) =>
      screen.queryByText(message)

    return {
      heading,
      ssnInputLabel,
      ssnInput,
      numberToggle,
      button,
      queryForErrorMessage,
    }
  }

  it('Renders without error', () => {
    const { heading, ssnInputLabel, numberToggle, button } = renderSSNPage()

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(SSN_HEADING)
    expect(ssnInputLabel).toBeInTheDocument()
    expect(ssnInputLabel).toHaveTextContent(SSN_LABEL)
    expect(numberToggle).toBeInTheDocument()
    expect(numberToggle).toHaveTextContent(NUMBER_TOGGLE_SHOW)
    expect(button).toBeInTheDocument()
  })

  it('Renders error message when no input given', async () => {
    const user = userEvent.setup()

    const { button, queryForErrorMessage } = renderSSNPage()

    expect(queryForErrorMessage(ERROR_REQUIRED)).not.toBeInTheDocument()

    await act(() => user.click(button))

    await waitFor(() => {
      expect(queryForErrorMessage(ERROR_REQUIRED)).toBeInTheDocument()
      expect(queryForErrorMessage(ERROR_REQUIRED)).toHaveTextContent(
        ERROR_REQUIRED
      )
    })
  })

  it('Renders error message when invalid format', async () => {
    const user = userEvent.setup()

    const { ssnInput, button, queryForErrorMessage } = renderSSNPage()

    expect(queryForErrorMessage(ERROR_FORMAT)).not.toBeInTheDocument()

    await act(() => user.type(ssnInput, 'xxxxxxxxx'))

    await act(() => user.click(button))

    await waitFor(() => {
      expect(queryForErrorMessage(ERROR_FORMAT)).toBeInTheDocument()
      expect(queryForErrorMessage(ERROR_FORMAT)).toHaveTextContent(ERROR_FORMAT)
    })
  })

  it('Shows the value of the hidden input when user clicks "Show number"', async () => {
    const user = userEvent.setup()

    const { ssnInput, numberToggle } = renderSSNPage()

    await act(() => user.type(ssnInput, '123456789'))

    expect(ssnInput.closest('input')?.type).toEqual('password')

    await act(() => user.click(numberToggle))

    expect(ssnInput.closest('input')?.type).toEqual('text')
  })

  it('Successfully submits the ssn', async () => {
    const user = userEvent.setup()
    const consoleSpy = jest.spyOn(console, 'log')

    const { ssnInput, button, queryForErrorMessage } = renderSSNPage()

    await act(() => user.type(ssnInput, '123456789'))
    await act(() => user.click(button))

    expect(queryForErrorMessage(ERROR_FORMAT)).not.toBeInTheDocument()
    expect(queryForErrorMessage(ERROR_REQUIRED)).not.toBeInTheDocument()

    expect(consoleSpy).toHaveBeenCalledWith({ ssn: '123456789' })
  })
})
