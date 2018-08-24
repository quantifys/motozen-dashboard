import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionOrderControlsComponent } from './requisition-order-controls.component';

describe('RequisitionOrderControlsComponent', () => {
  let component: RequisitionOrderControlsComponent;
  let fixture: ComponentFixture<RequisitionOrderControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionOrderControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionOrderControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
