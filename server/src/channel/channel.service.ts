import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

import { Channel, ChannelType, MemberRole, Prisma } from '@prisma/client'
import { response } from 'express'

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  /**
   * 単体取得
   * @param where 検索条件
   * @returns {Promise<Channel | null>} チャンネル
   */
  async channel(id: string): Promise<Channel | null> {
    return this.prisma.channel.findUnique({ where: { id } })
  }

  /**
   * 全体取得
   * @returns {Promise<Channel[]>} チャンネル一覧
   */
  async channels(): Promise<Channel[]> {
    return this.prisma.channel.findMany()
  }

  /**
   * 単体登録
   * @param data 登録データ
   * @returns {Promise<Channel>} 登録したチャンネル
   */
  async createChannel(data: Prisma.ChannelCreateInput): Promise<Channel> {
    const { id, name, owner, imageUrl } = data
    // 作成日時と更新日時を設定
    const createdAt = new Date()
    const updatedAt = new Date()

    // チャンネル登録
    const response = await this.prisma.channel.create({
      data: {
        id,
        name,
        owner,
        imageUrl,
        createdAt,
        updatedAt,
        ChannelMember: {
          create: {
            memberId: owner,
            role: MemberRole.OWNER,
            createdAt,
            updatedAt,
          },
        },
      },
      include: {
        ChannelMember: true,
      },
    })

    return response
  }
}
