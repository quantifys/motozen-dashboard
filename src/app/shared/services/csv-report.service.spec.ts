import { TestBed, inject } from '@angular/core/testing';

import { CsvReportService } from './csv-report.service';

describe('CsvReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CsvReportService]
    });
  });

  it('should be created', inject([CsvReportService], (service: CsvReportService) => {
    expect(service).toBeTruthy();
  }));
});
