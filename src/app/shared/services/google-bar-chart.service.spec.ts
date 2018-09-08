import { TestBed, inject } from '@angular/core/testing';

import { GoogleBarChartService } from './google-bar-chart.service';

describe('GoogleBarChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleBarChartService]
    });
  });

  it('should be created', inject([GoogleBarChartService], (service: GoogleBarChartService) => {
    expect(service).toBeTruthy();
  }));
});
