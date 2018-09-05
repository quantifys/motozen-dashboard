import { TestBed, inject } from '@angular/core/testing';

import { RtoService } from './rto.service';

describe('RtoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RtoService]
    });
  });

  it('should be created', inject([RtoService], (service: RtoService) => {
    expect(service).toBeTruthy();
  }));
});
