import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { YesNoQuestion } from 'components/form/fields/YesNoQuestion/YesNoQuestion'
import { ComponentProps } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

describe('YesNoQuestion', () => {
  const NAME = 'question'
  const QUESTION = 'What is the answer?'

  const renderYesNoQuestion = (
    props?: Omit<ComponentProps<typeof YesNoQuestion>, 'name' | 'question'>,
    defaultValue: boolean | undefined = undefined
  ) => {
    console.log(props)
    console.log(defaultValue)
    const WrappedInput = () => {
      const hookFormMethods = useForm({
        defaultValues: {
          [NAME]: defaultValue,
        },
      })
      return (
        <FormProvider {...hookFormMethods}>
          <YesNoQuestion name="question" question={QUESTION} {...props} />
        </FormProvider>
      )
    }

    render(<WrappedInput />)

    const yesNoQuestion = screen.getByRole('group', { name: QUESTION })
    const label = within(yesNoQuestion).getByText(QUESTION)
    const yesAnswer = within(yesNoQuestion).getByRole('radio', {
      name: props?.yesLabel || 'yes',
    })
    const noAnswer = within(yesNoQuestion).getByRole('radio', {
      name: props?.noLabel || 'no',
    })
    const hint = within(yesNoQuestion).queryByTestId('yes-no-hint')

    return { yesNoQuestion, label, yesAnswer, noAnswer, hint }
  }

  it('Renders without error', () => {
    const { yesNoQuestion, label, yesAnswer, noAnswer, hint } =
      renderYesNoQuestion()

    expect(yesNoQuestion).toBeInTheDocument()
    expect(label).toBeInTheDocument()
    expect(label).toHaveTextContent(QUESTION)
    expect(yesAnswer).toBeInTheDocument()
    expect(noAnswer).toBeInTheDocument()
    expect(hint).not.toBeInTheDocument()
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

  it('Takes a custom onChange handler', async () => {
    const user = userEvent.setup()

    const handleChange = jest.fn()

    const { yesAnswer, noAnswer } = renderYesNoQuestion({
      onChange: handleChange,
    })

    await user.click(yesAnswer)

    expect(handleChange).toHaveBeenCalledTimes(1)

    await user.click(noAnswer)

    expect(handleChange).toHaveBeenCalledTimes(2)
  })
})
