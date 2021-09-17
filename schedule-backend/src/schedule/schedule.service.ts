import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { HttpService } from '@nestjs/axios';
import { Day } from './models/day.model';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { SearchParamsRequest } from './models/search-params-request.model';
import { SearchParams } from './models/search-params.model';

@Injectable()
export class ScheduleService {
  constructor(private http: HttpService) {
  }

  getScheduleDays(SearchParamsRequest: SearchParamsRequest): Day[] {
    const searchParams = { ...SearchParamsRequest };

    this.getRawHTML(searchParams).subscribe((next) => {
      console.log(next.data);
    });
    return [new Day(), new Day()];
  }

  private getRawHTML(searchParams: SearchParams): Observable<AxiosResponse<any>> {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };


    return this.http.post(
      'http://195.95.232.162:8082/cgi-bin/timetable.cgi?n=700',
      searchParams, { headers: headers },
    );
  }

  private groupNameToHex(groupName: string): string {
    return groupName;
  }

  create(createScheduleDto: CreateScheduleDto) {
    return 'This action adds a new schedule';
  }

  findAll() {
    return `This action returns all schedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
