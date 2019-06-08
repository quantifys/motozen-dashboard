import { TrackerDevicesModule } from './tracker-devices.module';

describe('TrackerDevicesModule', () => {
  let trackerDevicesModule: TrackerDevicesModule;

  beforeEach(() => {
    trackerDevicesModule = new TrackerDevicesModule();
  });

  it('should create an instance', () => {
    expect(trackerDevicesModule).toBeTruthy();
  });
});
