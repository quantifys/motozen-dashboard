import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarySlipFilterComponent } from './salary-slip-filter.component';

describe('SalarySlipFilterComponent', () => {
  let component: SalarySlipFilterComponent;
  let fixture: ComponentFixture<SalarySlipFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarySlipFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarySlipFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
