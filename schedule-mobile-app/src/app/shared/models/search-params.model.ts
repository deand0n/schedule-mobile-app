export class SearchParams {
  id: number;
  faculty?: number;
  group?: string;
  teacher?: string;
  startDate?: Date;
  endDate?: Date;
  isForMonth: boolean;

  constructor(id: number) {
    this.id = id;
  }
}
