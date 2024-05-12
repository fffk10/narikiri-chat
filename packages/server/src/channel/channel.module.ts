import { Module } from '@nestjs/common'
import { ChannelController } from '@/channel/channel.controller'
import { ChannelService } from '@/channel/channel.service'
import { PrismaService } from '@/prisma/prisma.service'

@Module({
  controllers: [ChannelController],
  providers: [PrismaService, ChannelService],
})
export class ChannelModule {}
