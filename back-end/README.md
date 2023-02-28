# memolist_backend

## kakaoLogin 구현 (passport-kakao 사용)

1. kakao developer에서 어플리케이션 생성
2. 카카오 로그인 탭에 들어가서 활성화 설정 on으로 바꿔주기
3. 카카오 로그인 탭 맨 밑에 있는 Redirect URI 설정해주기
4. kakao.guard.ts 파일 생성
5. kakao.strategy.ts 파일 생성 (clientID, callbackURL (=Redirect URI) 지정)
6. oauth.module.ts 파일의 providers에 JwtKakaoStrategy 추가하기
7. oauth.controller.ts 파일에 kakao.strategy.ts 파일에서 지정한 callbackURL을 경로로 한 컨트롤러 생성

## Nestjs에서 .env 파일 사용하는 법

1. ConfigModule 설치
<pre><code>npm i --save @nestjs/config</code></pre>

2. AppModule로 가서 imports 안에 ConfigModule.forRoot()를 넣어줌

3. .env 안의 변수가 필요한 파일에 가서 process.env.[파일명] 으로 변수를 사용하면 됨

## @Res 사용법
