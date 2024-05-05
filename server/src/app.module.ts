import { Module } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { ChannelModule } from '@/channel/channel.module'

@Module({
  imports: [ChannelModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
