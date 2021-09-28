import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { ScheduleService } from "./schedule.service";
import { SearchParams } from "./models/search-params.model";

@Controller("api/schedule")
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {
  }

  @Post()
  async getSchedule(@Body() searchParams: SearchParams[]) {
    return this.scheduleService.getSchedule(searchParams);
  }

  @Get("/autocomplete/teachers")
  async getTeacherAutocomplete(@Query("query") query: string) {
    return await this.scheduleService.getTeacherAutocomplete(query);
  }

  @Get("/autocomplete/groups")
  async getGroupAutocomplete(@Query("query") query: string) {
    return await this.scheduleService.getGroupAutocomplete(query);
  }
}
