import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';

const REST_API_KEY = '5dc50ab226c6121b6d5984501f093ece';
const REDIRECT_URI = 'http://192.168.0.8:19003/oauth/kakao';

@Injectable()
export class OauthService {
  constructor(private readonly httpService: HttpService) {}
  async oauthLogin(req: Request, res: Response) {
    res.redirect(`exp://192.168.0.8:19000/--/signUp?id=${res.req.user['id']}`);
  }

  /**
   * 아래 함수는 passport-kakao 없이 카카오 소셜 로그인을 구현할 때 필요한 코드
   */
  // async oauthLogin(req: Request) {
  // let accessToken;
  // try {
  //   const url = 'https://kauth.kakao.com/oauth/token';
  //   const options = {
  //     grant_type: 'authorization_code',
  //     client_id: REST_API_KEY,
  //     redirect_uri: REDIRECT_URI,
  //     code: req.query.code,
  //   };
  //   const header = {
  //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
  //   };
  //   const tokenResponse = await firstValueFrom(
  //     this.httpService.post(url, options, header).pipe(
  //       map((res) => res.data),
  //       catchError((err) => {
  //         throw new BadRequestException();
  //       }),
  //     ),
  //   );
  //   accessToken = tokenResponse.access_token;
  // } catch (err) {
  //   throw new BadRequestException();
  // }
  // try {
  //   const url = 'https://kapi.kakao.com/v2/user/me';
  //   const header = {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   };
  //   const response = await firstValueFrom(
  //     this.httpService.get(url, header).pipe(
  //       map((response) => response.data),
  //       catchError((error) => {
  //         throw new BadRequestException();
  //       }),
  //     ),
  //   );
  //   console.log(response);
  //   return response;
  // } catch (e) {
  //   throw new BadRequestException();
  // }
}
