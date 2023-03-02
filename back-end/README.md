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

## Swagger 사용법

1. 설치
<pre><code>yarn add --save @nestjs/swagger swagger-ui-express</code></pre>

2. main.ts 파일에 swagger 설정
<pre><code>
const config = new DocumentBuilder().setTitle('API server').setDescription('rn_nest project API description').setVersion('1.0.0').build()

// config를 바탕으로 swagger document 생성
const document = SwaggerModule.createDocument(app, config)

// swagger UI에 대한 path를 연결함
// .setup("swagger ui endpoint". app, swagger_document)
SwaggerModule.setup('api', app, document);
</code></pre>

3. @ApiProperty

- entity property들에 대해 예시와 설명을 보여줄 수 있음

4. @ApiTags

- controller에 @ApiTags를 사용하면 해당 controller에 속해있는 모든 api들이 작성한 tag 하위에 나타나게 됨

5. @ApiOperation

- API 동작에 대한 설명을 추가할 수 있음 (summary property를 사용)

6. @ApiResponse

- API의 Response 값에 대한 예시를 swagger 문서에 표시할 수 있음

7. @ApiQuery

- Query로 받을 값에 대한 명세를 표시할 수 있음
- name property를 통해 query를 받은 변수의 이름을 설정할 수 있고, type property를 통해 어떤 type으로 query를 받을 것인지 지정할 수 있음
- enum property를 이용하면 enum에 지정된 값으로 제한이 된다는 것을 표시할 수 있으며, swagger를 통해 실행을 할 때 enum에 해당하는 값으로 api를 실행해볼 수 있음

8. ApiParam

- param으로 받을 값에 대한 명세를 표시할 수 있음
- name property를 이용해서 parameter의 값을 받을 변수의 이름을 지정하고, type property를 통해 param의 type을 명시할 수 있음

9. ApiBody

- Body로 받을 값에 대한 명세를 표시할 수 있음
- description property를 사용하면 body에 대한 설명을 표시할 수 있고, type property를 통해 입력받는 type을 표시해줄 수 있음
