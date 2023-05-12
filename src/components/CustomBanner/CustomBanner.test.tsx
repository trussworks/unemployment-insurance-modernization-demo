import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CustomBanner } from './CustomBanner'

const OFFICIAL_TEXT =
  'This is an official website of {TODO_YOUR_STATE_OR_TERRITORY_HERE}'
const HOW_YOU_KNOW_BUTTON = "Here's how you know"

const DOT_GOV_HEADER = 'Official websites use .gov'
const DOT_GOV_CONTENT =
  'website belongs to an official government organization in the United States.'
const SECURE_SITE_HEADER = 'Secure .gov websites use HTTPS'
const SECURE_SITE_CONTENT =
  " means you've safely connected to the .gov website. Share sensitive information only on official, secure websites."

describe('CustomBanner', () => {
  const renderCustomBanner = () => {
    render(<CustomBanner />)

    const flagImage = screen.getByRole('img', { name: 'U.S. flag' })
    const officialText = screen.getByText(OFFICIAL_TEXT)
    const howYouKnowButton = screen.getByRole('button', {
      name: HOW_YOU_KNOW_BUTTON,
    })
    const dotGovHeader = screen.getByText(DOT_GOV_HEADER)
    const dotGovContent = screen.getByText(DOT_GOV_CONTENT, { exact: false })
    const secureSiteHeader = screen.getByText(SECURE_SITE_HEADER)
    const secureSiteContent = screen.getByText(SECURE_SITE_CONTENT, {
      exact: false,
    })

    return {
      flagImage,
      officialText,
      howYouKnowButton,
      dotGovHeader,
      dotGovContent,
      secureSiteHeader,
      secureSiteContent,
    }
  }

  it('Renders without error', () => {
    const {
      flagImage,
      officialText,
      howYouKnowButton,
      dotGovHeader,
      dotGovContent,
      secureSiteHeader,
      secureSiteContent,
    } = renderCustomBanner()

    expect(flagImage).toBeInTheDocument()
    expect(officialText).toBeInTheDocument()
    expect(officialText).toHaveTextContent(OFFICIAL_TEXT)
    expect(howYouKnowButton).toBeInTheDocument()
    expect(howYouKnowButton).toHaveTextContent(HOW_YOU_KNOW_BUTTON)
    expect(dotGovHeader).toBeInTheDocument()
    expect(dotGovContent).toBeInTheDocument()
    expect(dotGovContent.textContent).toContain(DOT_GOV_CONTENT)
    expect(secureSiteHeader).toBeInTheDocument()
    expect(secureSiteContent).toBeInTheDocument()
    expect(secureSiteContent.textContent).toContain(SECURE_SITE_CONTENT)
  })

  it('Toggles the expanded content', async () => {
    const user = userEvent.setup()
    const {
      howYouKnowButton,
      dotGovHeader,
      dotGovContent,
      secureSiteHeader,
      secureSiteContent,
    } = renderCustomBanner()
    expect(dotGovHeader).not.toBeVisible()
    expect(dotGovContent).not.toBeVisible()
    expect(secureSiteHeader).not.toBeVisible()
    expect(secureSiteContent).not.toBeVisible()
    await act(() => user.click(howYouKnowButton))
    expect(dotGovHeader).toBeVisible()
    expect(dotGovContent).toBeVisible()
    expect(secureSiteHeader).toBeVisible()
    expect(secureSiteContent).toBeVisible()
  })
})
