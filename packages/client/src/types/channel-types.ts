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
