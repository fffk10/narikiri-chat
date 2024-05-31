import { useModal } from '@/hooks/use-modal-store'
import { ChannelResponse } from '@/types/channel-types'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Shield, UserRoundPlus } from 'lucide-react'
import Image from 'next/image'

type ChannelMemberListProps = {
  channel: ChannelResponse
}

export default function ChannelMemberList({ channel }: ChannelMemberListProps) {
  const { ChannelMember } = channel
  const { onOpen } = useModal()

  return (
    <div className='relative h-full'>
      <ScrollArea>
        {ChannelMember.map((member) => (
          <div key={member.memberId} className='flex gap-2 border-b p-2'>
            <div className='min-w-[40px]'>
              <Image
                src={member.member.imageUrl || '/user.svg'}
                alt='user image'
                width={40}
                height={40}
                className='rounded-full border'
              />
            </div>
            <p className='flex my-auto'>
              {member.member.userName} {member.role === 'ADMIN' && <Shield />}
            </p>
          </div>
        ))}
      </ScrollArea>
      <div className='absolute bottom-2 right-2 md:bottom-10 md:right-10 w-12 h-12 bg-green-400 rounded-full'>
        <UserRoundPlus
          className='h-full m-auto'
          color='white'
          onClick={() => onOpen('invite', { channel })}
        />
      </div>
    </div>
  )
}
