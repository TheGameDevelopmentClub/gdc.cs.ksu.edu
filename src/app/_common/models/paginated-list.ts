export class PaginatedList<T> {
  public value: T[];
  public total: number;

  constructor(pageList: any) {
    this.value = pageList['value'];
    this.total = pageList['total'];
  }
}
