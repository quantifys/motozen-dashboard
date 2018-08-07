import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderParticularComponent } from './purchase-order-particular.component';

describe('PurchaseOrderParticularComponent', () => {
  let component: PurchaseOrderParticularComponent;
  let fixture: ComponentFixture<PurchaseOrderParticularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderParticularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderParticularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
