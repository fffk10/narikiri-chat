import { MemberService } from '@/member/member.service'
import { Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
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
}
