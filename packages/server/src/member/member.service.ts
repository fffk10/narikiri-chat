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
}
