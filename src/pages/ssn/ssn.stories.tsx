import { Meta, StoryObj } from '@storybook/react'

import { SSN } from './ssn'

const meta = {
  title: 'Pages/SSN',
  component: SSN,
} satisfies Meta<typeof SSN>

export default meta
type Story = StoryObj<typeof SSN>

export const SSNPage: Story = {}
