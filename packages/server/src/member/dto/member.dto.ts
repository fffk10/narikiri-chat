import { ApiProperty } from '@nestjs/swagger'
import { ChannelMember, MemberRole } from '@prisma/client'

export class UpsertMemberDto
  implements Omit<ChannelMember, 'createdAt' | 'updatedAt'>
{
  @ApiProperty({ description: 'チャンネルのID' })
  channelId: string

  @ApiProperty({ description: 'ユーザーのID' })
  memberId: string

  @ApiProperty({ description: 'メンバーの権限' })
  role: MemberRole
}
