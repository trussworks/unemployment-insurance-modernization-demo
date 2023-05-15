import { render, screen } from '@testing-library/react'
import { ComponentProps } from 'react'

import { SectionHeading } from './SectionHeading'

describe('SectionHeading', () => {
  const renderSectionHeading = (
    props?: Omit<ComponentProps<typeof SectionHeading>, 'children'>
  ) => {
    const headingText = 'Heading Text'
    render(<SectionHeading {...props}>{headingText}</SectionHeading>)

    const sectionHeading = screen.getByRole('heading', { name: headingText })

    return {
      sectionHeading,
    }
  }

  it('renders without error', () => {
    const { sectionHeading } = renderSectionHeading()

    const sectionHeadingByLevel = screen.queryByRole('heading', { level: 2 })

    expect(sectionHeading).toHaveClass('font-heading-sm margin-top-4')
    expect(sectionHeading).toEqual(sectionHeadingByLevel)
  })

  it('accepts a custom heading level', () => {
    const { sectionHeading } = renderSectionHeading({ headingLevel: 'h3' })

    const sectionHeadingByLevel = screen.queryByRole('heading', { level: 3 })

    expect(sectionHeading).toEqual(sectionHeadingByLevel)
  })

  it('accepts custom className', () => {
    const { sectionHeading } = renderSectionHeading({ className: 'custom' })

    expect(sectionHeading).toHaveClass('font-heading-sm margin-top-4 custom')
  })
})
