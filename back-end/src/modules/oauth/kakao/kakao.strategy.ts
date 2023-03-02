import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';

@Injectable()
// UseGuards의 이름과 동일해야 함
export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  // constructor에서 성공하면 아래의 validate로 넘겨주고, 만약 실패하면 멈춰지고 에러 반환함
  // constructor은 인증하는 부분
  constructor() {
    // 자식의 constructor를 부모의 constructor에 넘기는 방법은 super를 사용하면 됨
    super({
      clientID: '5dc50ab226c6121b6d5984501f093ece',
      // clientSecret: '55ISSvrwuggsDT7Ejjt9EvOqH1BYsTIe', // 없어도 됨
      callbackURL: 'http://192.168.0.8:19003/oauth/kakao',
      //   scope: ['account_email', 'profile_nickname'],
    });
  }

  // validate는 인증결과를 받는 부분
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // console.log('accessToken', accessToken);
    // console.log('profile', profile);
    return {
      id: profile.id,
      //   name: profile.displayName,
      //   email: profile._json.kakao_account.email,
      //   password: profile.id,
      //   nickname: profile._json.kakao_account.profile.nickname,
    };
  }
}
