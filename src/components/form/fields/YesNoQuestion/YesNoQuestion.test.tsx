import { render } from '@testing-library/react'
import { YesNoQuestion } from 'components/form/fields/YesNoQuestion/YesNoQuestion'
import { ComponentProps } from 'react'

describe('YesNoQuestion', () => {
  const renderYesNoQuestion = (
    props?: Omit<ComponentProps<typeof YesNoQuestion>, 'name' | 'question'>
  ) => {
    render(
      <YesNoQuestion
        name="question"
        question="What is the answer?"
        {...props}
      />
    )
    return {}
  }

  it('Renders without error', () => {
    renderYesNoQuestion()
  })
})
