import { RequisitionOrdersModule } from './requisition-orders.module';

describe('RequisitionOrdersModule', () => {
  let requisitionOrdersModule: RequisitionOrdersModule;

  beforeEach(() => {
    requisitionOrdersModule = new RequisitionOrdersModule();
  });

  it('should create an instance', () => {
    expect(requisitionOrdersModule).toBeTruthy();
  });
});
