'use client'

import ChatMessage from '@/components/chat/chat-message'
import { WebSocketContext } from '@/components/providers/socket-context-provider'
import { Textarea } from '@/components/ui/textarea'
import { ChannelMessageResponse } from '@/types/channel-types'
import { useUser } from '@clerk/nextjs'
import { Channel } from '@prisma/client'
import { ChevronLeft, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

type ChatRoomProps = {
  channel: Channel
  channelMessages: ChannelMessageResponse[]
}

export default function ChatRoom({
  channel,
  channelMessages: initialMessages,
}: ChatRoomProps) {
  const router = useRouter()
  const { user } = useUser()
  const socket = useContext(WebSocketContext)
  const [messages, setMessages] = useState(initialMessages)
  console.log(messages)

  const [inputValue, setInputValue] = useState('')

  if (messages && messages?.length === 0) {
    return (
      <div className='m-auto'>
        会話履歴がありません。さぁ会話を始めましょう！
      </div>
    )
  }

  useEffect(() => {
    socket.on('onMessage', (data: ChannelMessageResponse) => {
      setMessages((prev) => [...prev, data])
    })

    return () => {
      socket.off('connect')
      socket.off('onMessage')
      // socket.disconnect()
    }
  }, [])

  const onClickSend = async () => {
    if (!inputValue) return

    socket.emit('newMessage', {
      channelId: channel.id,
      senderId: user?.id,
      content: inputValue,
    })

    console.log('send')
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
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      <div className='absolute bottom-[20px] left-0 w-full p-2'>
        <div className='flex border rounded-md w-full justify-between'>
          <Textarea
            className='flex-1'
            placeholder='メッセージを入力'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Send className='m-2 cursor-pointer' onClick={onClickSend} />
        </div>
      </div>
    </div>
  )
}
