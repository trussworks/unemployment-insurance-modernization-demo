import { yupResolver } from '@hookform/resolvers/yup'
import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button, Form } from '@trussworks/react-uswds'
import {
  convertValueToBoolean,
  NO,
  YES,
  YesNoQuestion,
} from 'components/form/fields/YesNoQuestion/YesNoQuestion'
import { noop } from 'helpers/noop/noop'
import { ComponentProps } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { boolean, object } from 'yup'

describe('YesNoQuestion', () => {
  const NAME = 'question'
  const QUESTION = 'What is the answer?'
  const ERROR_MESSAGE = 'This field is required.'

  const renderYesNoQuestion = (
    props?: Omit<ComponentProps<typeof YesNoQuestion>, 'name' | 'question'>,
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
            <YesNoQuestion name={NAME} question={QUESTION} {...props} />
            <Button type="submit">Submit</Button>
          </Form>
        </FormProvider>
      )
    }

    render(<WrappedInput />)

    const yesLabelText = props?.yesLabel || 'Yes'
    const noLabelText = props?.noLabel || 'No'

    const yesNoQuestion = screen.getByRole('group', { name: QUESTION })
    const label = within(yesNoQuestion).getByText(QUESTION)
    const yesAnswerLabel = within(yesNoQuestion).getByText(yesLabelText)
    const yesAnswer = within(yesNoQuestion).getByRole('radio', {
      name: yesLabelText,
    })
    const noAnswerLabel = within(yesNoQuestion).getByText(noLabelText)
    const noAnswer = within(yesNoQuestion).getByRole('radio', {
      name: noLabelText,
    })
    const hint = within(yesNoQuestion).queryByTestId('yes-no-hint')
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    const queryForErrorMessage = () =>
      within(yesNoQuestion).queryByText(ERROR_MESSAGE)

    return {
      yesNoQuestion,
      label,
      yesAnswerLabel,
      yesAnswer,
      noAnswerLabel,
      noAnswer,
      hint,
      submitButton,
      queryForErrorMessage,
    }
  }

  it('Renders without error', () => {
    const {
      yesNoQuestion,
      label,
      yesAnswerLabel,
      yesAnswer,
      noAnswerLabel,
      noAnswer,
      hint,
      queryForErrorMessage,
    } = renderYesNoQuestion()

    const errorMessage = queryForErrorMessage()

    expect(yesNoQuestion).toBeInTheDocument()
    expect(label).toHaveTextContent(QUESTION)
    expect(yesAnswerLabel).toHaveTextContent('Yes')
    expect(yesAnswer).not.toBeChecked()
    expect(noAnswerLabel).toHaveTextContent('No')
    expect(noAnswer).not.toBeChecked()
    expect(hint).not.toBeInTheDocument()
    expect(errorMessage).not.toBeInTheDocument()
  })

  it('Renders with an initial value', () => {
    const { yesAnswer, noAnswer } = renderYesNoQuestion({}, true)

    expect(yesAnswer).toBeChecked()
    expect(noAnswer).not.toBeChecked()
  })

  it('Renders with custom yes/no labels', () => {
    const yesLabel = 'Affirmative'
    const noLabel = 'Negative'

    const { yesAnswerLabel, noAnswerLabel } = renderYesNoQuestion({
      yesLabel,
      noLabel,
    })

    expect(yesAnswerLabel).toHaveTextContent(yesLabel)
    expect(noAnswerLabel).toHaveTextContent(noLabel)
  })

  it('Can render stacked', () => {
    const { yesAnswer, noAnswer } = renderYesNoQuestion({ isStacked: true })

    expect(yesAnswer.closest('div')).toHaveClass('stacked')
    expect(noAnswer.closest('div')).toHaveClass('stacked')
  })

  it('Can render with a hint', () => {
    const hintText = 'yes means yes and no means no'

    const { hint } = renderYesNoQuestion({ hint: hintText })

    expect(hint).toBeInTheDocument()
    expect(hint).toHaveTextContent(hintText)
  })

  it('Can have a custom Id', () => {
    const hintText = 'yes means yes and no means no'

    const { yesAnswer, noAnswer, hint } = renderYesNoQuestion({
      id: 'custom-id',
      hint: hintText,
    })

    expect(yesAnswer).toHaveAttribute('id', 'custom-id.yes')
    expect(noAnswer).toHaveAttribute('id', 'custom-id.no')
    expect(hint).toHaveAttribute('id', 'custom-id.hint')
  })

  it('allows the user to select an answer', async () => {
    const user = userEvent.setup()

    const { yesAnswer, noAnswer } = renderYesNoQuestion()

    expect(noAnswer).not.toBeChecked()
    expect(yesAnswer).not.toBeChecked()

    await act(() => user.click(yesAnswer))

    expect(yesAnswer).toBeChecked()
    expect(noAnswer).not.toBeChecked()

    await act(() => user.click(noAnswer))

    expect(yesAnswer).not.toBeChecked()
    expect(noAnswer).toBeChecked()
  })

  it('Takes a custom onChange handler', async () => {
    const user = userEvent.setup()

    const handleChange = jest.fn()

    const { yesAnswer, noAnswer } = renderYesNoQuestion({
      onChange: handleChange,
    })

    await act(() => user.click(yesAnswer))

    expect(handleChange).toHaveBeenCalledTimes(1)

    await act(() => user.click(noAnswer))

    expect(handleChange).toHaveBeenCalledTimes(2)
  })

  it('renders an error message and styles when invalid', async () => {
    const user = userEvent.setup()

    const { yesNoQuestion, submitButton, queryForErrorMessage } =
      renderYesNoQuestion()

    expect(queryForErrorMessage()).not.toBeInTheDocument()

    await act(() => user.click(submitButton))

    await waitFor(() => {
      expect(queryForErrorMessage()).toBeInTheDocument()
      expect(yesNoQuestion).toHaveClass('errorLegend')
    })
  })
})

describe('convertValueToBoolean', () => {
  it.each([
    [YES, true],
    [NO, false],
    ['', undefined],
  ])('converts values properly', (value, expected) => {
    const result = convertValueToBoolean(value)

    expect(result).toEqual(expected)
  })
})
