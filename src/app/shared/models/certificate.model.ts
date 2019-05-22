import { Device } from './device.model';
import { Vehicle } from './vehicle.model';
import { User } from './user.model';
import * as moment from 'moment';
import { PictureData } from './picture-data.model';

export class Certificate {
  public id: number;
  public certificate_number: string;
  public date_generated: Date;
  public due_date: Date;
  public status: string;
  public sld_number: string;
  public device: Device;
  public invoice_no: number;
  public customer_name: string;
  public location_state: string;
  public engine_number: string;
  public chassis_number: string;
  public cutoff_speed: number;
  public car_reg_number: string;
  public customer_address: string;
  public customer_telephone: string;
  public location_rto: string;
  public seals: string;
  public renewal_count: number;
  public vehicle: Vehicle;
  public user: User;
  public mfg_month_year: Date;
  public reg_month_year: Date;
  public picture_data: PictureData;

  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.certificate_number = data.certificate_number ? data.certificate_number : null;
    this.date_generated = data.date_generated ? moment(data.date_generated, 'YYYY-MM-DD').toDate() : null;
    this.due_date = data.due_date ? moment(data.due_date).subtract(1, 'day').toDate() : null;
    this.status = data.status ? data.status : null;
    this.sld_number = data.sld_number ? data.sld_number : null;
    this.device = data.device ? new Device(data.device) : new Device({});
    this.invoice_no = data.invoice_no != null ? data.invoice_no : null;
    this.engine_number = data.engine_number ? data.engine_number : null;
    this.chassis_number = data.chassis_number ? data.chassis_number : null;
    this.cutoff_speed = data.cutoff_speed != null ? data.cutoff_speed : null;
    this.renewal_count = data.renewal_count != null ? data.renewal_count : null;
    this.car_reg_number = data.car_reg_number ? data.car_reg_number : null;
    this.customer_name = data.customer_name ? data.customer_name : null;
    this.customer_address = data.customer_address ? data.customer_address : null;
    this.customer_telephone = data.customer_telephone ? data.customer_telephone : null;
    this.location_state = data.location_state ? data.location_state : null;
    this.location_rto = data.location_rto ? data.location_rto : null;
    this.seals = data.seals ? data.seals : null;
    this.picture_data = data.picture_data ? new PictureData(data.picture_data) : new PictureData({});
    this.vehicle = data.vehicle ? new Vehicle(data.vehicle) : new Vehicle({});
    this.user = data.user ? new User(data.user) : new User({});
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
