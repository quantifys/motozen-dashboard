import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerDevicesDetailComponent } from './tracker-devices-detail.component';

describe('TrackerDevicesDetailComponent', () => {
  let component: TrackerDevicesDetailComponent;
  let fixture: ComponentFixture<TrackerDevicesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerDevicesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerDevicesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
