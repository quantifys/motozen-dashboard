import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerDevicesTableComponent } from './tracker-devices-table.component';

describe('TrackerDevicesTableComponent', () => {
  let component: TrackerDevicesTableComponent;
  let fixture: ComponentFixture<TrackerDevicesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerDevicesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerDevicesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
