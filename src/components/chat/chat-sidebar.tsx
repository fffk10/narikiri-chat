'use client'

import { Channel } from '@prisma/client'
import { useRouter } from 'next/navigation'

import ChatSidebarItems from '@/components/chat/chat-sidebar-items'
import { ScrollArea } from '@/components/ui/scroll-area'

type ChatSidebarProps = {
  channels: Channel[]
}

export default function ChatSidebar({ channels }: ChatSidebarProps) {
  const router = useRouter()

  const onClick = (id: string) => {
    router.push(`/chat/${id}`)
  }

  return (
    <ScrollArea className='p-4 w-[220px] border'>
      <ul>
        {channels?.map((channel) => (
          <ChatSidebarItems
            key={channel.id}
            channel={channel}
            onClick={() => onClick(channel.id)}
          />
        ))}
      </ul>
    </ScrollArea>
  )
}
