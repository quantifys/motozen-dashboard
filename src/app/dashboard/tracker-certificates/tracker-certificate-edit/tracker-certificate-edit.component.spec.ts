import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerCertificateEditComponent } from './tracker-certificate-edit.component';

describe('TrackerCertificateEditComponent', () => {
  let component: TrackerCertificateEditComponent;
  let fixture: ComponentFixture<TrackerCertificateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerCertificateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerCertificateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
