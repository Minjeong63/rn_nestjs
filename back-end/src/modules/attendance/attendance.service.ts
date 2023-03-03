import { BadRequestException, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'kindagoose';
import { FilterQuery } from 'mongoose';
import { Attendance, TimeList } from 'src/models/attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance)
    private readonly model: ReturnModelType<typeof Attendance>,
  ) {}

  async timeListInit(id: string) {
    const data = await this.getTimeList(id['id']);
    if (data) throw new BadRequestException();

    const dataInit: Attendance = {
      id: id['id'],
      workAWeek: [
        { key: 0, start: '0', end: '0' },
        { key: 1, start: '0', end: '0' },
        { key: 2, start: '0', end: '0' },
        { key: 3, start: '0', end: '0' },
        { key: 4, start: '0', end: '0' },
      ],
    };
    return await this.model.create(dataInit);
  }

  async getTimeList(id: string) {
    const filter: FilterQuery<Attendance> = {
      id: id,
    };
    return await this.model.findOne(filter);
  }

  async patchTimeById(timeList: TimeList, id: string) {
    const data = await this.getTimeList(id);
    if (!data) throw new BadRequestException();
    const datas = {
      workAWeek: timeList,
    };
    return await this.model.findByIdAndUpdate(data._id, datas);
  }
}
