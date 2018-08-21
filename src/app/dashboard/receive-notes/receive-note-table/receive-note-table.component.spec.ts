import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveNoteTableComponent } from './receive-note-table.component';

describe('ReceiveNoteTableComponent', () => {
  let component: ReceiveNoteTableComponent;
  let fixture: ComponentFixture<ReceiveNoteTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveNoteTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveNoteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
