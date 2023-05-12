import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CustomHeader } from './CustomHeader'

const HEADER_TEXT = 'Unemployment Insurance Benefits'
const HOME = 'Home'
const MY_CLAIM = 'My claim'
const LOG_OUT = 'Log out'
const MENU = 'Menu'

describe('CustomHeader', () => {
  const renderCustomHeader = () => {
    render(<CustomHeader />)

    const header = screen.getByText(HEADER_TEXT)
    const nav = screen.getByRole('navigation')
    const home = within(nav).getByRole('link', { name: HOME })
    const myClaim = within(nav).getByRole('link', { name: MY_CLAIM })
    const logOut = within(nav).getByRole('link', { name: LOG_OUT })
    const menu = screen.getByRole('button', { name: MENU })

    return {
      header,
      nav,
      home,
      myClaim,
      logOut,
      menu,
    }
  }

  it('Renders without error', () => {
    const { header, nav, home, myClaim, logOut, menu } = renderCustomHeader()

    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent(HEADER_TEXT)
    expect(nav).toBeInTheDocument()
    expect(home).toBeInTheDocument()
    expect(home).toHaveTextContent(HOME)
    expect(myClaim).toBeInTheDocument()
    expect(myClaim).toHaveTextContent(MY_CLAIM)
    expect(logOut).toBeInTheDocument()
    expect(logOut).toHaveTextContent(LOG_OUT)
    expect(menu).toBeInTheDocument()
    expect(menu).toHaveTextContent(MENU)
  })

  it('Toggles the menu', async () => {
    const user = userEvent.setup()

    const { menu, nav } = renderCustomHeader()

    expect(nav).not.toHaveClass('is-visible')

    await act(() => user.click(menu))

    const overlay = screen.getByTestId('overlay')

    expect(overlay).toBeInTheDocument()
    expect(nav).toHaveClass('is-visible')
  })
})
