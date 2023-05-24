import { yupResolver } from '@hookform/resolvers/yup'
import {
  act,
  createEvent,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button, Form } from '@trussworks/react-uswds'
import { noop } from 'helpers/noop/noop'
import { ComponentProps } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupDate } from 'utils/validations/date/date'
import { object } from 'yup'

import i18n from '../../../../i18n/i18n'
import { DateInputField } from './DateInputField'

describe('DateInputField', () => {
  const NAME = 'date'
  const LEGEND = 'Please enter a date'

  const MONTH_REQUIRED_ERROR_MESSAGE = i18n.t(
    'components:dateInput.month.errors.required'
  )
  const DAY_REQUIRED_ERROR_MESSAGE = i18n.t(
    'components:dateInput.day.errors.required'
  )
  const YEAR_REQUIRED_ERROR_MESSAGE = i18n.t(
    'components:dateInput.year.errors.required'
  )
  const DATE_INVALID_ERROR_MESSAGE = i18n.t(
    'components:dateInput.errors.invalid'
  )

  const renderDateInputField = (
    props?: Omit<ComponentProps<typeof DateInputField>, 'name' | 'label'>,
    initialValue?: string
  ) => {
    const WrappedInput = () => {
      const schema = object({
        [NAME]: yupDate,
      })
      const hookFormMethods = useForm({
        defaultValues: {
          [NAME]: initialValue,
        },
        resolver: yupResolver(schema),
      })

      const { handleSubmit } = hookFormMethods

      return (
        <FormProvider {...hookFormMethods}>
          <Form onSubmit={handleSubmit(noop)}>
            <DateInputField name={NAME} legend={LEGEND} {...props} />
            <Button type="submit">Submit</Button>
          </Form>
        </FormProvider>
      )
    }

    render(<WrappedInput />)

    const dateInputField = screen.getByRole('group', { name: LEGEND })
    const legend = within(dateInputField).getByText(LEGEND)
    const monthInput = within(dateInputField).getByLabelText('Month')
    const dayInput = within(dateInputField).getByLabelText('Day')
    const yearInput = within(dateInputField).getByLabelText('Year')
    const hint = within(dateInputField).queryByTestId('date-input-hint')
    const queryForMonthRequiredErrorMessage = () =>
      within(dateInputField).queryByText(MONTH_REQUIRED_ERROR_MESSAGE)
    const queryForDayRequiredErrorMessage = () =>
      within(dateInputField).queryByText(DAY_REQUIRED_ERROR_MESSAGE)
    const queryForYearRequiredErrorMessage = () =>
      within(dateInputField).queryByText(YEAR_REQUIRED_ERROR_MESSAGE)
    const queryForDateInvalidErrorMessage = () =>
      within(dateInputField).queryByText(DATE_INVALID_ERROR_MESSAGE)
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    return {
      dateInputField,
      legend,
      monthInput,
      dayInput,
      yearInput,
      hint,
      queryForMonthRequiredErrorMessage,
      queryForDayRequiredErrorMessage,
      queryForYearRequiredErrorMessage,
      queryForDateInvalidErrorMessage,
      submitButton,
    }
  }

  it('renders without errors', () => {
    const {
      dateInputField,
      legend,
      monthInput,
      dayInput,
      yearInput,
      hint,
      queryForMonthRequiredErrorMessage,
      queryForDayRequiredErrorMessage,
      queryForYearRequiredErrorMessage,
      queryForDateInvalidErrorMessage,
    } = renderDateInputField()

    expect(dateInputField).toBeInTheDocument()
    expect(legend).toHaveTextContent(LEGEND)
    expect(monthInput).toHaveValue('')
    expect(dayInput).toHaveValue('')
    expect(yearInput).toHaveValue('')
    expect(hint).not.toBeInTheDocument()
    expect(queryForMonthRequiredErrorMessage()).not.toBeInTheDocument()
    expect(queryForDayRequiredErrorMessage()).not.toBeInTheDocument()
    expect(queryForYearRequiredErrorMessage()).not.toBeInTheDocument()
    expect(queryForDateInvalidErrorMessage()).not.toBeInTheDocument()
  })

  it('sets focus on month when entire field invalid', async () => {
    const user = userEvent.setup()
    const { monthInput, submitButton } = renderDateInputField()
    await act(() => user.click(submitButton))
    expect(monthInput).toHaveFocus()
  })

  it('renders invalid event properly', async () => {
    const { monthInput, dayInput, yearInput } = renderDateInputField()
    const invalidMonthEvent = createEvent.invalid(monthInput)
    await act(() => fireEvent(monthInput, invalidMonthEvent))
    expect(invalidMonthEvent.defaultPrevented).toBeTruthy()

    const invalidDayEvent = createEvent.invalid(dayInput)
    await act(() => fireEvent(dayInput, invalidDayEvent))
    expect(invalidDayEvent.defaultPrevented).toBeTruthy()

    const invalidYearEvent = createEvent.invalid(yearInput)
    await act(() => fireEvent(yearInput, invalidYearEvent))
    expect(invalidYearEvent.defaultPrevented).toBeTruthy()
  })

  it('renders with a hint', () => {
    const hintText = 'this is an important date'

    const { hint } = renderDateInputField({ hint: hintText })

    expect(hint).toBeInTheDocument()
    expect(hint).toHaveTextContent(hintText)
  })

  it.todo('takes an initial value')

  it('allows user input', async () => {
    const user = userEvent.setup()

    const { monthInput, dayInput, yearInput, submitButton } =
      renderDateInputField()

    await act(() => user.type(monthInput, '08'))

    expect(monthInput).toHaveValue('08')

    await act(() => user.type(dayInput, '18'))

    expect(dayInput).toHaveValue('18')

    await act(() => user.type(yearInput, '1920'))

    expect(yearInput).toHaveValue('1920')

    await act(() => user.click(submitButton))

    expect(submitButton).toHaveFocus()
  })

  it('prevents non numeric entry', async () => {
    const user = userEvent.setup()

    const { monthInput } = renderDateInputField()

    await act(() => {
      user.type(monthInput, 'xx')
    })

    expect(monthInput).toHaveValue('')
  })

  it('takes a custom onChange handler', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()

    const { monthInput, dayInput, yearInput } = renderDateInputField({
      onChange: handleChange,
    })

    await act(() => user.type(monthInput, '08'))

    expect(handleChange).toHaveBeenCalledTimes(2)

    await act(() => user.type(dayInput, '18'))

    expect(handleChange).toHaveBeenCalledTimes(4)

    await act(() => user.type(yearInput, '1920'))

    expect(handleChange).toHaveBeenCalledTimes(8)
  })
})
