import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/models/user.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async signUpUser(
    // @Req() req: Request,
    // @Res({ passthrough: true }) res: Response,
    @Body() userInfo: User,
  ): Promise<User> {
    return this.userService.signUpUser(userInfo);
  }
}
