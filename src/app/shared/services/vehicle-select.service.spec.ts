import { TestBed, inject } from '@angular/core/testing';

import { VehicleSelectService } from './vehicle-select.service';

describe('VehicleSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleSelectService]
    });
  });

  it('should be created', inject([VehicleSelectService], (service: VehicleSelectService) => {
    expect(service).toBeTruthy();
  }));
});
