export class Device {
  public id: number;
  public sld_number: string;
  public status: string;

  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.sld_number = data.sld_number ? data.sld_number : null;
    this.status = data.status ? data.status : null;
  }
}