import { ForbiddenModule } from './forbidden.module';

describe('ForbiddenModule', () => {
  let forbiddenModule: ForbiddenModule;

  beforeEach(() => {
    forbiddenModule = new ForbiddenModule();
  });

  it('should create an instance', () => {
    expect(forbiddenModule).toBeTruthy();
  });
});
