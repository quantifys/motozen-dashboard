import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderCloseComponent } from './purchase-order-close.component';

describe('PurchaseOrderCloseComponent', () => {
  let component: PurchaseOrderCloseComponent;
  let fixture: ComponentFixture<PurchaseOrderCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
