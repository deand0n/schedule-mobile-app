import {SearchParams} from './search-params.model';

export interface TabSettings {
  id: number;
  name: string;
  icon: string;
  searchParams: SearchParams[];
}
