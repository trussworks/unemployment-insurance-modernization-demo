import { Meta, StoryObj } from '@storybook/react'

import { CustomBanner } from 'components/CustomBanner/CustomBanner'

const meta = {
  title: 'Components/Banner',
  component: CustomBanner,
} satisfies Meta<typeof CustomBanner>

export default meta
type Story = StoryObj<typeof CustomBanner>

export const Banner: Story = {}
