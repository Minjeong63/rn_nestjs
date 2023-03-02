import { BadRequestException, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from 'src/models/user.entity';
import { InjectModel } from 'kindagoose';
import { FilterQuery } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly model: ReturnModelType<typeof User>,
  ) {}

  /**
   * 회원가입하는 함수
   * @param userInfo 회원가입 데이터(id, name, hpNum)
   * @returns
   */
  async signUpUser(userInfo: User) {
    if (!userInfo) throw new BadRequestException();

    const user = await this.model.findOne(userInfo);
    if (user) throw new BadRequestException();
    return await this.model.create(userInfo);
  }

  /**
   * User db에 내 정보가 있는지 여부를 알아내는 함수
   * @param id 카카오 소셜 로그인 정보로 받아오는 id
   * @returns
   */
  async findUserById(id: string): Promise<User> {
    const filter: FilterQuery<User> = {
      id: id,
    };
    return await this.model.findOne(filter);
  }
}
