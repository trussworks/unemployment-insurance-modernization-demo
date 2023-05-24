import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { Meta, StoryObj } from '@storybook/react'
import { CustomBanner } from 'components/CustomBanner/CustomBanner'
import { CustomHeader } from 'components/CustomHeader/CustomHeader'

const meta = {
  title: 'Components/Header',
  component: CustomHeader,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
  },
} satisfies Meta<typeof CustomHeader>

export default meta
type Story = StoryObj<typeof CustomBanner>

export const WithLargeViewport: Story = {}

export const WithSmallViewport: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  },
}
