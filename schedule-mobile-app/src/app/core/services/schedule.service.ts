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

  constructor(private httpClient: HttpClient) {
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
