import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveNoteDetailComponent } from './receive-note-detail.component';

describe('ReceiveNoteDetailComponent', () => {
  let component: ReceiveNoteDetailComponent;
  let fixture: ComponentFixture<ReceiveNoteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveNoteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveNoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
