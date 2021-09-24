import { Injectable } from "@nestjs/common";import { HttpService } from "@nestjs/axios";import { Day } from "./models/day.model";import { lastValueFrom, map } from "rxjs";import { SearchParams } from "./models/search-params.model";import { parse } from "node-html-parser";import { Lesson } from "./models/lesson.model";import { DateTime } from "luxon";// eslint-disable-next-line @typescript-eslint/no-var-requiresconst encoding = require("encoding");@Injectable()export class ScheduleService {  private SCHEDULE_URL = "http://195.95.232.162:8082/cgi-bin/timetable.cgi";  constructor(private http: HttpService) {  }  getTeacherAutocomplete(query: string): Promise<string[]> {    return lastValueFrom(      this.http.get(        `${this.SCHEDULE_URL}?n=701&lev=141&query=${encodeURIComponent(query)}`,        {          responseType: "arraybuffer",        })        .pipe(map((response) => {          const convertedByteArray = encoding.convert(response.data, "UTF-8", "windows-1251");          return JSON.parse(convertedByteArray.toString()).suggestions;        })),    );  }  getGroupAutocomplete(query: string): Promise<string[]> {    return lastValueFrom(      this.http.get(        `${this.SCHEDULE_URL}?n=701&lev=142&query=${encodeURIComponent(query)}`,        {          responseType: "arraybuffer",        })        .pipe(map((response) => {          const convertedByteArray = encoding.convert(response.data, "UTF-8", "windows-1251");          return JSON.parse(convertedByteArray.toString()).suggestions;        })),    );  }  async getSchedule(searchParams: SearchParams[]): Promise<Day[]> {    let parsedDays: Day[] = [];    for (const params of searchParams) {      const response = await this.getResponseHTML(params);      parsedDays = this.joinSameDays(parsedDays, this.parseDaysFromHTML(response, params.group));    }    return parsedDays;  }  private getResponseHTML(searchParams: SearchParams): Promise<string> {    // if groupName contains cyrillic then turn it to hex    const groupName = searchParams.group.match(/[\u0400-\u04FF]/)      ? this.groupNameToHex(searchParams.group)      : searchParams.group;        if (searchParams.isForMonth) {      searchParams.startDate = DateTime.now().toFormat("dd.LL.yyyy");      searchParams.endDate = DateTime.now()        .plus({ months: 1 })        .toFormat("dd.LL.yyyy");    }    const rawSearchParams =      // `faculty=${searchParams.faculty}&` +      `group=${groupName}&` +      `teacher=${searchParams.teacher}&` +      `sdate=${searchParams.startDate}&` +      `edate=${searchParams.endDate}`;    return lastValueFrom(      this.http.post(        `${this.SCHEDULE_URL}?n=700`,        rawSearchParams,        {          responseType: "arraybuffer",        })        .pipe(map((response) => {          const convertedByteArray = encoding.convert(response.data, "UTF-8", "windows-1251");          return convertedByteArray.toString();        })),    );  }  private parseDaysFromHTML(html: string, groupName: string): Day[] {    const parsedDays: Day[] = [];    const root = parse(html, {      blockTextElements: { script: false },    });    // parse days    const rawDaysOfTheWeekAndDate = root.querySelectorAll("div.row+h4, div.col-md-6 h4");    rawDaysOfTheWeekAndDate.forEach((element, index) => {      parsedDays[index] = new Day();      parsedDays[index].name = element.querySelector("small").innerHTML;      parsedDays[index].date = element.innerHTML        .match(/^(.*?)<small>/)[1]        .trim();    });    // parse lessons    let i = -1, offset = 0;    const allRawLessons = root.querySelectorAll("tr");    allRawLessons.forEach((rawLesson) => {      const lessonOrder = +rawLesson.querySelector("td").innerHTML - 1;      if (lessonOrder === 0) {        i++;        offset = 0;      }      const lessonIndex = lessonOrder + offset;      parsedDays[i].lessons[lessonIndex] = new Lesson();      parsedDays[i].lessons[lessonIndex].order =        +rawLesson.querySelectorAll("td")[0]          .innerHTML;      parsedDays[i].lessons[lessonIndex].time =        rawLesson.querySelectorAll("td")[1]          .innerHTML          .replace(/<br>/, ":");      parsedDays[i].lessons[lessonIndex].type =        rawLesson.querySelectorAll("td")[2]          .innerHTML          .match(/^\((.*?)\)<br>/)?.[1];      parsedDays[i].lessons[lessonIndex].name =        rawLesson.querySelectorAll("td")[2]          .innerHTML          .match(/<br>(.*?)<br>/)?.[1]          .trim();      parsedDays[i].lessons[lessonIndex].groups =        rawLesson.querySelectorAll("td")[2]          .innerHTML          .match(/<br>.*?<br>(.*?)<br>/)?.[1]          .trim() || groupName;      const isMoreThanOneLesson =        rawLesson.querySelectorAll("td")[2]          .querySelectorAll("div.link")          .length > 1;      if (isMoreThanOneLesson) {        offset += 1;        parsedDays[i].lessons[lessonIndex + 1] = new Lesson();        parsedDays[i].lessons[lessonIndex + 1].order = parsedDays[i].lessons[lessonIndex].order;        parsedDays[i].lessons[lessonIndex + 1].time = parsedDays[i].lessons[lessonIndex].time;        parsedDays[i].lessons[lessonIndex + 1].type =          rawLesson.querySelectorAll("td")[2]            .innerHTML            .match(/<\/div> <br>\((.*?)\)<br>/)?.[1]            .trim();        parsedDays[i].lessons[lessonIndex + 1].name =          rawLesson.querySelectorAll("td")[2]            .innerHTML            .match(/<br>\(.*?\)<br>(.*?)<br>/)?.[1]            .trim();        parsedDays[i].lessons[lessonIndex + 1].groups =          rawLesson.querySelectorAll("td")[2]            .innerHTML            .match(/<\/div> <br>(.*?)<br>(.*?)<br>(?<group>.*?)<br> <div class='link'> <\/div>/)            .groups.group.trim() || groupName;      }    });    return parsedDays;  }  private joinSameDays(days: Day[], daysToJoin: Day[]): Day[] {    daysToJoin.forEach((dayToJoin) => {      dayToJoin.lessons = dayToJoin.lessons.filter((lesson) => {        return lesson.type && lesson.name;      });      const containsThisDay = days.some((element) => element.date === dayToJoin.date);      if (containsThisDay) {        const dayIndex = days.indexOf(days.find((element) => element.date === dayToJoin.date));        days[dayIndex].lessons = days[dayIndex].lessons.concat(dayToJoin.lessons);      } else {        days.push(dayToJoin);      }    });    return days;  }  private groupNameToHex(groupName: string): string {    const matches = [...groupName.matchAll(/[\u0400-\u04FF]|\+/g)];    let hexString = groupName;    for (const match of matches) {      const win1251ByteArray = encoding.convert(match[0], "windows-1251", "UTF-8");      const hexCharacter = Buffer.from(win1251ByteArray).toString("hex");      hexString = hexString.replace(match[0], "%" + hexCharacter.toUpperCase());    }    return hexString;  }}