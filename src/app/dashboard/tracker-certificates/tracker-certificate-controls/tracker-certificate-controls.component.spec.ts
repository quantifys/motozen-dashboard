import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerCertificateControlsComponent } from './tracker-certificate-controls.component';

describe('TrackerCertificateControlsComponent', () => {
  let component: TrackerCertificateControlsComponent;
  let fixture: ComponentFixture<TrackerCertificateControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerCertificateControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerCertificateControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
