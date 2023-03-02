import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { KindagooseModule } from 'kindagoose';
import { User } from 'src/models/user.entity';

@Module({
  imports: [KindagooseModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
