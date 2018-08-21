import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveNoteConfirmComponent } from './receive-note-confirm.component';

describe('ReceiveNoteConfirmComponent', () => {
  let component: ReceiveNoteConfirmComponent;
  let fixture: ComponentFixture<ReceiveNoteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveNoteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveNoteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
