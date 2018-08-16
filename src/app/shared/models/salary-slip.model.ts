import { User } from "./user.model";

export class SalarySlip {
  public id: number;
  public serial_no: string;
  public employee_id: string;
  public bonus: number;
  public leave_days: number;
  public amount: number;
  public created_at: Date;
  public paid_date: string;
  public status: string;
  public details: SalarySlipDetails;
  public employee: User;

  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.serial_no = data.serial_no ? data.serial_no : null;
    this.employee_id = data.employee_id ? data.employee_id : null;
    this.bonus = data.bonus != null ? +data.bonus : null;
    this.leave_days = data.leave_days != null ? data.leave_days : null;
    this.created_at = data.created_at ? new Date(data.created_at) : new Date();
    this.paid_date = data.paid_date ? data.paid_date : null;
    this.status = data.status ? data.status : null;
    this.amount = data.amount != null ? +data.amount : null;
    this.details = data.details ? new SalarySlipDetails(data.details) : new SalarySlipDetails({});
    this.employee = data.employee ? new User(data.employee) : new User({});
  }
}

export class SalarySlipDetails {
  public gpf: number;
  public hra: number;
  public base_salary: number;
  public transport_allowance: number;

  constructor(data: any) {
    this.gpf = data.gpf != null ? +data.gpf : null;
    this.hra = data.hra != null ? +data.hra : null;
    this.base_salary = data.base_salary != null ? +data.base_salary : null;
    this.transport_allowance = data.transport_allowance != null ? +data.transport_allowance : null;
  }
}