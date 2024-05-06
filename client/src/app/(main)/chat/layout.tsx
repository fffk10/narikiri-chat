import { Channel } from '@prisma/client'
import axios from 'axios'
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
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/channel`
  const channels: Channel[] = await axios.get(url).then((res) => res.data)

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
    <div className='flex-1 flex h-full'>
      <ChatSidebar channels={channels} />
      {children}
    </div>
  )
}
