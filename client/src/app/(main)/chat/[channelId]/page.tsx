import { Channel, ChannelMessage } from '@prisma/client'

const dummyResponse: ChannelMessage[] = [
  {
    id: '1',
    channelId: 'channel1',
    senderId: 'user1',
    content: 'Hello, world!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    channelId: 'channel1',
    senderId: 'user2',
    content: 'Hi there!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1',
    channelId: 'channel1',
    senderId: 'user1',
    content: 'Hello, world!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    channelId: 'channel1',
    senderId: 'user2',
    content: 'Hi there!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1',
    channelId: 'channel1',
    senderId: 'user1',
    content: 'Hello, world!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    channelId: 'channel1',
    senderId: 'user2',
    content: 'Hi there!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1',
    channelId: 'channel1',
    senderId: 'user1',
    content: 'Hello, world!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    channelId: 'channel1',
    senderId: 'user2',
    content: 'Hi there!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1',
    channelId: 'channel1',
    senderId: 'user1',
    content: 'Hello, world!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    channelId: 'channel1',
    senderId: 'user2',
    content: 'Hi there!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1',
    channelId: 'channel1',
    senderId: 'user1',
    content: 'Hello, world!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    channelId: 'channel1',
    senderId: 'user2',
    content: 'Hi there!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1',
    channelId: 'channel1',
    senderId: 'user1',
    content: 'Hello, world!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    channelId: 'channel1',
    senderId: 'user2',
    content: 'Hi there!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1',
    channelId: 'channel1',
    senderId: 'user1',
    content: 'Hello, world!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    channelId: 'channel1',
    senderId: 'user2',
    content: 'Hi there!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1',
    channelId: 'channel1',
    senderId: 'user1',
    content: 'Hello, world!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    channelId: 'channel1',
    senderId: 'user2',
    content: 'Hi there!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1',
    channelId: 'channel1',
    senderId: 'user1',
    content: 'Hello, world!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    channelId: 'channel1',
    senderId: 'user2',
    content: 'Hi there!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1',
    channelId: 'channel1',
    senderId: 'user1',
    content: 'Hello, world!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    channelId: 'channel1',
    senderId: 'user2',
    content: 'Hi there!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1',
    channelId: 'channel1',
    senderId: 'user1',
    content: 'Hello, world!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    channelId: 'channel1',
    senderId: 'user2',
    content: 'Hi there!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1',
    channelId: 'channel1',
    senderId: 'user1',
    content: 'Hello, world!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    channelId: 'channel1',
    senderId: 'user2',
    content: 'Hi there!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1',
    channelId: 'channel1',
    senderId: 'user1',
    content: 'Hello, world!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    channelId: 'channel1',
    senderId: 'user2',
    content: 'Hi there!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1',
    channelId: 'channel1',
    senderId: 'user1',
    content: 'Hello, world!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    channelId: 'channel1',
    senderId: 'user2',
    content: 'Hi there!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1',
    channelId: 'channel1',
    senderId: 'user1',
    content: 'Hello, world!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    channelId: 'channel1',
    senderId: 'user2',
    content: 'Hi there!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1',
    channelId: 'channel1',
    senderId: 'user1',
    content: 'Hello, world!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    channelId: 'channel1',
    senderId: 'user2',
    content: 'Hi there!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1',
    channelId: 'channel1',
    senderId: 'user1',
    content: 'Hello, world!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    channelId: 'channel1',
    senderId: 'user2',
    content: 'Hi there!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1',
    channelId: 'channel1',
    senderId: 'user1',
    content: 'Hello, world!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    channelId: 'channel1',
    senderId: 'user2',
    content: 'Hi there!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1',
    channelId: 'channel1',
    senderId: 'user1',
    content: 'Hello, world!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    channelId: 'channel1',
    senderId: 'user2',
    content: 'Hi there!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default async function ChannelPage({
  params,
}: {
  params: { channelId: string }
}) {
  const channel: Channel = {
    id: 'channel1',
    name: 'general',
    owner: 'owner',
    description: '説明',
    imageUrl: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const fetchChannelMessages = async () => {
    setTimeout(() => {}, 2000)
    return dummyResponse
  }

  const channelMessages = await fetchChannelMessages()

  return (
    <div className='flex flex-col flex-1'>
      <div className='p-2'>
        <p className='text-xl'>{channel.name}</p>
      </div>

      <div className='p-2 overflow-hidden overflow-y-auto'>
        {channelMessages.map((message) => (
          <div key={message.id}>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}