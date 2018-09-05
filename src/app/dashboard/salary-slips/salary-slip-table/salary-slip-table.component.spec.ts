import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarySlipTableComponent } from './salary-slip-table.component';

describe('SalarySlipTableComponent', () => {
  let component: SalarySlipTableComponent;
  let fixture: ComponentFixture<SalarySlipTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarySlipTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarySlipTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
