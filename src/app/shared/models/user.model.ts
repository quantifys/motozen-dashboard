export class User {
  public id: number;
  public serial_no: string;
  public name: string;
  public email: string;
  public role: string;
  public password: string;
  public password_confirmation: string;
  public distributor_id: number;
  public details: UserDetails;

  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.serial_no = data.serial_no ? data.serial_no : null;
    this.name = data.name ? data.name : null;
    this.email = data.email ? data.email : null;
    this.role = data.role ? data.role : null;
    this.password = data.password ? data.password : null;
    this.password_confirmation = data.password_confirmation ? data.password_confirmation : null;
    this.distributor_id = data.distributor_id ? data.distributor_id : null;
    this.details = data.details ? new UserDetails(data.details) : new UserDetails({});
  }

  hasEsic(): boolean {
    return this.details.base_salary + this.details.transport_allowance + this.details.hra + this.details.gpf < 16000 ? true : false
  }
}

export class UserDetails {
  public contact: string;
  public gstn: string;
  public address: string;
  public base_salary: number;
  public hra: number;
  public transport_allowance: number;
  public esic: number;
  public gpf: number;
  public state: string;
  public state_code: string;

  constructor(data: any) {
    this.contact = data.contact ? data.contact : null;
    this.gstn = data.gstn ? data.gstn : null;
    this.address = data.address ? data.address : null;
    this.base_salary = data.base_salary != null ? data.base_salary : null;
    this.hra = data.hra != null ? data.hra : null;
    this.transport_allowance = data.transport_allowance != null ? data.transport_allowance : null;
    this.esic = data.esic != null ? data.esic : null;
    this.gpf = data.gpf != null ? data.gpf : null;
    this.state = data.state ? data.state : null;
    this.state_code = data.state_code ? data.state_code : null;
  }
}