import { PurchaseOrder } from './purchase-order.model';
import { ReceiveNote } from './receive-note.model';
import { SalarySlip } from './salary-slip.model';

export class Transaction {
  public id: number;
  public amount: number;
  public gst: number;
  public category: string;
  public created_at: Date;
  public sub_category: string;
  public transactable_type: string;
  public transactable: PurchaseOrder | ReceiveNote | SalarySlip;

  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.amount = data.amount != null ? +data.amount : 0;
    this.gst = data.gst != null ? +data.gst : 0;
    this.category = data.category ? data.category : null;
    this.created_at = data.created_at ? new Date(data.created_at) : new Date();
    this.sub_category = data.sub_category ? data.sub_category : null;
    this.transactable_type = data.transactable_type ? data.transactable_type : null;
    switch (this.transactable_type) {
      case "PurchaseOrder":
        this.transactable = data.transactable ? new PurchaseOrder(data.transactable) : new PurchaseOrder({});
        break;
      case "ReceiveNote":
        this.transactable = data.transactable ? new ReceiveNote(data.transactable) : new ReceiveNote({});
        break;
      default:
        this.transactable = data.transactable ? new SalarySlip(data.transactable) : new SalarySlip({});
        break;
    }

  }

  gstAmount(): number {
    return Math.round(this.amount * this.gst * 0.01);
  }

  total(): number {
    return Math.round(this.amount + this.gstAmount());
  }
}