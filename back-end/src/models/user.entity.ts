import { modelOptions, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class User extends TimeStamps {
  @prop({ unique: true })
  id: string;

  @prop()
  name: string;

  @prop()
  hpNum: string;
}
