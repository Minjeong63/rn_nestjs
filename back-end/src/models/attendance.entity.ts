import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class Attendance extends TimeStamps {
  @ApiProperty({ description: '카카오 소셜 로그인 정보의 id' })
  @prop({ required: true })
  id: string;

  @ApiProperty({ description: '일주일치 출,퇴근 시간, 월 ~ 금' })
  @prop()
  workAWeek: Array<TimeList>;
}

export class TimeList {
  @ApiProperty({ description: '요일 구분 (0: 월, 4: 금)' })
  @prop()
  key: number;

  @ApiProperty({ description: '출근 시간' })
  @prop()
  start?: string;

  @ApiProperty({ description: '퇴근 시간' })
  @prop()
  end?: string;
}
