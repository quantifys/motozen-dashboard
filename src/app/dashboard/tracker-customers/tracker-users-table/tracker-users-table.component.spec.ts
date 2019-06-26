import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerUsersTableComponent } from './tracker-users-table.component';

describe('TrackerUsersTableComponent', () => {
  let component: TrackerUsersTableComponent;
  let fixture: ComponentFixture<TrackerUsersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerUsersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerUsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
