import { Meta, StoryObj } from '@storybook/react'

import { Identity as IdentityComponent } from './identity'

const meta = {
  title: 'Pages/Identity',
  component: IdentityComponent,
} satisfies Meta<typeof IdentityComponent>

export default meta
type Story = StoryObj<typeof IdentityComponent>

export const WithImportedInformation: Story = {
  args: {
    importedSsn: '123-45-6789',
    importedDateOfBirth: '12/28/1969',
  },
}

export const WithoutImportedSsn: Story = {
  args: {
    importedDateOfBirth: '12/28/1969',
  },
}
