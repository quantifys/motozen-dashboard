import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderFilterComponent } from './purchase-order-filter.component';

describe('PurchaseOrderFilterComponent', () => {
  let component: PurchaseOrderFilterComponent;
  let fixture: ComponentFixture<PurchaseOrderFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
