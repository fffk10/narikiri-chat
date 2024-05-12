import React from 'react'
import { ChannelMessageResponse } from '@/types/channel-types'

import Image from 'next/image'

type ChatMessageProps = {
  message: ChannelMessageResponse
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div key={message.id} className='text-sm p-2 border-b border-gray-200 flex'>
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
  )
}
