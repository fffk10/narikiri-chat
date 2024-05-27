import { Channel, ChannelMember, MemberRole, User } from '@prisma/client'
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
  ChannelMember: ChannelMemberWithUserData[]
}

export interface ChannelMemberWithUserData extends ChannelMember {
  memberId: string
  channelId: string
  role: MemberRole
  member: User
}
