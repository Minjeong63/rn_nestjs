import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Swagger 설정
   */
  const config = new DocumentBuilder()
    .setTitle('API server')
    .setDescription('rn_nest project API description')
    .setVersion('1.0.0')
    .build();

  // config를 바탕으로 swagger document 생성
  const document = SwaggerModule.createDocument(app, config);

  // swagger UI에 대한 path를 연결함
  // .setup("swagger ui endpoint". app, swagger_document)
  SwaggerModule.setup('api', app, document);

  await app.listen(19003);
}
bootstrap();
