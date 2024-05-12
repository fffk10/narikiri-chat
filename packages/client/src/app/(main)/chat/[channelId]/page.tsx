import { Channel } from '@prisma/client'
import axios from 'axios'

import Image from 'next/image'
import { ChannelMessageResponse } from '@/types/channel-types'

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

  return (
    <div className='flex flex-col flex-1 p-2'>
      <div className='p-2 flex justify-between'>
        <p className='text-xl'>{channel.name}</p>
        <div>buttons</div>
      </div>

      {channelMessages && channelMessages?.length === 0 ? (
        <div className='m-auto'>
          会話履歴がありません。さぁ会話を始めましょう！
        </div>
      ) : (
        <div className='p-2 overflow-hidden overflow-y-auto'>
          {channelMessages.map((message) => (
            <div
              key={message.id}
              className='text-sm p-2 border-b border-gray-200 flex'
            >
              <div className='min-w-[40px]'>
                <Image
                  src={message.sender.imageUrl || '/user.svg'}
                  alt='user image'
                  width={40}
                  height={40}
                  className='rounded-full border'
                />
              </div>
              <div className='ml-2'>
                <p className='mb-1'>{message.sender.name}</p>
                <p className='ml-1 '>{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
