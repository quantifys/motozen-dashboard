export class VtsUser {
  public id: number;
  public name: string;
  public email: string;
  public phone: string;
  public created_at: Date;
  public namePhone: string;

  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.name = data.name ? data.name : null;
    this.email = data.email ? data.email : null;
    this.phone = data.phone ? data.phone : null;
    this.created_at = data.created_at ? new Date(data.created_at) : new Date();
    if (this.name && this.phone) {
      this.namePhone = this.phone + ' - ' + this.name;
    }
  }
}
