import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveNotesComponent } from './receive-notes.component';

describe('ReceiveNotesComponent', () => {
  let component: ReceiveNotesComponent;
  let fixture: ComponentFixture<ReceiveNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
