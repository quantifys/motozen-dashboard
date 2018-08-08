export class Cost {
  public id: number;
  public created_at: Date;
  public amount: number;
  public serial_no: string;
  public category: string;
  public description: string;
  public total: number;
  public gst: number;
  public gstn: string;

  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.created_at = data.created_at ? new Date(data.created_at) : new Date();
    this.amount = data.amount != null ? +data.amount : null;
    this.serial_no = data.serial_no ? data.serial_no : null;
    this.category = data.category ? data.category : null;
    this.description = data.description ? data.description : null;
    this.total = data.total != null ? +data.total : null;
    this.gst = data.gst != null ? +data.gst : null;
    this.gstn = data.gstn ? data.gstn : null;
  }
}