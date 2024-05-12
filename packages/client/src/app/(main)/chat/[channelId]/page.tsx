import { Channel } from '@prisma/client'
import axios from 'axios'

import { ChannelMessageResponse } from '@/types/channel-types'
import ChatRoom from '@/components/chat/chat-room'

export default async function ChannelPage({
  params,
}: {
  params: { channelId: string }
}) {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/channel/${params.channelId}`
  const channel: Channel = await axios.get(url).then((res) => res.data)

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
