export class SearchParams {
  id: number;
  group?: string;
  teacher?: string;
  from?: Date;
  to?: Date;
  isForMonth: boolean;

  constructor(id: number) {
    this.id = id;
  }
}
