import { Channel } from '@prisma/client'
import axios from 'axios'
import { Metadata } from 'next'

import ChannelEmpty from '@/components/chat/channel-empty'
import ChannelList from '@/components/chat/channel-list'
import { auth } from '@clerk/nextjs/server'

export const metadata: Metadata = {
  title: 'Chat',
  description: 'Chat menu.',
}

export default async function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { userId } = auth().protect()
  if (!userId) return null

  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/channel`
  const channels: Channel[] = await axios
    .get(url, { params: { userId: userId } })
    .then((res) => res.data)
    .catch(() => null)

  if (!!channels && channels?.length === 0) {
    return <ChannelEmpty />
  }

  return (
    <div className='flex-1 flex h-full'>
      <ChannelList channels={channels} />
      {children}
    </div>
  )
}
