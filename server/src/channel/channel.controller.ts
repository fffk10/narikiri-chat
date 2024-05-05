import { ChannelService } from '@/channel/channel.service'
import { Controller, Get } from '@nestjs/common'

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  async channels() {
    return this.channelService.channels({})
  }
}
