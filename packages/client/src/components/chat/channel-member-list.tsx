import { ChannelMemberWithUserData } from '@/types/channel-types'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Shield } from 'lucide-react'
import Image from 'next/image'

type ChannelMemberListProps = {
  members: ChannelMemberWithUserData[]
}

export default function ChannelMemberList({ members }: ChannelMemberListProps) {
  return (
    <ScrollArea>
      {members.map((members) => (
        <div id={members.member.id} className='flex gap-2 border-b py-2'>
          <div className='min-w-[40px]'>
            <Image
              src={members.member.imageUrl || '/user.svg'}
              alt='user image'
              width={40}
              height={40}
              className='rounded-full border'
            />
          </div>
          <p className='flex my-auto'>
            {members.member.name} {members.role === 'ADMIN' && <Shield />}
          </p>
        </div>
      ))}
    </ScrollArea>
  )
}
