import { render, screen } from '@testing-library/react'

import { SectionHeading } from './SectionHeading'

const SECTION_HEADING = 'A great heading'

describe('SectionHeading', () => {
  const renderSectionHeading = () => {
    render(<SectionHeading>{SECTION_HEADING}</SectionHeading>)

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
})
