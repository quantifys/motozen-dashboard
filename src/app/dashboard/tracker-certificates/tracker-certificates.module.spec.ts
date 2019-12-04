import { TrackerCertificatesModule } from './tracker-certificates.module';

describe('TrackerCertificatesModule', () => {
  let trackerCertificatesModule: TrackerCertificatesModule;

  beforeEach(() => {
    trackerCertificatesModule = new TrackerCertificatesModule();
  });

  it('should create an instance', () => {
    expect(trackerCertificatesModule).toBeTruthy();
  });
});
