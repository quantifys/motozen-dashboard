import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerCertificatesComponent } from './tracker-certificates.component';

describe('TrackerCertificatesComponent', () => {
  let component: TrackerCertificatesComponent;
  let fixture: ComponentFixture<TrackerCertificatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerCertificatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
