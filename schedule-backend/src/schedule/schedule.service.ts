import { Injectable } from "@nestjs/common";import { HttpService } from "@nestjs/axios";import { Day } from "./models/day.model";import { lastValueFrom } from "rxjs";import { AxiosResponse } from "axios";import { SearchParams } from "./models/search-params.model";import { parse } from "node-html-parser";import { Lesson } from "./models/lesson.model";// eslint-disable-next-line @typescript-eslint/no-var-requiresconst encoding = require("encoding");@Injectable()export class ScheduleService {  constructor(private http: HttpService) {  }  async getSchedule(searchParams: SearchParams[]): Promise<Day[]> {    let parsedDays: Day[] = [];    for (const params of searchParams) {      const response = await this.getResponseHTML(params);      const convertedByteArray = encoding.convert(response.data, "UTF-8", "windows-1251");      parsedDays = parsedDays.concat(this.parseDaysFromHTML(convertedByteArray.toString()));    }    return parsedDays;  }  private getResponseHTML(searchParams: SearchParams): Promise<AxiosResponse> {    const rawSearchParams =      // `faculty=${searchParams.faculty}&` +      `group=${this.groupNameToHex(searchParams.group)}&` +      `teacher=${searchParams.teacher}&` +      `sdate=${searchParams.startDate}&` +      `edate=${searchParams.endDate}`;    return lastValueFrom(this.http.post(      "http://195.95.232.162:8082/cgi-bin/timetable.cgi?n=700",      rawSearchParams, {        responseType: "arraybuffer",      },    ));  }  private parseDaysFromHTML(html: string): Day[] {    const parsedDays: Day[] = [];    const root = parse(html, {      blockTextElements: { script: false },    });    // parse days    const rawDaysOfTheWeekAndDate = root.querySelectorAll("div.row+h4, div.col-md-6 h4");    rawDaysOfTheWeekAndDate.forEach((element, index) => {      parsedDays[index] = new Day();      parsedDays[index].name = element.querySelector("small").innerHTML;      parsedDays[index].date = element.innerHTML.substring(0, 10);    });    // parse lessons    let i = -1, offset = 0;    const allRawLessons = root.querySelectorAll("tr");    allRawLessons.forEach((rawLesson) => {      const lessonOrder = +rawLesson.querySelector("td").innerHTML - 1;      if (lessonOrder === 0) {        i++;        offset = 0;      }      const lessonIndex = lessonOrder + offset;      parsedDays[i].lessons[lessonIndex] = new Lesson();      parsedDays[i].lessons[lessonIndex].order =        +rawLesson.querySelectorAll("td")[0]          .innerHTML;      parsedDays[i].lessons[lessonIndex].time =        rawLesson.querySelectorAll("td")[1]          .innerHTML          .replace("<br>", ":");      const isMoreThanOneLesson =        rawLesson.querySelectorAll("td")[2]          .querySelectorAll("div.link")          .length > 1;      if (isMoreThanOneLesson) {        offset += 1;        parsedDays[i].lessons[lessonIndex + 1] = new Lesson();        parsedDays[i].lessons[lessonIndex + 1].order = parsedDays[i].lessons[lessonIndex].order;        parsedDays[i].lessons[lessonIndex + 1].time = parsedDays[i].lessons[lessonIndex].time;        parsedDays[i].lessons[lessonIndex + 1].type = "";        parsedDays[i].lessons[lessonIndex + 1].name = "";        parsedDays[i].lessons[lessonIndex + 1].groups = "aboba";      } else {        parsedDays[i].lessons[lessonIndex].type =          rawLesson.querySelectorAll("td")[2]            .innerHTML            .match("\((.*?)\)<br>")?.[1];        parsedDays[i].lessons[lessonIndex].name =          rawLesson.querySelectorAll("td")[2]            .innerHTML            .match("<br> (.*?)<br>")?.[1];        parsedDays[i].lessons[lessonIndex].groups =          rawLesson.querySelectorAll("td")[2]            .innerHTML            .match("<br>.*?<br>(.*?)<br>")?.[1].trim();      }    });    return parsedDays;  }  private joinSameDays(days: Day[]): Day[] {    return [new Day()];  }  private groupNameToHex(groupName: string): string {    return groupName;  }}