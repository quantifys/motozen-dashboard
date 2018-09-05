import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionOrdersComponent } from './requisition-orders.component';

describe('RequisitionOrdersComponent', () => {
  let component: RequisitionOrdersComponent;
  let fixture: ComponentFixture<RequisitionOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
