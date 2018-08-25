import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTransferComponent } from './device-transfer.component';

describe('DeviceTransferComponent', () => {
  let component: DeviceTransferComponent;
  let fixture: ComponentFixture<DeviceTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
