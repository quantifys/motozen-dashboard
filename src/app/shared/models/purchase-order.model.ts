import { User } from './user.model';
import { Vehicle } from './vehicle.model';

export class PurchaseOrder {
  public id: number;
  public address: string;
  public state: string;
  public amount_paid: number;
  public amount_gst: number;
  public created_at: Date;
  public serial_no: string;
  public shipping_date: Date;
  public shipping_amt: number;
  public shipping_gst: number;
  public shipping_gstn: string;
  public status: string;
  public total_quantity: number;
  public tracking_no: string;
  public remarks: string;
  public particulars: PurchaseOrderParticulars[];
  public user: User;

  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.address = data.address ? data.address : null;
    this.state = data.state ? data.state : null;
    this.amount_paid = data.amount_paid != null ? +data.amount_paid : null;
    this.amount_gst = data.amount_gst != null ? +data.amount_gst : null;
    this.created_at = data.created_at ? new Date(data.created_at) : new Date();
    this.serial_no = data.serial_no ? data.serial_no : null;
    this.shipping_date = data.shipping_date ? new Date(data.shipping_date) : null;
    this.shipping_amt = data.shipping_amt != null ? +data.shipping_amt : null;
    this.shipping_gst = data.shipping_gst != null ? +data.shipping_gst : null;
    this.shipping_gstn = data.shipping_gstn ? data.shipping_gstn : null;
    this.status = data.status ? data.status : null;
    this.total_quantity = data.total_quantity != null ? +data.total_quantity : null;
    this.tracking_no = data.tracking_no ? data.tracking_no : null;
    this.remarks = data.remarks ? data.remarks : null;
    this.particulars = data.particulars ? data.particulars.map(particular => new PurchaseOrderParticulars(particular)) : [];
    this.user = data.user ? new User(data.user) : new User({});
  }

  getTotal(): number {
    if (this.status == 'processing') {
      return Math.round(this.amount_paid + (this.amount_paid * this.amount_gst * 0.01));
    }
    return null
  }
}

export class PurchaseOrderParticulars {
  public id: number;
  public quantity: number;
  public vehicle: Vehicle;

  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.quantity = data.quantity != null ? +data.quantity : null;
    this.vehicle = data.vehicle ? new Vehicle(data.vehicle) : new Vehicle({});
  }
}