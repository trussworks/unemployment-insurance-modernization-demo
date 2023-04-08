import { Meta, StoryObj } from '@storybook/react'

import { CustomBanner } from 'components/CustomBanner/CustomBanner'

const meta = {
  title: 'Components/Custom Banner',
  component: CustomBanner,
} satisfies Meta<typeof CustomBanner>

export default meta
type Story = StoryObj<typeof CustomBanner>

export const Default: Story = { args: {} }
