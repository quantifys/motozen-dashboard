import { PurchaseOrderPreviewModule } from './purchase-order-preview.module';

describe('PurchaseOrderPreviewModule', () => {
  let purchaseOrderPreviewModule: PurchaseOrderPreviewModule;

  beforeEach(() => {
    purchaseOrderPreviewModule = new PurchaseOrderPreviewModule();
  });

  it('should create an instance', () => {
    expect(purchaseOrderPreviewModule).toBeTruthy();
  });
});
