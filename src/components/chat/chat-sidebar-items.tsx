import { Channel } from '@prisma/client'

type ChatSidebarItems = {
  channel: Channel
}

export default function ChatSidebarItems({ channel }: ChatSidebarItems) {
  return <li key={channel.id}>{channel.name}</li>
}
