import { TestBed, inject } from '@angular/core/testing';

import { TrackerCertificateService } from './tracker-certificate.service';

describe('TrackerCertificateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrackerCertificateService]
    });
  });

  it('should be created', inject([TrackerCertificateService], (service: TrackerCertificateService) => {
    expect(service).toBeTruthy();
  }));
});
