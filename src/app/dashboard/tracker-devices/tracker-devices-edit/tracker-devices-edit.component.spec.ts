import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerDevicesEditComponent } from './tracker-devices-edit.component';

describe('TrackerDevicesEditComponent', () => {
  let component: TrackerDevicesEditComponent;
  let fixture: ComponentFixture<TrackerDevicesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerDevicesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerDevicesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
