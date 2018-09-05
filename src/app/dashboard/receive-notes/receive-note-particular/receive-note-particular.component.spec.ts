import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveNoteParticularComponent } from './receive-note-particular.component';

describe('ReceiveNoteParticularComponent', () => {
  let component: ReceiveNoteParticularComponent;
  let fixture: ComponentFixture<ReceiveNoteParticularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveNoteParticularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveNoteParticularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
