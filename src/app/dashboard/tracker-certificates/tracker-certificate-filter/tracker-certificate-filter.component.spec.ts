import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerCertificateFilterComponent } from './tracker-certificate-filter.component';

describe('TrackerCertificateFilterComponent', () => {
  let component: TrackerCertificateFilterComponent;
  let fixture: ComponentFixture<TrackerCertificateFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerCertificateFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerCertificateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
