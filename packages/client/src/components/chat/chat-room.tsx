'use client'

import ChatMessage from '@/components/chat/chat-message'
import { WebSocketContext } from '@/components/providers/socket-context-provider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import CommonTooltip from '@/components/utils/common-tooltip'
import { ChannelMessageResponse, ChannelResponse } from '@/types/channel-types'
import { useUser } from '@clerk/nextjs'
import { ChevronLeft, CircleHelp, Send, Users } from 'lucide-react'
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
  const [isComposing, setIsComposing] = useState(false)
  const chatEndRef = useRef<HTMLDivElement | null>(null)
  const [openMembers, setOpenMembers] = useState(false)

  // チャット受信用socket通信の設定
  useEffect(() => {
    socket.on('onMessage', (data: ChannelMessageResponse) => {
      setMessages((prev) => [...prev, data])
    })
    console.log(socket)

    return () => {
      console.log('disconnect socket')
      socket.off('onMessage')
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
        <div className='flex gap-2'>
          <CommonTooltip contentText='member'>
            <Users onClick={() => setOpenMembers((prev) => !prev)} />
          </CommonTooltip>

          <CommonTooltip contentText='help'>
            <CircleHelp onClick={() => console.log('help click')} />
          </CommonTooltip>
        </div>
      </div>

      <div className='flex-1 p-2 overflow-hidden overflow-y-auto'>
        {messages && messages?.length === 0 ? (
          <div className='h-full flex justify-center items-center'>
            会話履歴がありません。さぁ会話を始めましょう！
          </div>
        ) : (
          <ScrollArea>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={chatEndRef} />
          </ScrollArea>
        )}
      </div>

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
