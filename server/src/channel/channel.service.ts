import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

import { Channel, Prisma } from '@prisma/client'

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  /**
   * 単体取得
   * @param where 検索条件
   * @returns {Promise<Channel | null>} チャンネル
   */
  async channel(id: string) {
    return this.prisma.channel.findUnique({ where: { id } })
  }

  /**
   * 全体取得
   * @returns {Promise<Channel[]>} チャンネル一覧
   */
  async channels() {
    return this.prisma.channel.findMany()
  }
}
