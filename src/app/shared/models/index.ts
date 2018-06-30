export * from './user.model';

export class PageData {
  public total: number;
  public per_page: number;
  constructor(data: any) {
    this.total = data.total != null ? +data.total : null;
    this.per_page = data.per_page != null ? +data.per_page : null;
  }
}