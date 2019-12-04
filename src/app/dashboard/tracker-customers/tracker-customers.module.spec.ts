import { TrackerCustomersModule } from './tracker-customers.module';

describe('TrackerCustomersModule', () => {
  let trackerCustomersModule: TrackerCustomersModule;

  beforeEach(() => {
    trackerCustomersModule = new TrackerCustomersModule();
  });

  it('should create an instance', () => {
    expect(trackerCustomersModule).toBeTruthy();
  });
});
