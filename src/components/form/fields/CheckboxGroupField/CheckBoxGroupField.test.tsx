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
import { FormProvider, useForm } from 'react-hook-form'
import { array, mixed, object } from 'yup'

import { CheckboxGroupField } from './CheckboxGroupField'

const QUESTION = 'What is your favorite fruit?'
const NAME = 'favoriteFruit'
const ERROR_MESSAGE = 'This field is required.'
const OPTIONS = [
  {
    label: 'Mango',
    value: 'mango',
  },
  {
    label: 'Banana',
    value: 'banana',
  },
  {
    label: 'Kiwi',
    value: 'kiwi',
  },
]

describe('CheckBoxGroupField', () => {
  const renderCheckBoxGroupField = () => {
    const WrappedInput = () => {
      const schema = object({
        [NAME]: array()
          .of(mixed().oneOf([...OPTIONS.map((value) => value)]))
          .min(1, ERROR_MESSAGE)
          .required(),
      })
      const hookFormMethods = useForm({
        resolver: yupResolver(schema),
      })

      const { handleSubmit } = hookFormMethods

      return (
        <FormProvider {...hookFormMethods}>
          <Form onSubmit={handleSubmit(noop)}>
            <CheckboxGroupField
              legend={QUESTION}
              name={NAME}
              options={OPTIONS}
            />
            <Button type="submit">Submit</Button>
          </Form>
        </FormProvider>
      )
    }

    render(<WrappedInput />)

    const question = screen.getByRole('group', { name: QUESTION })
    const checkbox1 = screen.getByRole('checkbox', { name: OPTIONS[0].label })
    const checkbox1Label = screen.getByText(OPTIONS[0].label)
    const checkbox2 = screen.getByRole('checkbox', { name: OPTIONS[1].label })
    const checkbox2Label = screen.getByText(OPTIONS[1].label)
    const checkbox3 = screen.getByRole('checkbox', { name: OPTIONS[2].label })
    const checkbox3Label = screen.getByText(OPTIONS[2].label)
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    const queryForErrorMessage = () => screen.queryByText(ERROR_MESSAGE)

    return {
      question,
      checkbox1,
      checkbox1Label,
      checkbox2,
      checkbox2Label,
      checkbox3,
      checkbox3Label,
      submitButton,
      queryForErrorMessage,
    }
  }

  it('Renders without error', () => {
    const {
      question,
      checkbox1,
      checkbox1Label,
      checkbox2,
      checkbox2Label,
      checkbox3,
      checkbox3Label,
    } = renderCheckBoxGroupField()

    expect(question).toBeInTheDocument()
    expect(question).toHaveTextContent(QUESTION)
    expect(checkbox1).toBeInTheDocument()
    expect(checkbox1Label).toHaveTextContent(OPTIONS[0].label)
    expect(checkbox2).toBeInTheDocument()
    expect(checkbox2Label).toHaveTextContent(OPTIONS[1].label)
    expect(checkbox3).toBeInTheDocument()
    expect(checkbox3Label).toHaveTextContent(OPTIONS[2].label)
  })

  it('Renders an error message and styles when invalid', async () => {
    const user = userEvent.setup()

    const { submitButton, queryForErrorMessage } = renderCheckBoxGroupField()
    expect(queryForErrorMessage()).not.toBeInTheDocument()

    await act(() => user.click(submitButton))

    await waitFor(() => {
      expect(queryForErrorMessage()).toBeInTheDocument()
      expect(queryForErrorMessage()).toHaveTextContent(ERROR_MESSAGE)
    })
  })

  it('Allows the user to select an answer', async () => {
    const user = userEvent.setup()

    const { checkbox1, checkbox2, checkbox3 } = renderCheckBoxGroupField()

    expect(checkbox1).not.toBeChecked()
    expect(checkbox2).not.toBeChecked()
    expect(checkbox3).not.toBeChecked()

    await act(() => user.click(checkbox1))

    expect(checkbox1).toBeChecked()

    await act(() => user.click(checkbox1))

    expect(checkbox1).not.toBeChecked()

    await act(() => user.click(checkbox2))

    expect(checkbox2).toBeChecked()
    expect(checkbox3).not.toBeChecked()
  })

  it('Renders invalid event properly', () => {
    const { checkbox1 } = renderCheckBoxGroupField()
    const invalidEvent = createEvent.invalid(checkbox1)
    fireEvent(checkbox1, invalidEvent)
    expect(invalidEvent.defaultPrevented).toBeTruthy()
  })
})
