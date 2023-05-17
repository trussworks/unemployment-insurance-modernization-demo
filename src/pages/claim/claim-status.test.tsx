import { render, screen } from '@testing-library/react'

import { ClaimStatus, ClaimStatusProps } from './claim-status'

const CLAIM_HEADER = "We're reviewing your claim"
const APP_SUBMITTED = 'Application submitted'
const CERTIFY_BUTTON = 'Certify for benefits'
const POTENTIAL_BENEFITS = 'Potential benefits remaining'
const POTENTIAL_NEXT_PAYMENT = 'Potential next payment'
const CLAIM_PERIOD = 'Claim period'
const RECENT_ACTIVITY = 'Recent activity'

describe('Claim Status page', () => {
  const renderClaimStatusPage = (props: ClaimStatusProps) => {
    render(<ClaimStatus {...props} />)

    const claimHeader = screen.getByText(CLAIM_HEADER)
    const appSubmitted = screen.getByText(APP_SUBMITTED)
    const certifyButton = screen.getByRole('button', {
      name: CERTIFY_BUTTON,
    })
    const potentialBenefitsHeader = screen.getByText(POTENTIAL_BENEFITS)
    const potentialNextPaymentHeader = screen.getByText(POTENTIAL_NEXT_PAYMENT)
    const claimPeriodHeader = screen.getByText(CLAIM_PERIOD)
    const recentActivityQuery = () => screen.queryByText(RECENT_ACTIVITY)
    const recentActivityListItemQuery = () =>
      screen.queryByText('Submitted as #21-XXXXXXXX')

    return {
      claimHeader,
      appSubmitted,
      certifyButton,
      potentialBenefitsHeader,
      potentialNextPaymentHeader,
      claimPeriodHeader,
      recentActivityQuery,
      recentActivityListItemQuery,
    }
  }

  const defaultProps = {
    benefitsPaidAmount: 0,
    benefitsRemainingAmount: 600,
    nextPaymentAmount: 300,
    claimPeriodFrom: new Date('2022-01-11'),
    claimPeriodTo: new Date('2023-01-11'),
    accountUpdates: [
      {
        type: 'submission',
        userID: '21-XXXXXXXX',
        timestamp: new Date('2023-02-02'),
      },
    ],
  }

  it('Renders without error', () => {
    const {
      claimHeader,
      appSubmitted,
      certifyButton,
      potentialBenefitsHeader,
      potentialNextPaymentHeader,
      claimPeriodHeader,
      recentActivityQuery,
      recentActivityListItemQuery,
    } = renderClaimStatusPage({
      ...(defaultProps as ClaimStatusProps),
    })
    expect(claimHeader).toBeInTheDocument()
    expect(claimHeader).toHaveTextContent(CLAIM_HEADER)
    expect(appSubmitted).toBeInTheDocument()
    expect(appSubmitted).toHaveTextContent(APP_SUBMITTED)
    expect(certifyButton).toBeInTheDocument()
    expect(certifyButton).toHaveTextContent(CERTIFY_BUTTON)
    expect(potentialBenefitsHeader).toBeInTheDocument()
    expect(potentialBenefitsHeader).toHaveTextContent(POTENTIAL_BENEFITS)
    expect(potentialNextPaymentHeader).toBeInTheDocument()
    expect(potentialNextPaymentHeader).toHaveTextContent(POTENTIAL_NEXT_PAYMENT)
    expect(claimPeriodHeader).toBeInTheDocument()
    expect(claimPeriodHeader).toHaveTextContent(CLAIM_PERIOD)
    expect(recentActivityQuery()).toBeInTheDocument()
    expect(recentActivityQuery()).toHaveTextContent(RECENT_ACTIVITY)
    expect(recentActivityListItemQuery()).toBeInTheDocument()
  })

  const onlyRequiredProps = {
    benefitsPaidAmount: 0,
    benefitsRemainingAmount: 600,
    nextPaymentAmount: 300,
    claimPeriodFrom: new Date('2022-01-11'),
  }

  it('Renders with no claimPeriodTo', () => {
    const {
      claimHeader,
      appSubmitted,
      certifyButton,
      potentialBenefitsHeader,
      potentialNextPaymentHeader,
      claimPeriodHeader,
    } = renderClaimStatusPage({
      ...(onlyRequiredProps as ClaimStatusProps),
    })
    expect(claimHeader).toBeInTheDocument()
    expect(claimHeader).toHaveTextContent(CLAIM_HEADER)
    expect(appSubmitted).toBeInTheDocument()
    expect(appSubmitted).toHaveTextContent(APP_SUBMITTED)
    expect(certifyButton).toBeInTheDocument()
    expect(certifyButton).toHaveTextContent(CERTIFY_BUTTON)
    expect(potentialBenefitsHeader).toBeInTheDocument()
    expect(potentialBenefitsHeader).toHaveTextContent(POTENTIAL_BENEFITS)
    expect(potentialNextPaymentHeader).toBeInTheDocument()
    expect(potentialNextPaymentHeader).toHaveTextContent(POTENTIAL_NEXT_PAYMENT)
    expect(claimPeriodHeader).toBeInTheDocument()
    expect(claimPeriodHeader).toHaveTextContent(CLAIM_PERIOD)
  })
})
