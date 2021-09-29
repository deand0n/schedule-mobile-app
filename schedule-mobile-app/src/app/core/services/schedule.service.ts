import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchParams} from '../../shared/models/search-params.model';
import {Day} from '../../schedule/models/day.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  teachers: string[] = [];
  groups: string[] = [];
  tabSchedule = [[] as Day[], [] as Day[], [] as Day[]];

  constructor(private httpClient: HttpClient) {
  }

  init() {
    this.getTeacherAutocomplete('').subscribe((teachers) => {
      this.teachers = teachers;
    });

    this.getGroupAutocomplete('').subscribe((groups) => {
      this.groups = groups;
    });
  }

  getSchedule(searchParams: SearchParams[]): Observable<Day[]> {
    return this.httpClient.post<Day[]>(`${environment.apiUrl}/schedule`, searchParams);
  }

  getTeacherAutocomplete(query: string): Observable<string[]> {
    return this.httpClient.get<string[]>(`${environment.apiUrl}/schedule/autocomplete/teachers?query=${query}`);
  }

  getGroupAutocomplete(query: string): Observable<string[]> {
    query = encodeURIComponent(query);
    return this.httpClient.get<string[]>(`${environment.apiUrl}/schedule/autocomplete/groups?query=${query}`);
  }
}
