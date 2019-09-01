import { OnestopModule } from './onestop.module';

describe('MessageModule', () => {
  let onestopModule: OnestopModule;

  beforeEach(() => {
    onestopModule = new OnestopModule();
  });

  it('should create an instance', () => {
    expect(onestopModule).toBeTruthy();
  });
});
