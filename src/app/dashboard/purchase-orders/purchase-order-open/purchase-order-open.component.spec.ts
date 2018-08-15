import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderOpenComponent } from './purchase-order-open.component';

describe('PurchaseOrderOpenComponent', () => {
  let component: PurchaseOrderOpenComponent;
  let fixture: ComponentFixture<PurchaseOrderOpenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderOpenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
