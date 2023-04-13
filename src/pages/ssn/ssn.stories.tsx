import { Meta, StoryObj } from '@storybook/react'

import { SSN as SsnComponent } from './ssn'

const meta = {
  title: 'Pages/SSN',
  component: SsnComponent,
} satisfies Meta<typeof SsnComponent>

export default meta
type Story = StoryObj<typeof SsnComponent>

export const SSN: Story = {}
