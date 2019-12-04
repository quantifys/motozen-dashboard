import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerDevicesComponent } from './tracker-devices.component';

describe('TrackerDevicesComponent', () => {
  let component: TrackerDevicesComponent;
  let fixture: ComponentFixture<TrackerDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
