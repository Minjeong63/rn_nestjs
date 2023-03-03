import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { TimeList } from 'src/models/attendance.entity';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('attendance API')
@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post()
  @ApiOperation({ summary: '일주일치 출퇴근 목록 초기화' })
  async timeListInit(@Body() id: string) {
    return this.attendanceService.timeListInit(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'id에 해당하는 timeList 반환' })
  @ApiParam({ name: 'id', description: `attendance의 id` })
  async getTimeList(@Param('id') id: string) {
    return this.attendanceService.getTimeList(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '출퇴근 수정' })
  @ApiParam({ name: 'id', description: `Attendance의 _id` })
  async patchTimeById(@Body() timeList: TimeList, @Param('id') id: string) {
    return this.attendanceService.patchTimeById(timeList, id);
  }
}
