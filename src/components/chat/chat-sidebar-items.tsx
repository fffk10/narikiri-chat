import { Channel } from '@prisma/client'

type ChatSidebarItems = {
  channel: Channel
  onClick: () => void
}

export default function ChatSidebarItems({
  channel,
  onClick,
}: ChatSidebarItems) {
  return (
    <li key={channel.id} className='mb-2'>
      <button onClick={onClick} className='text-left text-sm w-full'>
        {channel.name}
      </button>
    </li>
  )
}
