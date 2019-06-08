import { User } from './user.model';
import { CertificateInfo } from './device.model';

export class TrackerDevice {
  public id: number;
  public serial_no: string;
  public status: string;
  public created_at: Date;
  public certificate: CertificateInfo;
  public user: User;
  public imei: string;
  public esim1: string;
  public esim2: string;

  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.serial_no = data.serial_no ? data.sld_number : null;
    this.status = data.status ? data.status : null;
    this.created_at = data.created_at ? new Date(data.created_at) : new Date();
    this.certificate = data.certificate ? new CertificateInfo(data.certificate) : new CertificateInfo({});
    this.user = data.user ? new User(data.user) : new User({});
    this.imei = data.imei ? data.imei : null;
    this.esim1 = data.esim1 ? data.esim1 : null;
    this.esim2 = data.esim2 ? data.esim2 : null;
  }
}
