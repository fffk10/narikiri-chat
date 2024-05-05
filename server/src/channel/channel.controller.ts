import { ChannelService } from '@/channel/channel.service'
import { Controller, Get, Param } from '@nestjs/common'

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get(':id')
  async channel(@Param('id') id: string) {
    return this.channelService.channel(id)
  }

  @Get()
  async channels() {
    return this.channelService.channels()
  }
}
