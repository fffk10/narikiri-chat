import { Channel } from '@prisma/client'

type ChannelListItem = {
  channel: Channel
  onClick: () => void
}

export default function ChannelListItem({ channel, onClick }: ChannelListItem) {
  return (
    <li key={channel.id} className='mb-2'>
      <button onClick={onClick} className='text-left text-sm w-full'>
        {channel.name}
      </button>
    </li>
  )
}
