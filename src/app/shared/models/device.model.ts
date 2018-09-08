import { User } from "./user.model";

export class Device {
  public id: number;
  public sld_number: string;
  public status: string;
  public created_at: Date;
  public certificate: CertificateInfo;
  public user: User;

  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.sld_number = data.sld_number ? data.sld_number : null;
    this.status = data.status ? data.status : null;
    this.created_at = data.created_at ? new Date(data.created_at) : new Date();
    this.certificate = data.certificate ? new CertificateInfo(data.certificate) : new CertificateInfo({});
    this.user = data.user ? new User(data.user) : new User({});
  }
}

export class CertificateInfo {
  public id: number;
  public certificate_number: string;
  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.certificate_number = data.certificate_number ? data.certificate_number : null;
  }
}