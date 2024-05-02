import { Channel } from '@prisma/client'
import { Metadata } from 'next'

import ChatSidebar from '@/components/chat/chat-sidebar'

export const metadata: Metadata = {
  title: 'Chat',
  description: 'Chat menu.',
}

export default async function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const fetchChannels = async (): Promise<Channel[]> => {
    setTimeout(() => {}, 1000)

    return [
      {
        id: '1',
        name: 'general',
        owner: 'owner',
        description: '説明',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'second',
        owner: 'owner',
        description: '説明',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        name: 'third',
        owner: 'owner',
        description: '説明',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
  }

  const channels: Channel[] | null = await fetchChannels()

  if (channels && channels?.length === 0) {
    return (
      <div className='text-center'>
        参加しているチャンネルがありません。
        <br />
        チャンネルを検索するか、新しいチャンネルを作成してください。
      </div>
    )
  }

  return (
    <div className='flex h-full'>
      <ChatSidebar channels={channels} />
      {children}
    </div>
  )
}
