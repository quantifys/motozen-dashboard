import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarySlipEditComponent } from './salary-slip-edit.component';

describe('SalarySlipEditComponent', () => {
  let component: SalarySlipEditComponent;
  let fixture: ComponentFixture<SalarySlipEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarySlipEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarySlipEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
