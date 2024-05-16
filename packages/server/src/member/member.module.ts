import { Module } from '@nestjs/common'
import { MemberService } from '@/member/member.service'
import { MemberController } from '@/member/member.controller'
import { PrismaService } from '@/prisma/prisma.service'

@Module({
  providers: [MemberService, PrismaService],
  controllers: [MemberController],
})
export class MemberModule {}
