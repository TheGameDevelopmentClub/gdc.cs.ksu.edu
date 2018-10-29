export class PaginatedList<T> {
  public value: T[];
  public originalCount: number;

  constructor(pageList: any) {
    this.value = pageList['value'];
    this.originalCount = pageList['originalCount'];
  }
}
