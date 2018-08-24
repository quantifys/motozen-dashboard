import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionOrderEditComponent } from './requisition-order-edit.component';

describe('RequisitionOrderEditComponent', () => {
  let component: RequisitionOrderEditComponent;
  let fixture: ComponentFixture<RequisitionOrderEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionOrderEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionOrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
