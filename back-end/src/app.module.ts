import { Module } from '@nestjs/common';
import { OauthModule } from './modules/oauth/oauth.module';
import { ConfigModule } from '@nestjs/config';
import { KindagooseModule } from 'kindagoose';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    OauthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    KindagooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
