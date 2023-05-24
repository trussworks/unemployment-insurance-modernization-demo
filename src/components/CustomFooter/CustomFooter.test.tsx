import { render, screen, within } from '@testing-library/react'

import { CustomFooter } from './CustomFooter'

const RETURN_TO_TOP = 'Return to top'
const AGENCY_DOMAIN = '{TO_DO_YOUR_DOMAIN_HERE}'
const AGENCY_OFFICIAL = 'An official website of'
const STATE_OR_TERRITORY = '{TODO_YOUR_STATE_OR_TERRITORY_HERE}'
const LINK_1 = 'Link 1'
const LINK_2 = 'Link 2'
const LINK_3 = 'Link 3'
const HOME = 'Home'

describe('CustomFooter', () => {
  const renderCustomFooter = () => {
    render(<CustomFooter />)

    const returnToTopLink = screen.getByRole('link', { name: RETURN_TO_TOP })
    const agencyRegion = screen.getByRole('region', {
      name: 'Agency identifier',
    })
    const agencyDomain = screen.getByText(AGENCY_DOMAIN)
    const agencyOfficialText = screen.getByText(AGENCY_OFFICIAL)
    const stateOrTerritoryLink = within(agencyRegion).getByRole('link', {
      name: STATE_OR_TERRITORY,
    })
    const listOfLinks = screen.getByRole('navigation', {
      name: 'Important links',
    })
    const link1 = within(listOfLinks).getByRole('link', { name: LINK_1 })
    const link2 = within(listOfLinks).getByRole('link', { name: LINK_2 })

    const link3 = within(listOfLinks).getByRole('link', { name: LINK_3 })
    const home = within(listOfLinks).getByRole('link', { name: HOME })
    const copyright = screen.getByRole('region', {
      name: 'U.S. government information and services',
    })

    return {
      returnToTopLink,
      agencyRegion,
      agencyDomain,
      agencyOfficialText,
      stateOrTerritoryLink,
      listOfLinks,
      link1,
      link2,
      link3,
      home,
      copyright,
    }
  }

  it('Renders without error', () => {
    const {
      returnToTopLink,
      agencyRegion,
      agencyDomain,
      agencyOfficialText,
      stateOrTerritoryLink,
      listOfLinks,
      link1,
      link2,
      link3,
      home,
      copyright,
    } = renderCustomFooter()

    expect(returnToTopLink).toBeInTheDocument()
    expect(returnToTopLink).toHaveTextContent(RETURN_TO_TOP)
    expect(agencyRegion).toBeInTheDocument()
    expect(agencyDomain).toBeInTheDocument()
    expect(agencyDomain).toHaveTextContent(AGENCY_DOMAIN)
    expect(agencyOfficialText).toBeInTheDocument()
    expect(stateOrTerritoryLink).toBeInTheDocument()
    expect(stateOrTerritoryLink).toHaveTextContent(STATE_OR_TERRITORY)
    expect(listOfLinks).toBeInTheDocument()
    expect(link1).toHaveTextContent(LINK_1)
    expect(link2).toHaveTextContent(LINK_2)
    expect(link3).toHaveTextContent(LINK_3)
    expect(home).toHaveTextContent(HOME)
    expect(copyright).toBeInTheDocument()
    expect(copyright).toHaveTextContent(
      `Copyright © 2023 ${STATE_OR_TERRITORY}`
    )
  })
})
