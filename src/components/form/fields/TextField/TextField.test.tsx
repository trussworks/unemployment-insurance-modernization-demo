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

    const queryForErrorMessage = () =>
      within(formGroup).queryByText(ERROR_MESSAGE)

    return {
      formGroup,
      label,
      hint,
      textInput,
      queryForErrorMessage,
    }
  }

  it('renders without error', () => {
    const { label, hint, textInput, queryForErrorMessage } =
      renderYesNoQuestion()

    const errorMessage = queryForErrorMessage()

    expect(label).toHaveTextContent(LABEL)
    expect(textInput).toHaveClass('usa-input')
    expect(textInput).toHaveAttribute('type', TYPE)
    expect(hint).not.toBeInTheDocument()
    expect(errorMessage).not.toBeInTheDocument()
  })
})
