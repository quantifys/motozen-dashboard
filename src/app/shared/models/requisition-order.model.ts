import { Inventory } from "./inventory.model";

export class RequisitionOrder {
  public id: number;
  public serial_no: string;
  public created_at: Date;
  public status: string;
  public req_particulars: RequisitionOrderParticulars[];

  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.serial_no = data.serial_no ? data.serial_no : null;
    this.created_at = data.created_at ? new Date(data.created_at) : new Date();
    this.status = data.status ? data.status : null;
    this.req_particulars = data.req_particulars ? data.req_particulars.map(particular => new RequisitionOrderParticulars(particular)) : [];
  }
}

export class RequisitionOrderParticulars {
  public id: number;
  public quantity: number;
  public inventory_item: Inventory;
  public quantity_available: boolean;

  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.quantity = data.quantity != null ? +data.quantity : null;
    this.inventory_item = data.inventory_item ? new Inventory(data.inventory_item) : new Inventory({});
    this.quantity_available = data.quantity_available != null ? data.quantity_available : null;
  }
}