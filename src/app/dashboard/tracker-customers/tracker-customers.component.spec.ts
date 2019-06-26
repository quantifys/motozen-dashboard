import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerCustomersComponent } from './tracker-customers.component';

describe('TrackerCustomersComponent', () => {
  let component: TrackerCustomersComponent;
  let fixture: ComponentFixture<TrackerCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
