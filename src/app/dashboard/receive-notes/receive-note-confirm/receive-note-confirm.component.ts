import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as receiveNoteActions from '../../../shared/actions/receive-note.actions';

@Component({
  templateUrl: './receive-note-confirm.component.html'
})
export class ReceiveNoteConfirmComponent {

  public type: boolean = false;

  constructor(
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<ReceiveNoteConfirmComponent>
  ) { }

  action() {
    this._store.dispatch(new receiveNoteActions.ConfirmReceiveNoteAction);
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

}

@Component({
  templateUrl: './receive-note-confirm.component.html'
})
export class ReceiveNoteDeleteComponent {

  public type: boolean = true;

  constructor(
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<ReceiveNoteDeleteComponent>
  ) { }

  action() {
    this._store.dispatch(new receiveNoteActions.DeleteReceiveNoteAction);
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

}
