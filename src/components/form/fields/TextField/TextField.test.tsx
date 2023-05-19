import { yupResolver } from '@hookform/resolvers/yup'
import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button, Form } from '@trussworks/react-uswds'
import { noop } from 'helpers/noop/noop'
import { ComponentProps } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { object, string } from 'yup'

import TextField from './TextField'

describe('TextField', () => {
  const NAME = 'textField'
  const LABEL = 'label'
  const TYPE = 'text'
  const ERROR_MESSAGE = 'This field is required.'

  const renderTextField = (
    props?: Omit<ComponentProps<typeof TextField>, 'name' | 'label' | 'type'>,
    initialValue?: string
  ) => {
    const WrappedInput = () => {
      const schema = object({
        [NAME]: string().required(ERROR_MESSAGE),
      })
      const hookFormMethods = useForm({
        shouldFocusError: false,
        defaultValues: {
          [NAME]: initialValue,
        },
        resolver: yupResolver(schema),
      })

      const { handleSubmit } = hookFormMethods

      return (
        <FormProvider {...hookFormMethods}>
          <Form onSubmit={handleSubmit(noop)}>
            <TextField name={NAME} label={LABEL} type={TYPE} {...props} />
            <Button type="submit">Submit</Button>
          </Form>
        </FormProvider>
      )
    }

    render(<WrappedInput />)

    const formGroup = screen.getByTestId('formGroup')
    const label = within(formGroup).getByText(LABEL)
    const textInput = within(formGroup).getByRole('textbox', { name: LABEL })
    const hint = within(formGroup).queryByTestId('text-field-hint')
    const inputGroup = within(formGroup).queryByTestId('text-field-input-group')
    const prefix = inputGroup
      ? within(inputGroup).queryByTestId('InputPrefix')
      : null
    const suffix = inputGroup
      ? within(inputGroup).queryByTestId('InputSuffix')
      : null

    const queryForErrorMessage = () =>
      within(formGroup).queryByText(ERROR_MESSAGE)
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    return {
      formGroup,
      label,
      hint,
      textInput,
      inputGroup,
      prefix,
      suffix,
      submitButton,
      queryForErrorMessage,
    }
  }

  it('renders without error', () => {
    const {
      label,
      hint,
      textInput,
      inputGroup,
      prefix,
      suffix,
      queryForErrorMessage,
    } = renderTextField()

    const errorMessage = queryForErrorMessage()

    expect(label).toHaveTextContent(LABEL)
    expect(label).toHaveClass('usa-label')
    expect(label).toHaveProperty('htmlFor', NAME)
    expect(textInput).toHaveClass('usa-input')
    expect(textInput).toHaveAttribute('type', TYPE)
    expect(hint).not.toBeInTheDocument()
    expect(errorMessage).not.toBeInTheDocument()
    expect(inputGroup).not.toBeInTheDocument()
    expect(prefix).not.toBeInTheDocument()
    expect(suffix).not.toBeInTheDocument()
  })

  it('renders with an initial value', () => {
    const { textInput } = renderTextField({}, 'initialValue')

    expect(textInput).toHaveValue('initialValue')
  })

  it('allows a custom label class to be passed in', () => {
    const { label } = renderTextField({ labelClassName: 'customClass' })

    expect(label).toHaveClass('usa-label')
    expect(label).toHaveClass('customClass')
  })

  it('can show hints', () => {
    const { hint } = renderTextField({ hint: 'a hint!' })

    expect(hint).toBeInTheDocument()
    expect(hint).toHaveClass('usa-hint')
    expect(hint).toHaveTextContent('a hint!')
  })

  it('can have a prefix', () => {
    const inputPrefix = <span>Prefix</span>
    const { inputGroup, prefix, suffix } = renderTextField({ inputPrefix })

    expect(inputGroup).toBeInTheDocument()
    expect(prefix).toBeInTheDocument()
    expect(prefix).toHaveTextContent('Prefix')
    expect(suffix).not.toBeInTheDocument()
  })

  it('can have a suffix', () => {
    const inputSuffix = <span>Suffix</span>
    const { inputGroup, prefix, suffix } = renderTextField({ inputSuffix })

    expect(inputGroup).toBeInTheDocument()
    expect(prefix).not.toBeInTheDocument()
    expect(suffix).toBeInTheDocument()
    expect(suffix).toHaveTextContent('Suffix')
  })

  it('can have a custom Id', () => {
    const hintText = 'yes means yes and no means no'

    const { textInput, label, hint } = renderTextField({
      id: 'custom-id',
      hint: hintText,
    })

    expect(textInput).toHaveAttribute('id', 'custom-id')
    expect(label).toHaveProperty('htmlFor', 'custom-id')
    expect(hint).toHaveAttribute('id', 'custom-id.hint')
  })

  it('allows input', async () => {
    const user = userEvent.setup()

    const { textInput } = renderTextField()

    await act(() => user.type(textInput, 'answer'))

    expect(textInput).toHaveValue('answer')
  })

  it('accepts a custom onChange handler', async () => {
    const user = userEvent.setup()

    const onChange = jest.fn()
    const { textInput } = renderTextField({ onChange })

    await act(() => user.type(textInput, 'a'))

    expect(textInput).toHaveValue('a')
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('accepts a custom onBlur handler', async () => {
    const user = userEvent.setup()

    const onBlur = jest.fn()
    const { textInput } = renderTextField({ onBlur })

    await act(() => user.click(textInput))

    expect(onBlur).toHaveBeenCalledTimes(0)

    await act(() => user.tab())

    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  it('renders an error message and styles when invalid', async () => {
    const user = userEvent.setup()

    const { textInput, submitButton, queryForErrorMessage } = renderTextField()

    expect(queryForErrorMessage()).not.toBeInTheDocument()

    await act(() => user.click(submitButton))

    await waitFor(() => {
      expect(queryForErrorMessage()).toBeInTheDocument()
      expect(textInput).toHaveClass('usa-input--error')
    })
  })
})
