import { Channel } from '@prisma/client'
import axios from 'axios'
import { Metadata } from 'next'

import ChatSidebar from '@/components/chat/chat-sidebar'
import ChannelEmpty from '@/components/chat/channel-empty'

export const metadata: Metadata = {
  title: 'Chat',
  description: 'Chat menu.',
}

export default async function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/channel`
  const channels: Channel[] = await axios.get(url).then((res) => res.data)

  if (channels && channels?.length === 0) {
    return <ChannelEmpty />
  }

  return (
    <div className='flex-1 flex h-full'>
      <ChatSidebar channels={channels} />
      {children}
    </div>
  )
}
