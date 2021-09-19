import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('api/schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {
  }

  @Get()
  async getSchedule() {
    const a = [
      {
        id: 0,
        faculty: 1004,
        group: '%CF%C7-1904%2B%F1%EA',
        teacher: '',
        startDate: '17.09.2021',
        endDate: '30.09.2021',
        isForMonth: false,
      }];

    return this.scheduleService.getSchedule(a);
  }

  // @Post()
  // async getSchedule(@Body searchParams: SearchParams) {
  //   const a = {
  //     id: 0,
  //     faculty: 1004,
  //     group: '%CF%C7-1904%2B%F1%EA',
  //     teacher: '',
  //     startDate: '17.09.2021',
  //     endDate: '30.09.2021',
  //     isForMonth: false,
  //   };
  //
  //   return this.scheduleService.getScheduleDays(a);
  // }
}
