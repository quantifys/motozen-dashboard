import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerCustomersEditComponent } from './tracker-customers-edit.component';

describe('TrackerCustomersEditComponent', () => {
  let component: TrackerCustomersEditComponent;
  let fixture: ComponentFixture<TrackerCustomersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerCustomersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerCustomersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
