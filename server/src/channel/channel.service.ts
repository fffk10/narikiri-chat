import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

import { Channel, Prisma } from '@prisma/client'

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  async channels(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }) {
    return [{ id: 1, name: 'channel 1' }]
    // return this.prisma.channel.findMany()
  }
}
