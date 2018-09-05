import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderDispatchComponent } from './purchase-order-dispatch.component';

describe('PurchaseOrderDispatchComponent', () => {
  let component: PurchaseOrderDispatchComponent;
  let fixture: ComponentFixture<PurchaseOrderDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
