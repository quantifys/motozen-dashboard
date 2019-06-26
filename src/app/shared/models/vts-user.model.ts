export class VtsUser {
  public id: number;
  public name: string;
  public email: string;
  public phone: string;

  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.name = data.name ? data.name : null;
    this.email = data.email ? data.email : null;
    this.phone = data.phone ? data.phone : null;
  }
}
