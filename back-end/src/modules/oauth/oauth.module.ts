import { Module } from '@nestjs/common';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtKakaoStrategy } from 'src/modules/oauth/kakao.strategy';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [JwtModule.register({}), HttpModule],
  controllers: [OauthController],
  providers: [OauthService, JwtKakaoStrategy],
})
export class OauthModule {}
