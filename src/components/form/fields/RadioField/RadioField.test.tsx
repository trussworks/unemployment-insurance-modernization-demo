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

import { RadioField } from './RadioField'

const NAME = 'favoriteBeverage'
const QUESTION = 'What is your favorite beverage?'
const OPTIONS = [
  { label: 'Coffee', value: 'coffee' },
  { label: 'Tea', value: 'tea' },
  { label: 'Soda', value: 'soda' },
]
const ERROR_MESSAGE = 'This field is required.'

describe('RadioField', () => {
  const renderRadioField = (
    props?: Omit<
      ComponentProps<typeof RadioField>,
      'name' | 'options' | 'legend'
    >,
    initialValue?: string
  ) => {
    const WrappedInput = () => {
      const schema = object({
        [NAME]: string().required(ERROR_MESSAGE),
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
            <RadioField
              options={OPTIONS}
              name={NAME}
              legend={QUESTION}
              {...props}
            />
            <Button type="submit">Submit</Button>
          </Form>
        </FormProvider>
      )
    }

    render(<WrappedInput />)

    const legend = screen.getByText(QUESTION)
    const fieldset = screen.getByRole('group', { name: QUESTION })
    const coffee = screen.getByRole('radio', { name: OPTIONS[0].label })
    const tea = screen.getByRole('radio', { name: OPTIONS[1].label })
    const soda = screen.getByRole('radio', { name: OPTIONS[2].label })
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    const queryForErrorMessage = () => screen.queryByText(ERROR_MESSAGE)
    const hint = (hintText: string) => screen.queryByText(hintText)

    return {
      legend,
      fieldset,
      coffee,
      tea,
      soda,
      submitButton,
      queryForErrorMessage,
      hint,
    }
  }

  it('Renders without error', () => {
    const { legend, fieldset, coffee, tea, soda } = renderRadioField()
    expect(legend).toBeInTheDocument()
    expect(legend).toHaveTextContent(QUESTION)
    expect(fieldset).toBeInTheDocument()
    expect(coffee).toBeInTheDocument()
    expect(tea).toBeInTheDocument()
    expect(soda).toBeInTheDocument()
  })

  it('Changes value on user selection', async () => {
    const user = userEvent.setup()

    const { coffee, tea, soda } = renderRadioField({})

    expect(coffee).not.toBeChecked()
    expect(tea).not.toBeChecked()
    expect(soda).not.toBeChecked()

    await act(() => user.click(coffee))

    expect(coffee).toBeChecked()
    expect(tea).not.toBeChecked()
    expect(soda).not.toBeChecked()

    await act(() => user.click(tea))

    expect(coffee).not.toBeChecked()
    expect(tea).toBeChecked()
    expect(soda).not.toBeChecked()
  })

  it('Renders an error message and styles when invalid', async () => {
    const user = userEvent.setup()

    const { fieldset, submitButton, queryForErrorMessage } = renderRadioField()

    expect(queryForErrorMessage()).not.toBeInTheDocument()

    await act(() => user.click(submitButton))

    await waitFor(() => {
      expect(queryForErrorMessage()).toBeInTheDocument()
      expect(fieldset).toHaveClass('errorLegend')
    })
  })

  it('Takes a custom onChange handler', async () => {
    const user = userEvent.setup()

    const handleChange = jest.fn()

    const { coffee, tea } = renderRadioField({
      onChange: handleChange,
    })

    await act(() => user.click(coffee))

    expect(handleChange).toHaveBeenCalledTimes(1)

    await act(() => user.click(tea))

    expect(handleChange).toHaveBeenCalledTimes(2)
  })

  it('Takes a custom onBlur handler', async () => {
    const user = userEvent.setup()

    const handleBlur = jest.fn()

    const { coffee, tea } = renderRadioField({
      onBlur: handleBlur,
    })

    await act(() => user.click(coffee))
    await act(() => user.click(tea))

    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it('Renders invalid event properly', () => {
    const { coffee } = renderRadioField()

    const invalidEvent = createEvent.invalid(coffee)
    fireEvent(coffee, invalidEvent)
    expect(invalidEvent.defaultPrevented).toBeTruthy()
  })

  it('Can render with a hint', () => {
    const hintText = 'This is my hint'

    const { hint } = renderRadioField({ hint: hintText })

    expect(hint(hintText)).toBeInTheDocument()
    expect(hint(hintText)).toHaveTextContent(hintText)
  })
})
