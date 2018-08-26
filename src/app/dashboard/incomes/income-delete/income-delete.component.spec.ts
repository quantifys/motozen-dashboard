import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeDeleteComponent } from './income-delete.component';

describe('IncomeDeleteComponent', () => {
  let component: IncomeDeleteComponent;
  let fixture: ComponentFixture<IncomeDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
