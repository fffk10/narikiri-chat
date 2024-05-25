import { RegisterMemberDto } from '@/member/dto/member.dto'
import { MemberService } from '@/member/member.service'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger'
import { channel } from 'diagnostics_channel'

@Controller('v1/member')
@ApiTags('/member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get(':channelId')
  @ApiOperation({ summary: 'チャンネルに所属するメンバー一覧取得' })
  @ApiParam({
    name: 'channelId',
    type: String,
    example: 'test-channel-id',
  })
  async getMembers(@Param('channelId') channelId: string) {
    return this.memberService.getMembers(channelId)
  }

  @Post()
  @ApiOperation({ summary: 'チャンネルにメンバーを追加' })
  @ApiBody({
    type: RegisterMemberDto,
  })
  async registerMember(@Body() registerMemberRequest: RegisterMemberDto) {
    console.log(registerMemberRequest)
    return this.memberService.registerMember(registerMemberRequest)
  }
}
