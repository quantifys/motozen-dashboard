import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderConfirmComponent } from './purchase-order-confirm.component';

describe('PurchaseOrderConfirmComponent', () => {
  let component: PurchaseOrderConfirmComponent;
  let fixture: ComponentFixture<PurchaseOrderConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
