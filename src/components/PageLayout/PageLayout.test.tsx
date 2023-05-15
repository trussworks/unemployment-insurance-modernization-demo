import { render, screen } from '@testing-library/react'

import { PageLayout } from './PageLayout'

const BANNER_TEXT =
  'This is an official website of {TODO_YOUR_STATE_OR_TERRITORY_HERE}'
const PAGE_HEADER = 'Unemployment Insurance Benefits'
const HEADING = 'Another quality page'
const CONTENT = 'Hello world!'
const RETURN_TO_TOP = 'Return to top'

describe('PageLayout', () => {
  const renderPageLayout = () => {
    render(
      <PageLayout heading={HEADING}>
        <p>{CONTENT}</p>
      </PageLayout>
    )

    const bannerText = screen.getByText(BANNER_TEXT)
    const pageHeaderText = screen.getByText(PAGE_HEADER)
    const heading = screen.getByRole('heading')
    const content = screen.getByText(CONTENT)
    const returnToTopLink = screen.getByRole('link', { name: RETURN_TO_TOP })

    return {
      bannerText,
      heading,
      pageHeaderText,
      content,
      returnToTopLink,
    }
  }

  it('Renders without error', () => {
    const { bannerText, pageHeaderText, heading, content, returnToTopLink } =
      renderPageLayout()

    expect(bannerText).toBeInTheDocument()
    expect(pageHeaderText).toBeInTheDocument()
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(HEADING)
    expect(content).toBeInTheDocument()
    expect(returnToTopLink).toBeInTheDocument()
  })
})
