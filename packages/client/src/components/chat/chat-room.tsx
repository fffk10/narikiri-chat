'use client'

import ChatInput from '@/components/chat/chat-input'
import ChatMessage from '@/components/chat/chat-message'
import { Textarea } from '@/components/ui/textarea'
import { ChannelMessageResponse } from '@/types/channel-types'
import { useUser } from '@clerk/nextjs'
import { Channel } from '@prisma/client'
import { ChevronLeft, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'

type ChatRoomProps = {
  channel: Channel
  channelMessages: ChannelMessageResponse[]
}

export default function ChatRoom({ channel, channelMessages }: ChatRoomProps) {
  const router = useRouter()
  const { user } = useUser()

  if (channelMessages && channelMessages?.length === 0) {
    return (
      <div className='m-auto'>
        会話履歴がありません。さぁ会話を始めましょう！
      </div>
    )
  }

  return (
    <div className='relative flex flex-col flex-1 p-2'>
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
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      <div className='absolute bottom-[20px] left-0 w-full p-2'>
        <ChatInput channelId={channel.id} userId={user?.id ?? ''} />
      </div>
    </div>
  )
}
