import { VehicleSelectModule } from './vehicle-select.module';

describe('VehicleSelectModule', () => {
  let vehicleSelectModule: VehicleSelectModule;

  beforeEach(() => {
    vehicleSelectModule = new VehicleSelectModule();
  });

  it('should create an instance', () => {
    expect(vehicleSelectModule).toBeTruthy();
  });
});
