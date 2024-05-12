'use client'

import ChatSidebarItems from '@/components/chat/chat-sidebar-items'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useModal } from '@/hooks/use-modal-store'
import { Channel } from '@prisma/client'
import { Plus } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

type ChannelListProps = {
  channels: Channel[]
}

export default function ChannelList({ channels }: ChannelListProps) {
  const { onOpen } = useModal()
  const router = useRouter()
  const pathname = usePathname()

  if (pathname !== '/chat') {
    return (
      <div className='hidden md:block p-4 w-full md:w-[220px] border'>
        <div className='flex justify-end'>
          <button onClick={() => onOpen('createChannel')}>
            <Plus size={16} />
          </button>
        </div>
        <ScrollArea>
          <ul>
            {channels?.map((channel) => (
              <ChatSidebarItems
                key={channel.id}
                channel={channel}
                onClick={() => router.push(`/chat/${channel.id}`)}
              />
            ))}
          </ul>
        </ScrollArea>
      </div>
    )
  }
  return (
    <div className='p-4 w-full md:w-[220px] border'>
      <div className='flex justify-end'>
        <button onClick={() => onOpen('createChannel')}>
          <Plus size={16} />
        </button>
      </div>
      <ScrollArea>
        <ul>
          {channels?.map((channel) => (
            <ChatSidebarItems
              key={channel.id}
              channel={channel}
              onClick={() => router.push(`/chat/${channel.id}`)}
            />
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}
