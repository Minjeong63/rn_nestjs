import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { Request, Response } from 'express';
import { KakaoAuthGuard } from './kakao/kakao.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Social Login API')
@Controller('oauth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Get('/kakao')
  @ApiOperation({ summary: '카카오 소셜 로그인 redirect 할 곳' })
  // 인증 과정을 거쳐야 하기 때문에 UseGuards를 써주고 passport 인증으로 AuthGuard를 써줌
  @UseGuards(KakaoAuthGuard)
  async kakaoAuth(@Req() req: Request, @Res() res: Response) {
    // 프로필을 받아온 다음, 로그인을 처리해야 하는 곳 (oauth.service.ts에서 선언해줌)
    return this.oauthService.oauthLogin(req, res);
  }
}
