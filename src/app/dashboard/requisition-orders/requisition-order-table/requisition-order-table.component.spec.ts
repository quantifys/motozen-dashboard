import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionOrderTableComponent } from './requisition-order-table.component';

describe('RequisitionOrderTableComponent', () => {
  let component: RequisitionOrderTableComponent;
  let fixture: ComponentFixture<RequisitionOrderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionOrderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionOrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
