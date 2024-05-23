import { Controller, Post, Body } from '@nestjs/common'

import { MessageService } from '@/message/message.service'
import { ApiTags } from '@nestjs/swagger'

@Controller('v1/message')
@ApiTags('/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async postMessage(@Body() data: ChannelMessagePostRequest) {
    return this.messageService.postMessage(data)
  }
}
