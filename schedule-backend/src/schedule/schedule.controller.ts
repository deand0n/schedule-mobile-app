import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {
  }

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get()
  get() {
    const a = {
      id: 0,
      faculty: 1004,
      group: '%CF%C7-1904%2B%F1%EA',
      // teacher?: string;
      startDate: '17.09.2021',
      endDate: '30.09.2021',
      isForMonth: false,
    };

    return this.scheduleService.getScheduleDays(a);
  }

  // @Get()
  // findAll() {
  //   return this.scheduleService.findAll();
  // }

  // @Get()
  // findAll() {
  //   return this.scheduleService.findAll();
  // }

  // @Get()
  // getSchedule()

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.scheduleService.update(+id, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(+id);
  }
}
