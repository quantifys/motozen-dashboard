import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerDevicesTransferComponent } from './tracker-devices-transfer.component';

describe('TrackerDevicesTransferComponent', () => {
  let component: TrackerDevicesTransferComponent;
  let fixture: ComponentFixture<TrackerDevicesTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerDevicesTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerDevicesTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
