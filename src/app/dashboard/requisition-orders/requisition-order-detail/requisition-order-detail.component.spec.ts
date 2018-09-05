import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionOrderDetailComponent } from './requisition-order-detail.component';

describe('RequisitionOrderDetailComponent', () => {
  let component: RequisitionOrderDetailComponent;
  let fixture: ComponentFixture<RequisitionOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
