import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async postMessage(data: ChannelMessagePostRequest) {
    return this.prisma.channelMessage.create({
      data: {
        channelId: data.channelId,
        senderId: data.senderId,
        content: data.content,
      },
    })
  }
}
