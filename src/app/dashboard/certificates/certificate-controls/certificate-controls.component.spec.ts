import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateControlsComponent } from './certificate-controls.component';

describe('CertificateControlsComponent', () => {
  let component: CertificateControlsComponent;
  let fixture: ComponentFixture<CertificateControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificateControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
