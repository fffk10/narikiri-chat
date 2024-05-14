import { Module } from '@nestjs/common'

import { Gateway } from '@/gateway/gateway'
import { MessageService } from '@/message/message.service'
import { PrismaService } from '@/prisma/prisma.service'

@Module({
  providers: [Gateway, MessageService, PrismaService],
})
export class GatewayModule {}
