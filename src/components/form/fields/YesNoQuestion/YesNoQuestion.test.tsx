import { render } from '@testing-library/react'
import { YesNoQuestion } from 'components/form/fields/YesNoQuestion/YesNoQuestion'
import { ComponentProps } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

describe('YesNoQuestion', () => {
  const CustomComponent = (
    props?: Omit<ComponentProps<typeof YesNoQuestion>, 'name' | 'question'>
  ) => {
    const methods = useForm()

    return (
      <FormProvider {...methods}>
        <YesNoQuestion
          name="question"
          question="What is the answer?"
          {...props}
        />
      </FormProvider>
    )
  }
  const renderYesNoQuestion = (
    props?: Omit<ComponentProps<typeof YesNoQuestion>, 'name' | 'question'>
  ) => {
    render(<CustomComponent {...props} />)
    return {}
  }

  it('Renders without error', () => {
    renderYesNoQuestion()
  })
})
