import { User } from './user.model';
import { TrackerDevice } from './tracker-device.model';

import * as moment from 'moment';

export class TrackerCertificate {
  public id: number;
  public certificate_number: string;
  public date_generated: Date;
  public due_date: Date;
  public status: string;
  public sld_number: string;
  public device: TrackerDevice;
  public invoice_no: number;
  public location_state: string;
  public make: string;
  public model: string;
  public vehicle_type: string;
  public engine_number: string;
  public chassis_number: string;
  public car_reg_number: string;
  public location_rto: string;
  public seals: string;
  public renewal_count: number;
  public user: User;
  public tracker_customer: User;
  public mfg_month_year: Date;
  public reg_month_year: Date;

  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.certificate_number = data.certificate_number ? data.certificate_number : null;
    this.date_generated = data.date_generated ? moment(data.date_generated, 'YYYY-MM-DD').toDate() : null;
    this.due_date = data.due_date ? moment(data.due_date).subtract(1, 'day').toDate() : null;
    this.status = data.status ? data.status : null;
    this.sld_number = data.sld_number ? data.sld_number : null;
    this.device = data.tracker_device ? new TrackerDevice(data.tracker_device) : new TrackerDevice({});
    this.invoice_no = data.invoice_no != null ? data.invoice_no : null;
    this.engine_number = data.engine_number ? data.engine_number : null;
    this.chassis_number = data.chassis_number ? data.chassis_number : null;
    this.renewal_count = data.renewal_count != null ? data.renewal_count : null;
    this.car_reg_number = data.car_reg_number ? data.car_reg_number : null;
    this.location_state = data.location_state ? data.location_state : null;
    this.make = data.make ? data.make : null;
    this.model = data.model ? data.model : null;
    this.vehicle_type = data.vehicle_type ? data.vehicle_type : null;
    this.location_rto = data.location_rto ? data.location_rto : null;
    this.seals = data.seals ? data.seals : null;
    this.user = data.user ? new User(data.user) : new User({});
    this.tracker_customer = data.tracker_customer ? new User(data.tracker_customer) : new User({});
    this.mfg_month_year = data.mfg_month_year ? moment(data.mfg_month_year, 'YYYY-MM-DD').toDate() : new Date();
    this.reg_month_year = data.reg_month_year ? moment(data.reg_month_year, 'YYYY-MM-DD').toDate() : new Date();
  }

  getStatus(): string {
    switch (this.status) {
      case 'can_modify':
        return 'Not issued';
      case 'is_valid':
        return 'Valid';
      case 'renewable':
        return 'Renewable';
      default:
        return 'Expired';
    }
  }
}
