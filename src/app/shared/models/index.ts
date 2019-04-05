export * from './user.model';
export * from './device.model';
export * from './inventory.model';
export * from './vehicle.model';
export * from './certificate.model';
export * from './cost.model';
export * from './purchase-order.model';
export * from './receive-note.model';
export * from './requisition-order.model';
export * from './salary-slip.model';
export * from './transaction.model';
export * from './vendor.model';
export * from './stats.model';
export * from './chart.model';
export * from './picture-data.model';

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

export class Rto {
  public id: string;
  public office: string;
  public full_name: string;

  constructor(data: any) {
    this.id = data.id;
    this.office = data.office;
    this.full_name = this.id + ': ' + this.office;
  }

  getFullName(): string {
    return this.id + ': ' + this.office;
  }
}

export class State {
  public code: string;
  public name: string;
  constructor(data: any) {
    this.code = data.code ? data.code : null;
    this.name = data.name ? data.name : null;
  }
}
