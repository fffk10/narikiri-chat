import { auth } from '@clerk/nextjs/server'
import { MemberRole } from '@prisma/client'
import axios from 'axios'
import { redirect } from 'next/navigation'

export default async function InvitePage({
  params,
}: {
  params: { inviteCode: string }
}) {
  const { userId } = auth()

  if (!userId) {
    return redirect('/login')
  }

  const targetChannelResponse = await axios
    .get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/channel/search?inviteCode=${params.inviteCode}`
    )
    .then((res) => res.data)
    .catch((error) => console.error(error))

  if (!targetChannelResponse) {
    return <div>不正な招待コードです</div>
  }

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/member`,
    {
      channelId: targetChannelResponse[0].id,
      memberId: userId,
      role: MemberRole.MEMBER,
    }
  )

  if (!response) {
    return <div>招待に失敗しました</div>
  }

  return redirect(`/chat/${targetChannelResponse[0].id}`)
}
