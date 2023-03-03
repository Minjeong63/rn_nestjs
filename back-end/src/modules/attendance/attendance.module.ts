import { Module } from '@nestjs/common';
import { KindagooseModule } from 'kindagoose';
import { Attendance } from 'src/models/attendance.entity';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';

@Module({
  imports: [KindagooseModule.forFeature([Attendance])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
