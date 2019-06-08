import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtsDeviceComponent } from './vts-device.component';

describe('VtsDeviceComponent', () => {
  let component: VtsDeviceComponent;
  let fixture: ComponentFixture<VtsDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtsDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtsDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
