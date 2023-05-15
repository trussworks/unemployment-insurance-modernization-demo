import { render, screen } from '@testing-library/react'
import { ComponentProps } from 'react'

import { SectionHeading } from './SectionHeading'

const SECTION_HEADING = 'A great heading'

describe('SectionHeading', () => {
  const renderSectionHeading = (
    props?: Omit<ComponentProps<typeof SectionHeading>, 'children'>
  ) => {
    render(<SectionHeading {...props}>{SECTION_HEADING}</SectionHeading>)

    const heading = screen.getByRole('heading')

    return {
      heading,
    }
  }
  it('Renders without error', () => {
    const { heading } = renderSectionHeading()

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(SECTION_HEADING)
  })

  it('accepts a custom heading level', () => {
    const { heading } = renderSectionHeading({ headingLevel: 'h3' })

    const headingByLevel = screen.queryByRole('heading', { level: 3 })

    expect(heading).toEqual(headingByLevel)
  })

  it('accepts custom className', () => {
    const { heading } = renderSectionHeading({ className: 'custom' })

    expect(heading).toHaveClass('font-heading-sm margin-top-4 custom')
  })
})
