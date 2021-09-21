import { Injectable } from "@nestjs/common";import { HttpService } from "@nestjs/axios";import { Day } from "./models/day.model";import { lastValueFrom } from "rxjs";import { AxiosResponse } from "axios";import { SearchParams } from "./models/search-params.model";import { parse } from "node-html-parser";import { Lesson } from "./models/lesson.model";// eslint-disable-next-line @typescript-eslint/no-var-requiresconst encoding = require("encoding");@Injectable()export class ScheduleService {  constructor(private http: HttpService) {  }  async getSchedule(searchParams: SearchParams[]): Promise<Day[]> {    let parsedDays: Day[] = [];    for (const params of searchParams) {      const response = await this.getResponseHTML(params);      const convertedByteArray = encoding.convert(response.data, "UTF-8", "windows-1251");      parsedDays = parsedDays.concat(this.parseDaysFromHTML(convertedByteArray.toString()));    }    return parsedDays;  }  private getResponseHTML(searchParams: SearchParams): Promise<AxiosResponse> {    const rawSearchParams =      // `faculty=${searchParams.faculty}&` +      `group=${this.groupNameToHex(searchParams.group)}&` +      `teacher=${searchParams.teacher}&` +      `sdate=${searchParams.startDate}&` +      `edate=${searchParams.endDate}`;    return lastValueFrom(this.http.post(      "http://195.95.232.162:8082/cgi-bin/timetable.cgi?n=700",      rawSearchParams, {        responseType: "arraybuffer",      },    ));  }  private parseDaysFromHTML(html: string): Day[] {    let parsedDays: Day[] = [];    const root = parse(html, {      blockTextElements: { script: false },    });    const rawDaysOfTheWeekAndDate = root.querySelectorAll("div.row+h4, div.col-md-6 h4");    rawDaysOfTheWeekAndDate.forEach((element, index) => {      parsedDays[index] = new Day();      parsedDays[index].name = element.querySelector("small").innerHTML;      parsedDays[index].date = element.innerHTML.substring(0, 10);    });    let i = 0;    // const rawLessonsByDay: any[] = [];    const allRawLessons = root.querySelectorAll("tr").map((rawLesson) => {      const lessonOrder = rawLesson.querySelector("td").innerHTML;      parsedDays[i].lessons[+lessonOrder] = new Lesson();      parsedDays[i].lessons[+lessonOrder].order = +rawLesson.querySelectorAll("td")[0].innerHTML;      parsedDays[i].lessons[+lessonOrder].time =        rawLesson.querySelectorAll("td")[1]          .innerHTML          .replace("<br>", ":");      parsedDays[i].lessons[+lessonOrder].type = rawLesson.querySelectorAll("td")[2].innerHTML.match("<td>(.*?)<br>")[0];      // rawLessonsByDay[i] += rawLesson;      if (+lessonOrder === 1) {        i++;      }    });    console.log(parsedDays);    // const allRawLessons = root.querySelectorAll("tr").filter((rawLesson, index) => {    //   if (rawLesson.querySelectorAll("td")[2].innerHTML === " ") {    //     return false;    //   }    //    //    //   return true;    //   // return element.querySelectorAll("td")[2].innerHTML !== " ";    // });    // console.log(allRawLessons.toString());    // allRawLessons.forEach((element, index) => {    //    // });    // const lessonOrders = num    // console.log(rawDaysOfTheWeekAndDate.toString());    // console.log(allRawLessons.toString());    return [new Day(), new Day()];  }  private joinSameDays(days: Day[]): Day[] {    return [new Day()];  }  private groupNameToHex(groupName: string): string {    return groupName;  }}