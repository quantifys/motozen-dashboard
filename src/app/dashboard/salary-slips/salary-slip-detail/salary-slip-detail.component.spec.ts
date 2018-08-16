import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarySlipDetailComponent } from './salary-slip-detail.component';

describe('SalarySlipDetailComponent', () => {
  let component: SalarySlipDetailComponent;
  let fixture: ComponentFixture<SalarySlipDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarySlipDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarySlipDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
