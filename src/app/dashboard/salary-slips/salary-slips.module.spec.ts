import { SalarySlipsModule } from './salary-slips.module';

describe('SalarySlipsModule', () => {
  let salarySlipsModule: SalarySlipsModule;

  beforeEach(() => {
    salarySlipsModule = new SalarySlipsModule();
  });

  it('should create an instance', () => {
    expect(salarySlipsModule).toBeTruthy();
  });
});
