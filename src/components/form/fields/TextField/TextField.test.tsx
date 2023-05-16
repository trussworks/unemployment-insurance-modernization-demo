import { yupResolver } from '@hookform/resolvers/yup'
import { render, screen, within } from '@testing-library/react'
import { Button, Form } from '@trussworks/react-uswds'
import { ComponentProps } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { boolean, object } from 'yup'

import { noop } from '../../../../helpers/noop/noop'
import TextField from './TextField'

describe('TextField', () => {
  const NAME = 'textField'
  const LABEL = 'label'
  const TYPE = 'text'
  const ERROR_MESSAGE = 'This field is required.'

  const renderYesNoQuestion = (
    props?: Omit<ComponentProps<typeof TextField>, 'name' | 'label' | 'type'>,
    initialValue: boolean | undefined = undefined
  ) => {
    const WrappedInput = () => {
      const schema = object({
        [NAME]: boolean().required(ERROR_MESSAGE),
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
    const prefix = within(formGroup).queryByTestId('InputPrefix')
    const suffix = within(formGroup).queryByTestId('InputSuffix')

    const queryForErrorMessage = () =>
      within(formGroup).queryByText(ERROR_MESSAGE)

    return {
      formGroup,
      label,
      hint,
      textInput,
      prefix,
      suffix,
      queryForErrorMessage,
    }
  }

  it('renders without error', () => {
    const { label, hint, textInput, prefix, suffix, queryForErrorMessage } =
      renderYesNoQuestion()

    const errorMessage = queryForErrorMessage()

    expect(label).toHaveTextContent(LABEL)
    expect(label).toHaveClass('usa-label')
    expect(textInput).toHaveClass('usa-input')
    expect(textInput).toHaveAttribute('type', TYPE)
    expect(hint).not.toBeInTheDocument()
    expect(errorMessage).not.toBeInTheDocument()
    expect(prefix).not.toBeInTheDocument()
    expect(suffix).not.toBeInTheDocument()
  })

  it('allows a custom label class to be passed in', () => {
    const { label } = renderYesNoQuestion({ labelClassName: 'customClass' })

    expect(label).toHaveClass('usa-label')
    expect(label).toHaveClass('customClass')
  })

  it('can show hints', () => {
    const { hint } = renderYesNoQuestion({ hint: 'a hint!' })

    expect(hint).toBeInTheDocument()
    expect(hint).toHaveClass('usa-hint')
    expect(hint).toHaveTextContent('a hint!')
  })

  it('can have a prefix', () => {
    const inputPrefix = <span>Prefix</span>
    const { prefix, suffix } = renderYesNoQuestion({ inputPrefix })

    expect(prefix).toBeInTheDocument()
    expect(prefix).toHaveTextContent('Prefix')
    expect(suffix).not.toBeInTheDocument()
  })

  it('can have a suffix', () => {
    const inputSuffix = <span>Suffix</span>
    const { prefix, suffix } = renderYesNoQuestion({ inputSuffix })

    expect(prefix).not.toBeInTheDocument()
    expect(suffix).toBeInTheDocument()
    expect(suffix).toHaveTextContent('Suffix')
  })
})
