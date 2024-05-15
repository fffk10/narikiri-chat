import { Channel } from '@prisma/client'
import axios from 'axios'

import { ChannelMessageResponse } from '@/types/channel-types'
import ChatRoom from '@/components/chat/chat-room'
import { auth, clerkClient } from '@clerk/nextjs/server'

export default async function ChannelPage({
  params,
}: {
  params: { channelId: string }
}) {
  const { userId } = auth().protect()
  const user = await clerkClient.users.getUser(userId)

  if (!user) return null

  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/channel/${params.channelId}`
  const channel: Channel = await axios
    .get(url, { params: { userId: userId } })
    .then((res) => res.data)
    .catch(() => null)

  if (!channel) {
    return <div>Channel not found</div>
  }

  const fetchChannelMessages = async (): Promise<ChannelMessageResponse[]> => {
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/channel/${params.channelId}/message`
    const response = await axios.get(url).then((res) => res.data)
    return response
  }

  const channelMessages = await fetchChannelMessages()

  return <ChatRoom channel={channel} channelMessages={channelMessages} />
}
