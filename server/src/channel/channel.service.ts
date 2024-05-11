import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

import {
  Channel,
  ChannelMessage,
  ChannelType,
  MemberRole,
} from '@prisma/client'

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  /**
   * 単体取得
   * @param where 検索条件
   * @returns {Promise<Channel | null>} チャンネル
   */
  async getChannelById(id: string): Promise<Channel | null> {
    return this.prisma.channel.findUnique({ where: { id } })
  }

  /**
   * 全体取得
   * @returns {Promise<Channel[]>} チャンネル一覧
   */
  async getChannels(): Promise<Channel[]> {
    return this.prisma.channel.findMany()
  }

  /**
   * 単体登録
   * @param data 登録データ
   * @returns {Promise<Channel>} 登録したチャンネル
   */
  async createChannel(data: {
    name: string
    ownerId: string
    description?: string
    imageUrl?: string
  }): Promise<Channel> {
    let response = await this.prisma.channel.create({
      data: {
        ...data,
        ChannelMember: {
          create: {
            memberId: data.ownerId,
            role: MemberRole.ADMIN,
          },
        },
        ChannelDetail: {
          create: {
            type: ChannelType.PUBLIC,
          },
        },
      },
    })

    return response
  }

  async getMessages(channelId: string): Promise<ChannelMessage[]> {
    return this.prisma.channelMessage.findMany({
      where: {
        channelId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: 50,
    })
  }
}
