'use client'

import ChatMessage from '@/components/chat/chat-message'
import { WebSocketContext } from '@/components/providers/socket-context-provider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { ChannelMessageResponse, ChannelResponse } from '@/types/channel-types'
import { useUser } from '@clerk/nextjs'
import { ChevronLeft, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useRef, useState } from 'react'

type ChatRoomProps = {
  channel: ChannelResponse
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
  const [inputValue, setInputValue] = useState('')
  const [isComposing, setIsComposing] = useState<boolean>(false)
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  // チャット受信用socket通信の設定
  useEffect(() => {
    socket.on('onMessage', (data: ChannelMessageResponse) => {
      setMessages((prev) => [...prev, data])
    })

    return () => {
      socket.off('onMessage')
      socket.disconnect()
    }
  }, [])

  // Shift + Enter で改行する
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isComposing && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSend = async () => {
    if (!inputValue) return

    console.log('send message')
    socket.emit('newMessage', {
      channelId: channel.id,
      senderId: user?.id,
      content: inputValue,
    })

    setInputValue('')
  }

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

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
          <p className='text-xl truncate'>
            {channel.name} ({channel.ChannelMember.length})
          </p>
        </div>
        <div>buttons</div>
      </div>

      {messages && messages?.length === 0 ? (
        <div className='m-auto'>
          会話履歴がありません。さぁ会話を始めましょう！
        </div>
      ) : (
        <ScrollArea className='p-2 flex-1 overflow-hidden overflow-y-auto'>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={chatEndRef} />
        </ScrollArea>
      )}

      <div className='w-full p-2'>
        <div className='flex border rounded-md w-full justify-between'>
          <Textarea
            className='flex-1'
            placeholder='メッセージを入力'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
          <Send className='m-2 cursor-pointer' onClick={handleSend} />
        </div>
      </div>
    </div>
  )
}
