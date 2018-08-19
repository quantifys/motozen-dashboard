export class Vendor {
  public id: number;
  public company_name: string;
  public gstn: string;
  public address: string;
  public status: string;
  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.company_name = data.company_name ? data.company_name : null;
    this.gstn = data.gstn ? data.gstn : null;
    this.address = data.address ? data.address : null;
    this.status = data.status ? data.status : null;
  }
}