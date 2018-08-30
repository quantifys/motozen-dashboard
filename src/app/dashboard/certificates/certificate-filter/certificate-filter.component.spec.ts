import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateFilterComponent } from './certificate-filter.component';

describe('CertificateFilterComponent', () => {
  let component: CertificateFilterComponent;
  let fixture: ComponentFixture<CertificateFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificateFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
