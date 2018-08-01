export * from './user.model';
export * from './device.model';
export * from './inventory.model';
export * from './vehicle.model';
export * from './certificate.model';

export class PageData {
  public total: number;
  public per_page: number;
  constructor(data: any) {
    this.total = data.total != null ? +data.total : null;
    this.per_page = data.per_page != null ? +data.per_page : null;
  }
}

export class Config {
  public type: string;
  public message: any;
  constructor(data: any) {
    this.type = data.type ? data.type : null;
    this.message = data.message ? data.message : null;
  }
}