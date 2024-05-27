import type { Meta, StoryObj } from '@storybook/react'
import { ModeToggle } from '@/components/theme/mode-toggle'

const meta = {
  title: 'Example/Button',
  component: ModeToggle,
  parameters: {
    layout: 'centered',
    nextjs: {
      appdirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
} satisfies Meta<typeof ModeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
