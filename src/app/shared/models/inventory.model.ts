export class Inventory {
  public id: number;
  public category: string;
  public description: string;
  public item_code: string;
  public quantity: number;

  constructor(data: any) {
    this.id = data.id ? data.id : null;
    this.category = data.category ? data.category : null;
    this.description = data.description ? data.description : null;
    this.item_code = data.item_code ? data.item_code : null;
    this.quantity = data.quantity != null ? +data.quantity : null;
  }

  getCategory(): string {
    return this.category.replace('_', ' ');
  }
}