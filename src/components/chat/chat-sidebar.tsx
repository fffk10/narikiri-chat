'use client'

import { Channel } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import ChatSidebarItems from '@/components/chat/chat-sidebar-items'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useModal } from '@/hooks/use-modal-store'

type ChatSidebarProps = {
  channels: Channel[]
}

export default function ChatSidebar({ channels }: ChatSidebarProps) {
  const { onOpen } = useModal()

  const router = useRouter()

  const onClick = (id: string) => {
    router.push(`/chat/${id}`)
  }

  return (
    <div className='p-4 w-[220px] border'>
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
              onClick={() => onClick(channel.id)}
            />
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}
