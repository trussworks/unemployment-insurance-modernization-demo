import { Meta, StoryObj } from '@storybook/react'

import { ClaimStatus } from './claim-status'

const meta = {
  title: 'Pages/Claim Status',
  component: ClaimStatus,
} satisfies Meta<typeof ClaimStatus>

export default meta
type Story = StoryObj<typeof ClaimStatus>

export const ClaimStatusPage: Story = {
  args: {
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
  },
}
