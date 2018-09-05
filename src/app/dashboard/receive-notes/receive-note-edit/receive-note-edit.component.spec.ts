import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveNoteEditComponent } from './receive-note-edit.component';

describe('ReceiveNoteEditComponent', () => {
  let component: ReceiveNoteEditComponent;
  let fixture: ComponentFixture<ReceiveNoteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveNoteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveNoteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
