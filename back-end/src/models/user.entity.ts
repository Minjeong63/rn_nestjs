import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class User extends TimeStamps {
  @ApiProperty({ description: '카카오 소셜 로그인 정보의 id' })
  @prop({ unique: true })
  id: string;

  @ApiProperty({ example: '홍길동', description: '회원가입 (이름)' })
  @prop()
  name: string;

  @ApiProperty({
    example: '010011112222',
    description: '회원가입 (휴대전화번호)',
  })
  @prop()
  hpNum: string;
}
