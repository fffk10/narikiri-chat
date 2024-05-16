import { Channel, MemberRole } from '@prisma/client'
export interface ChannelMessageResponse {
  id: string
  channelId: string
  senderId: string
  content: string
  createdAt: Date
  updatedAt: Date
  sender: {
    id: string
    name: string
    imageUrl?: string
  }
}

export interface ChannelResponse extends Channel {
  ChannelMember: {
    channelId: string
    memberId: string
    role: MemberRole
  }[]
}
