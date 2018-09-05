import { TestBed, inject } from '@angular/core/testing';

import { RequisitionOrderService } from './requisition-order.service';

describe('RequisitionOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequisitionOrderService]
    });
  });

  it('should be created', inject([RequisitionOrderService], (service: RequisitionOrderService) => {
    expect(service).toBeTruthy();
  }));
});
