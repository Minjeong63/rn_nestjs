import { prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class Todo extends TimeStamps {
  @ApiProperty({ description: 'user의 id' })
  @prop({ required: true })
  id: string;

  @ApiProperty({ description: 'user의 할 일' })
  @prop()
  content: string;

  @ApiProperty({ description: 'WORK or TRAVEL' })
  @prop()
  type: todoType;

  @ApiProperty({ description: '할 일 완료 여부' })
  @prop()
  complete: boolean;
}

export enum todoType {
  WORK = 'WORK',
  TRAVEL = 'TRAVEL',
}
