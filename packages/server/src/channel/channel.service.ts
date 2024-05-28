import { v4 as uuidv4 } from 'uuid'
import { Injectable } from '@nestjs/common'
import {
  Channel,
  ChannelMessage,
  ChannelType,
  MemberRole,
} from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  /**
   * 単体取得
   * @param where 検索条件
   * @returns チャンネル
   */
  async getChannelById(id: string): Promise<Channel | null> {
    return this.prisma.channel.findUnique({
      where: { id },
      include: {
        ChannelMember: {
          include: {
            member: {
              select: {
                id: true,
                userName: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    })
  }

  /**
   * 全体取得
   * @returns {Promise<Channel[]>} チャンネル一覧
   */
  async getChannels(userId: string): Promise<Channel[]> {
    const response = await this.prisma.channel.findMany({
      where: {
        ChannelMember: {
          some: {
            memberId: userId,
          },
        },
      },
    })
    return response
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
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        inviteCode: uuidv4(),
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

  /**
   * 単体部分更新
   */
  async updateChannel(
    id: string,
    data: {
      name?: string
      description?: string
      imageUrl?: string
      inviteCode?: string
    }
  ): Promise<Channel> {
    return this.prisma.channel.update({
      where: {
        id,
      },
      data,
    })
  }

  /**
   * チャンネルメッセージ取得
   * @param channelId 取得対象のチャンネルID
   * @returns チャンネルのメッセージ履歴
   */
  async getMessages(channelId: string): Promise<ChannelMessage[]> {
    return this.prisma.channelMessage.findMany({
      where: {
        channelId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        sender: true,
      },
      take: 50,
    })
  }
}
