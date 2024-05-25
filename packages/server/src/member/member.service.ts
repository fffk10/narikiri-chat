import { RegisterMemberDto } from '@/member/dto/member.dto'
import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService) {}

  async getMembers(channelId: string) {
    return this.prisma.channelMember.findMany({
      where: {
        channelId,
      },
    })
  }

  async registerMember(registerMemberRequest: RegisterMemberDto) {
    const { channelId, memberId, role } = registerMemberRequest
    return this.prisma.channelMember.create({
      data: {
        channelId,
        memberId,
        role: role || 'MEMBER',
      },
    })
  }
}
