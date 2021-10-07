export class SearchParams {
  id: number;
  faculty?: number;
  group?: string;
  teacher?: string;
  startDate?: string;
  endDate?: string;
  isForMonth: boolean;

  constructor(id: number) {
    this.id = id;
  }
}
