import { ChannelService } from '@/channel/channel.service'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { Channel, ChannelMessage } from '@prisma/client'

@Controller('v1/channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get(':id')
  async channel(@Param('id') id: string): Promise<Channel> {
    return this.channelService.getChannelById(id)
  }

  @Get()
  async channels(): Promise<Channel[]> {
    return this.channelService.getChannels()
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

  @Get(':id/message')
  async messages(@Param('id') id: string): Promise<ChannelMessage[]> {
    const response = await this.channelService.getMessages(id)
    return response
  }
}
