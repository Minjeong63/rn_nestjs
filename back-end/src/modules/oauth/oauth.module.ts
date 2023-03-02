import { Module, forwardRef } from '@nestjs/common';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtKakaoStrategy } from 'src/modules/oauth/kakao/kakao.strategy';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [JwtModule.register({}), HttpModule, UsersModule],
  controllers: [OauthController],
  providers: [OauthService, JwtKakaoStrategy],
})
export class OauthModule {}
