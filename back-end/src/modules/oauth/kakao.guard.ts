import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

export class KakaoAuthGuard extends AuthGuard('kakao') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(err, user, info) {
    // console.log('*** handleRequest in JwtAuthGuard (4/4)');
    // console.log('error', err);
    // console.log('user', user);
    // console.log('info', info);

    // if (err || !user) {
    //   return null;
    // }
    return user;
  }
}
