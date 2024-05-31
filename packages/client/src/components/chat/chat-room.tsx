'use client'

import ChannelMemberList from '@/components/chat/channel-member-list'
import ChatHistory from '@/components/chat/chat-history'
import { WebSocketContext } from '@/components/providers/socket-context-provider'
import { Textarea } from '@/components/ui/textarea'
import CommonTooltip from '@/components/utils/common-tooltip'
import { cn } from '@/lib/utils'
import { ChannelMessageResponse, ChannelResponse } from '@/types/channel-types'
import { useUser } from '@clerk/nextjs'
import { ChevronLeft, Menu, Send, Users } from 'lucide-react'
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
  const [displayType, setDisplayType] = useState<'chat' | 'members' | 'menu'>(
    'chat'
  )

  // チャット受信用socket通信の設定ch
  useEffect(() => {
    socket.on('onMessage', (data: ChannelMessageResponse) => {
      setMessages((prev) => [...prev, data])
    })

    return () => {
      console.log('disconnect socket')
      socket.off('onMessage')
    }
  }, [])

  // テキスト入力時にShift + Enter で改行する
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isComposing && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSend = async () => {
    if (!inputValue) return

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

          <Menu onClick={() => console.log('help click')} />
        </div>
      </div>

      <div className='flex-1 p-2 overflow-hidden overflow-y-auto'>
        {openMembers ? (
          <ChannelMemberList channel={channel} />
        ) : (
          <ChatHistory messages={messages} chatEndRef={chatEndRef} />
        )}
      </div>

      <div className='w-full p-2'>
        <div
          className={cn([
            'flex border rounded-md w-full justify-between',
            openMembers && 'hidden',
          ])}
        >
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
