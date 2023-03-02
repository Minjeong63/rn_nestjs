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
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('users API')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'user 회원가입' })
  @ApiQuery({
    type: User,
  })
  async signUpUser(
    // @Req() req: Request,
    // @Res({ passthrough: true }) res: Response,
    @Body() userInfo: User,
  ): Promise<User> {
    return this.userService.signUpUser(userInfo);
  }
}
