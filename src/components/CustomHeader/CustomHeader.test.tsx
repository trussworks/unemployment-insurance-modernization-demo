import { render, screen, within } from '@testing-library/react'

import { CustomHeader } from './CustomHeader'

const HEADER_TEXT = 'Unemployment Insurance Benefits'
const HOME = 'Home'
const MY_CLAIM = 'My claim'
const LOG_OUT = 'Log out'

describe('CustomHeader', () => {
  const renderCustomHeader = () => {
    render(<CustomHeader />)

    const header = screen.getByText(HEADER_TEXT)
    const nav = screen.getByRole('navigation')
    const home = within(nav).getByRole('link', { name: HOME })
    const myClaim = within(nav).getByRole('link', { name: MY_CLAIM })
    const logOut = within(nav).getByRole('link', { name: LOG_OUT })

    return {
      header,
      nav,
      home,
      myClaim,
      logOut,
    }
  }

  it('Renders without error', () => {
    const { header, nav, home, myClaim, logOut } = renderCustomHeader()

    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent(HEADER_TEXT)
    expect(nav).toBeInTheDocument()
    expect(home).toBeInTheDocument()
    expect(home).toHaveTextContent(HOME)
    expect(myClaim).toBeInTheDocument()
    expect(myClaim).toHaveTextContent(MY_CLAIM)
    expect(logOut).toBeInTheDocument()
    expect(logOut).toHaveTextContent(LOG_OUT)
  })
})
