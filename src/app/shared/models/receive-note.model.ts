import { Inventory } from "./inventory.model";
import { Vendor } from "./vendor.model";

export class ReceiveNote {
  public id: number;
  public serial_no: string;
  public freight: number;
  public freight_gst: number;
  public freight_gstn: string;
  public expenses: number;
  public gstn: string;
  public total: number;
  public user_id: number;
  public created_at: Date;
  public status: string;
  public vendor: Vendor;
  public rn_particulars: ReceiveNoteParticular[];
  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.serial_no = data.serial_no ? data.serial_no : null;
    this.freight = data.freight != null ? +data.freight : null;
    this.freight_gst = data.freight_gst != null ? +data.freight_gst : null;
    this.freight_gstn = data.freight_gstn ? data.freight_gstn : null;
    this.expenses = data.expenses != null ? +data.expenses : null;
    this.gstn = data.gstn ? data.gstn : null;
    this.total = data.total != null ? +data.total : null;
    this.user_id = data.user_id ? data.user_id : null;
    this.created_at = data.created_at ? new Date(data.created_at) : new Date();
    this.status = data.status ? data.status : null;
    this.vendor = data.vendor ? new Vendor(data.vendor) : new Vendor({});
    this.rn_particulars = data.rn_particulars ? data.rn_particulars.map(particular => new ReceiveNoteParticular(particular)) : [];
  }

  getFreightTotal(): number {
    return Math.ceil(this.freight * (1 + (this.freight_gst * 0.01)));
  }

  getParticularTotal(): number {
    let total: number = 0;
    this.rn_particulars.map(particular => total += particular.total);
    return total;
  }
}

export class ReceiveNoteParticular {
  public id: number;
  public quantity: number;
  public unit_price: number;
  public gst: number;
  public total: number;
  public inventory_item: Inventory;

  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.quantity = data.quantity != null ? data.quantity : null;
    this.unit_price = data.unit_price != null ? +data.unit_price : null;
    this.gst = data.gst != null ? +data.gst : null;
    this.total = data.total != null ? +data.total : null;
    this.inventory_item = data.inventory_item ? new Inventory(data.inventory_item) : new Inventory({})
  }

  getPrice(): number {
    return this.unit_price * this.quantity;
  }

  getGstAmount(): number {
    return +(this.getPrice() * (this.gst * 0.01)).toFixed(2)
  }
}