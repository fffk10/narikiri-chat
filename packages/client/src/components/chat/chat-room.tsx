'use client'

import { ChannelMessageResponse } from '@/types/channel-types'
import { Channel } from '@prisma/client'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

type ChatRoomProps = {
  channel: Channel
  channelMessages: ChannelMessageResponse[]
}

export default function ChatRoom({ channel, channelMessages }: ChatRoomProps) {
  const router = useRouter()

  if (channelMessages && channelMessages?.length === 0) {
    return (
      <div className='m-auto'>
        会話履歴がありません。さぁ会話を始めましょう！
      </div>
    )
  }

  return (
    <div className='flex flex-col flex-1 p-2'>
      <div className='p-2 flex justify-between'>
        <div className='flex'>
          <button
            className='md:hidden mr-1'
            onClick={() => router.push('/chat')}
          >
            <ChevronLeft />
          </button>
          <p className='text-xl truncate'>{channel.name}</p>
        </div>
        <div>buttons</div>
      </div>

      <div className='p-2 overflow-hidden overflow-y-auto'>
        {channelMessages.map((message) => (
          <div
            key={message.id}
            className='text-sm p-2 border-b border-gray-200 flex'
          >
            <div className='min-w-[40px]'>
              <Image
                src={message.sender.imageUrl || '/user.svg'}
                alt='user image'
                width={40}
                height={40}
                className='rounded-full border'
              />
            </div>
            <div className='ml-2'>
              <p className='mb-1'>{message.sender.name}</p>
              <p className='ml-1 '>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
