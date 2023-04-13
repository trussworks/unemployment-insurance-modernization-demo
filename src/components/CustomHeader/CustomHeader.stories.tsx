import { Meta, StoryObj } from '@storybook/react'
import { CustomBanner } from 'components/CustomBanner/CustomBanner'
import { CustomHeader } from 'components/CustomHeader/CustomHeader'

const meta = {
  title: 'Components/Header',
  component: CustomHeader,
} satisfies Meta<typeof CustomHeader>

export default meta
type Story = StoryObj<typeof CustomBanner>

export const Header: Story = {}
