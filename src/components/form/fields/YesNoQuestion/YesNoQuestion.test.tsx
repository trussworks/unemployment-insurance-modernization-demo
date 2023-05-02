import { render, screen, within } from '@testing-library/react'
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

    return { yesNoQuestion, label, yesAnswer, noAnswer }
  }

  it('Renders without error', () => {
    const { yesNoQuestion, label, yesAnswer, noAnswer } = renderYesNoQuestion()

    expect(yesNoQuestion).toBeInTheDocument()
    expect(label).toBeInTheDocument()
    expect(label).toHaveTextContent(QUESTION)
    expect(yesAnswer).toBeInTheDocument()
    expect(noAnswer).toBeInTheDocument()
  })
})
