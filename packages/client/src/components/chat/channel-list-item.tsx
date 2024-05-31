import { Channel } from '@prisma/client'
import Image from 'next/image'

type ChannelListItem = {
  channel: Channel
  onClick: () => void
}

export default function ChannelListItem({ channel, onClick }: ChannelListItem) {
  return (
    <li key={channel.id} className='mb-2'>
      <button onClick={onClick} className='flex gap-2 text-left text-sm w-full'>
        <Image
          src={channel.imageUrl || '/user.svg'}
          alt='channel image'
          width={40}
          height={40}
          className='rounded-full border'
        />
        <p className='my-auto'>{channel.name}</p>
      </button>
    </li>
  )
}
