import { yupResolver } from '@hookform/resolvers/yup'
import { render, screen, within } from '@testing-library/react'
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
    expect(monthInput).toBeInTheDocument()
    expect(dayInput).toBeInTheDocument()
    expect(yearInput).toBeInTheDocument()
    expect(hint).not.toBeInTheDocument()
    expect(queryForMonthRequiredErrorMessage()).not.toBeInTheDocument()
    expect(queryForDayRequiredErrorMessage()).not.toBeInTheDocument()
    expect(queryForYearRequiredErrorMessage()).not.toBeInTheDocument()
    expect(queryForDateInvalidErrorMessage()).not.toBeInTheDocument()
  })

  it('renders with a hint', () => {
    const hintText = 'this is an important date'
    const { hint } = renderDateInputField({ hint: hintText })

    expect(hint).toBeInTheDocument()
    expect(hint).toHaveTextContent(hintText)
  })
})
