import { ReceiveNotesModule } from './receive-notes.module';

describe('ReceiveNotesModule', () => {
  let receiveNotesModule: ReceiveNotesModule;

  beforeEach(() => {
    receiveNotesModule = new ReceiveNotesModule();
  });

  it('should create an instance', () => {
    expect(receiveNotesModule).toBeTruthy();
  });
});
