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
import { boolean, object } from 'yup'

import CheckboxField from './CheckboxField'

describe('CheckBoxField', () => {
  const ERROR_MESSAGE = 'This field is required.'

  const renderCheckBoxField = (
    props: ComponentProps<typeof CheckboxField>,
    initialValue: boolean | undefined = undefined
  ) => {
    const WrappedInput = () => {
      const schema = object({
        [props.name]: boolean().required(ERROR_MESSAGE),
      })
      const hookFormMethods = useForm({
        defaultValues: {
          [props.name]: initialValue,
        },
        resolver: yupResolver(schema),
      })
      const { handleSubmit } = hookFormMethods

      return (
        <FormProvider {...hookFormMethods}>
          <Form onSubmit={handleSubmit(noop)}>
            <CheckboxField {...props} />
            <Button type="submit">Submit</Button>
          </Form>
        </FormProvider>
      )
    }

    render(<WrappedInput />)

    const checkBoxField = screen.getByRole('checkbox', { name: props.name })
    const label = screen.getByText(props.label as string)
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    const queryForErrorMessage = () => screen.queryByText(ERROR_MESSAGE)

    return {
      checkBoxField,
      label,
      submitButton,
      queryForErrorMessage,
    }
  }

  it('Renders without error', () => {
    const { checkBoxField, label, queryForErrorMessage } = renderCheckBoxField({
      name: 'coffee',
      label: 'coffee',
    })
    const errorMessage = queryForErrorMessage()

    expect(checkBoxField).toBeInTheDocument()
    expect(label).toBeInTheDocument()
    expect(errorMessage).not.toBeInTheDocument()
  })

  it('Renders with an initial value', () => {
    const { checkBoxField } = renderCheckBoxField(
      {
        id: 'coffee',
        name: 'coffee',
        label: 'coffee',
      },
      true
    )

    expect(checkBoxField).toBeChecked()
  })

  it('Renders with custom label', () => {
    const customLabel = 'tea'

    const { label } = renderCheckBoxField({
      name: customLabel,
      label: customLabel,
    })

    expect(label).toHaveTextContent(customLabel)
  })

  it('Allows the user to select the checkbox', async () => {
    const customLabel = 'tea'

    const user = userEvent.setup()

    const { checkBoxField } = renderCheckBoxField({
      id: customLabel,
      name: customLabel,
      label: customLabel,
    })

    expect(checkBoxField).not.toBeChecked()

    await act(() => user.click(checkBoxField))

    expect(checkBoxField).toBeChecked()
  })

  it('Takes a custom onChange handler', async () => {
    const customLabel = 'tea'

    const user = userEvent.setup()

    const handleChange = jest.fn()

    const { checkBoxField } = renderCheckBoxField({
      name: customLabel,
      label: customLabel,
      onChange: handleChange,
    })

    await act(() => user.click(checkBoxField))

    expect(handleChange).toHaveBeenCalledTimes(1)

    await act(() => user.click(checkBoxField))

    expect(handleChange).toHaveBeenCalledTimes(2)
  })

  it('Renders an error message and styles when invalid', async () => {
    const user = userEvent.setup()

    const customLabel = 'tea'
    const handleChange = jest.fn()

    const { submitButton, queryForErrorMessage } = renderCheckBoxField({
      name: customLabel,
      label: customLabel,
      onChange: handleChange,
    })

    expect(queryForErrorMessage()).not.toBeInTheDocument()

    await act(() => user.click(submitButton))

    await waitFor(() => {
      expect(queryForErrorMessage()).toBeInTheDocument()
      expect(queryForErrorMessage()).toHaveTextContent(ERROR_MESSAGE)
    })
  })

  it('Renders invalid event properly', () => {
    const customLabel = 'tea'

    const { checkBoxField } = renderCheckBoxField({
      name: customLabel,
      label: customLabel,
    })

    const invalidEvent = createEvent.invalid(checkBoxField)
    fireEvent(checkBoxField, invalidEvent)
    expect(invalidEvent.defaultPrevented).toBeTruthy()
  })
})
