import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OauthModule } from './modules/oauth/oauth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    OauthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true, // 몽구스에서 필요로 하는 두 번째 인자 -1
      useUnifiedTopology: true, // 몽구스에서 필요로 하는 두 번째 인자 -2
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
