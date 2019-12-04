import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerCertificateTableComponent } from './tracker-certificate-table.component';

describe('TrackerCertificateTableComponent', () => {
  let component: TrackerCertificateTableComponent;
  let fixture: ComponentFixture<TrackerCertificateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerCertificateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerCertificateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
