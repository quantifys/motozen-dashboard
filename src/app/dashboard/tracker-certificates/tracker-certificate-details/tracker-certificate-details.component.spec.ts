import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerCertificateDetailsComponent } from './tracker-certificate-details.component';

describe('TrackerCertificateDetailsComponent', () => {
  let component: TrackerCertificateDetailsComponent;
  let fixture: ComponentFixture<TrackerCertificateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerCertificateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerCertificateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
