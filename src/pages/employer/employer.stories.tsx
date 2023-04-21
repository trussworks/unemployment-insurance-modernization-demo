import { Meta, StoryObj } from '@storybook/react'

import { Employer } from './employer'

const meta = {
  title: 'Pages/Employer',
  component: Employer,
} satisfies Meta<typeof Employer>

export default meta
type Story = StoryObj<typeof Employer>

export const EmployerPage: Story = {}
