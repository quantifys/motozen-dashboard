import { PurchaseOrdersModule } from './purchase-orders.module';

describe('PurchaseOrdersModule', () => {
  let purchaseOrdersModule: PurchaseOrdersModule;

  beforeEach(() => {
    purchaseOrdersModule = new PurchaseOrdersModule();
  });

  it('should create an instance', () => {
    expect(purchaseOrdersModule).toBeTruthy();
  });
});
