import { Meta, StoryObj } from '@storybook/react'

import { ClaimReview } from './claim'

const meta = {
  title: 'Pages/Claim',
  component: ClaimReview,
} satisfies Meta<typeof ClaimReview>

export default meta
type Story = StoryObj<typeof ClaimReview>

export const ClaimReviewPage: Story = {
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
