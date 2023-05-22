import { yupResolver } from '@hookform/resolvers/yup'
import {
  act,
  createEvent,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button, Form } from '@trussworks/react-uswds'
import { noop } from 'helpers/noop/noop'
import { ComponentProps } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { object, string } from 'yup'

import DropdownField, { DropdownOption } from './DropdownField'

const ERROR_MESSAGE = 'This field is required.'
const NAME = 'favoriteBeverage'
const LABEL = 'What is your favorite beverage?'
const OPTIONS = [
  { label: 'Coffee', value: 'coffee' },
  { label: 'Tea', value: 'tea' },
  { label: 'Soda', value: 'soda' },
]
const OPTIONS_RECORD = {
  0: [{}, ...OPTIONS],
}
describe('DropdownField', () => {
  const renderDropdownField = (
    props?: Omit<
      ComponentProps<typeof DropdownField>,
      'name' | 'options' | 'label'
    >,
    options?: DropdownOption[] | Record<string, DropdownOption[]>
  ) => {
    const WrappedInput = () => {
      const schema = object({
        [NAME]: string().required(ERROR_MESSAGE),
      })
      const hookFormMethods = useForm({
        resolver: yupResolver(schema),
      })
      const { handleSubmit } = hookFormMethods

      return (
        <FormProvider {...hookFormMethods}>
          <Form onSubmit={handleSubmit(noop)}>
            <DropdownField
              name={NAME}
              label={LABEL}
              options={options || OPTIONS}
              {...props}
            />
            <Button type="submit">Submit</Button>
          </Form>
        </FormProvider>
      )
    }

    render(<WrappedInput />)

    const label = screen.getByText(LABEL)
    const select = screen.getByRole('combobox', { name: LABEL })
    const coffee = screen.getByRole('option', { name: OPTIONS[0].label })
    const tea = screen.getByRole('option', { name: OPTIONS[1].label })
    const soda = screen.getByRole('option', { name: OPTIONS[2].label })
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    const queryForErrorMessage = () => screen.queryByText(ERROR_MESSAGE)

    return {
      label,
      select,
      coffee,
      tea,
      soda,
      submitButton,
      queryForErrorMessage,
    }
  }

  it('Renders without error', () => {
    const { label, select, coffee, tea, soda, submitButton } =
      renderDropdownField()

    expect(label).toBeInTheDocument()
    expect(label).toHaveTextContent(LABEL)
    expect(select).toBeInTheDocument()
    expect(coffee).toBeInTheDocument()
    expect(coffee).toHaveTextContent('Coffee')
    expect(tea).toBeInTheDocument()
    expect(tea).toHaveTextContent('Tea')
    expect(soda).toBeInTheDocument()
    expect(soda).toHaveTextContent('Soda')
    expect(submitButton).toBeInTheDocument()
  })

  it('Renders with custom options', () => {
    const { label, select, coffee, tea, soda, submitButton } =
      renderDropdownField({}, OPTIONS_RECORD)

    expect(label).toBeInTheDocument()
    expect(label).toHaveTextContent(LABEL)
    expect(select).toBeInTheDocument()
    expect(coffee).toBeInTheDocument()
    expect(coffee).toHaveTextContent('Coffee')
    expect(tea).toBeInTheDocument()
    expect(tea).toHaveTextContent('Tea')
    expect(soda).toBeInTheDocument()
    expect(soda).toHaveTextContent('Soda')
    expect(submitButton).toBeInTheDocument()
  })

  it('Changes value on user selection', () => {
    const { select } = renderDropdownField()

    expect(select).toHaveValue('coffee')

    fireEvent.change(select, { target: { value: 'tea' } })

    expect(select).toHaveValue('tea')
  })

  it('Renders an error message and styles when invalid', async () => {
    const user = userEvent.setup()

    const { submitButton, queryForErrorMessage } = renderDropdownField()

    expect(queryForErrorMessage()).not.toBeInTheDocument()

    await act(() => user.click(submitButton))

    await waitFor(() => {
      expect(queryForErrorMessage()).toBeInTheDocument()
    })
  })

  it('Takes a custom onChange handler', async () => {
    const handleChange = jest.fn()

    const { select } = renderDropdownField({
      onChange: handleChange,
    })

    fireEvent.change(select, { target: { value: 'tea' } })
    expect(handleChange).toHaveBeenCalledTimes(1)

    fireEvent.change(select, { target: { value: 'coffee' } })

    expect(handleChange).toHaveBeenCalledTimes(2)
  })

  it('Takes a custom onBlur handler', async () => {
    const user = userEvent.setup()

    const handleBlur = jest.fn()

    const { select, submitButton } = renderDropdownField({
      onBlur: handleBlur,
    })

    await act(() => user.click(submitButton))
    await act(() => user.click(select))
    await act(() => user.click(submitButton))

    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it('Renders invalid event properly', () => {
    const { select } = renderDropdownField()

    const invalidEvent = createEvent.invalid(select)
    fireEvent(select, invalidEvent)
    expect(invalidEvent.defaultPrevented).toBeTruthy()
  })
})
