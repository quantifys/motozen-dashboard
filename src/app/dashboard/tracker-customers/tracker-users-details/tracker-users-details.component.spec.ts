import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerUsersDetailsComponent } from './tracker-users-details.component';

describe('TrackerUsersDetailsComponent', () => {
  let component: TrackerUsersDetailsComponent;
  let fixture: ComponentFixture<TrackerUsersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerUsersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerUsersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
