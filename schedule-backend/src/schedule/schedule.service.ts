import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Day } from './models/day.model';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { SearchParams } from './models/search-params.model';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const encoding = require('encoding');

@Injectable()
export class ScheduleService {
  constructor(private http: HttpService) {
  }

  async getSchedule(searchParams: SearchParams[]): Promise<Day[]> {
    let parsedDays: Day[] = [];

    for (const params of searchParams) {
      const response = await this.getResponseHTML(params);
      const convertedByteArray = encoding.convert(response.data, 'UTF-8', 'windows-1251');
      parsedDays = parsedDays.concat(this.parseDaysFromHTML(convertedByteArray.toString()));
    }

    return parsedDays;
  }

  private getResponseHTML(searchParams: SearchParams): Promise<AxiosResponse> {
    const rawSearchParams =
      // `faculty=${searchParams.faculty}&` +
      `group=${this.groupNameToHex(searchParams.group)}&` +
      `teacher=${searchParams.teacher}&` +
      `sdate=${searchParams.startDate}&` +
      `edate=${searchParams.endDate}`;

    return lastValueFrom(this.http.post(
      'http://195.95.232.162:8082/cgi-bin/timetable.cgi?n=700',
      rawSearchParams, {
        responseType: 'arraybuffer',
      },
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
