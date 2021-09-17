import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Day } from './models/day.model';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { SearchParams } from './models/search-params.model';

@Injectable()
export class ScheduleService {
  constructor(private http: HttpService) {
  }

  getScheduleDays(searchParams: SearchParams): Day[] {
    this.getRawHTML(searchParams).subscribe((next) => {
      console.log(next.data);
    });
    return [new Day(), new Day()];
  }

  private getRawHTML(searchParams: SearchParams): Observable<AxiosResponse<string>> {
    const rawSearchParams =
      `faculty=${searchParams.faculty}&` +
      `group=${this.groupNameToHex(searchParams.group)}&` +
      `teacher=${searchParams.teacher}&` +
      `sdate=${searchParams.startDate}&` +
      `edate=${searchParams.endDate}`;

    console.log(rawSearchParams);

    return this.http.post(
      'http://195.95.232.162:8082/cgi-bin/timetable.cgi?n=700',
      rawSearchParams,
    );
  }

  private parseSearchParams(html: string): Day[] {
    return [new Day(), new Day()];
  }

  private groupNameToHex(groupName: string): string {
    return groupName;
  }
}
