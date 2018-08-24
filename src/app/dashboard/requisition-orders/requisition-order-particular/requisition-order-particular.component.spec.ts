import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionOrderParticularComponent } from './requisition-order-particular.component';

describe('RequisitionOrderParticularComponent', () => {
  let component: RequisitionOrderParticularComponent;
  let fixture: ComponentFixture<RequisitionOrderParticularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionOrderParticularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionOrderParticularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
