'use client'

import { Channel } from '@prisma/client'
import { Plus } from 'lucide-react'
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

  const createChannel = () => {
    console.log('click')
  }

  return (
    <div className='p-4 w-[220px] border'>
      <div className='flex justify-end'>
        <button onClick={createChannel}>
          <Plus size={16} />
        </button>
      </div>
      <ScrollArea>
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
    </div>
  )
}
