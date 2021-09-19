import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Day } from './models/day.model';
import { lastValueFrom, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { SearchParams } from './models/search-params.model';

@Injectable()
export class ScheduleService {
  constructor(private http: HttpService) {
  }

  async getSchedule(searchParams: SearchParams[]): Promise<Day[]> {
    let parsedDays: Day[] = [];

    for (const params of searchParams) {
      let res = await this.getResponseHTML(params);
      console.log(res.data)
      parsedDays = parsedDays.concat(this.parseDaysFromHTML(res.data));
    }


    console.log(parsedDays);

    return parsedDays;
  }

  private getResponseHTML(searchParams: SearchParams): Promise<AxiosResponse<string>> {
    const rawSearchParams =
      // `faculty=${searchParams.faculty}&` +
      `group=${this.groupNameToHex(searchParams.group)}&` +
      `teacher=${searchParams.teacher}&` +
      `sdate=${searchParams.startDate}&` +
      `edate=${searchParams.endDate}`;

    return lastValueFrom(this.http.post(
      'http://195.95.232.162:8082/cgi-bin/timetable.cgi?n=700',
      rawSearchParams,
    ));
  }

  private parseDaysFromHTML(html: string): Day[] {
    return [new Day(), new Day()];
  }

  private joinSameDays(days: Day[]): Day[] {
    return [new Day()];
  }

  private groupNameToHex(groupName: string): string {
    return groupName;
  }
}
