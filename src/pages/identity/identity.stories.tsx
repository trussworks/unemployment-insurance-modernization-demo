import { Meta, StoryObj } from '@storybook/react'

import { Identity as IdentityComponent } from './identity'

const meta = {
  title: 'Pages/Identity',
  component: IdentityComponent,
} satisfies Meta<typeof IdentityComponent>

export default meta
type Story = StoryObj<typeof IdentityComponent>

export const Identity: Story = {}
