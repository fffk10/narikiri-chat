import { ChannelService } from '@/channel/channel.service'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { Channel } from '@prisma/client'

@Controller('v1/channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get(':id')
  async channel(@Param('id') id: string): Promise<Channel> {
    return this.channelService.channel(id)
  }

  @Get()
  async channels(): Promise<Channel[]> {
    return this.channelService.channels()
  }

  @Post()
  async createChannel(
    @Body()
    data: {
      name: string
      ownerId: string
      description?: string
      imageUrl?: string
    }
  ): Promise<Channel> {
    const response = this.channelService.createChannel(data)
    return response
  }
}
