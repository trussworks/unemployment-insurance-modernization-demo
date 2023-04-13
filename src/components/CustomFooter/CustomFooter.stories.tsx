import { Meta, StoryObj } from '@storybook/react'
import { CustomBanner } from 'components/CustomBanner/CustomBanner'
import { CustomFooter } from 'components/CustomFooter/CustomFooter'

const meta = {
  title: 'Components/Footer',
  component: CustomFooter,
} satisfies Meta<typeof CustomFooter>

export default meta
type Story = StoryObj<typeof CustomBanner>

export const Footer: Story = {}
