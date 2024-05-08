import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { ModeToggle } from '@/components/theme/mode-toggle'

const meta = {
  title: 'Example/Button',
  component: ModeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
