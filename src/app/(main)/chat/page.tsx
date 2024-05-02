import { Channel } from '@prisma/client'

import { ScrollArea } from '@/components/ui/scroll-area'

export default async function ChatPage() {
  const fetchChannels = async (): Promise<Channel[]> => {
    setTimeout(() => {}, 1000)

    return [
      {
        id: '1',
        name: 'general',
        owner: 'owner',
        description: '説明',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
  }

  const channels: Channel[] | null = await fetchChannels()

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
    <div className='flex h-full'>
      <ScrollArea className='p-4 w-[220px] border'>
        <ul>
          {channels?.map((channel) => (
            <li key={channel.id}>{channel.name}</li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}
