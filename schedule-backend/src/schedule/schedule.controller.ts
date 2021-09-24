import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { ScheduleService } from "./schedule.service";
import { SearchParams } from "./models/search-params.model";

@Controller("api/schedule")
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {
  }

  // @Get()
  // async getScheduleTest() {
  //   const a = [
  //     {
  //       id: 0,
  //       faculty: 1004,
  //       group: "ПЗ-1904+ск",
  //       // group: "%CF%C7-2104",
  //       // group: "%CF%C7-2004",
  //       // group: "%CF%C7-1904%2B%F1%EA",
  //       teacher: "",
  //       startDate: "17.09.2021",
  //       endDate: "30.09.2021",
  //       isForMonth: false,
  //     },
  //     {
  //       id: 0,
  //       faculty: 1004,
  //       group: "Б-3к-121",
  //       // group: "%CF%C7-2104",
  //       // group: "%CF%C7-2004",
  //       // group: "%CF%C7-1904%2B%F1%EA",
  //       teacher: "",
  //       startDate: "17.09.2021",
  //       endDate: "10.10.2021",
  //       isForMonth: false,
  //     },
  //   ];
  //
  //   return this.scheduleService.getSchedule(a);
  // }

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
    console.log("asdf");
    return await this.scheduleService.getGroupAutocomplete(query);
  }
}
