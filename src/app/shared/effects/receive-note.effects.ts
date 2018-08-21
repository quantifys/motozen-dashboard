import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromRoot from '../../shared/reducers';
import * as fromReceiveNote from '../actions/receive-note.actions';
import { ReceiveNote } from '../models';

@Injectable()
export class ReceiveNoteEffects {

  private receiveNote: ReceiveNote = new ReceiveNote({});

  constructor(
    private _store: Store<fromRoot.State>,
    private _action$: Actions,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    this._store.select(fromRoot.getCurrentReceiveNote).subscribe(slip => this.receiveNote = slip);
  }

  @Effect()
  fetchReceiveNotes$: Observable<Action> = this._action$.pipe(ofType(fromReceiveNote.FETCH_ALL_RECEIVE_NOTES_ACTION),
    mergeMap((action: fromReceiveNote.FetchAllReceiveNotesAction) => this._tokenService.post('receive_notes/list', action.payload)
      .pipe(map(response => new fromReceiveNote.FetchAllReceiveNotesCompleteAction({
        data: response.json().message,
        total: response.headers.get('total'),
        per_page: response.headers.get('per-page')
      }),
        catchError(error => of(new fromReceiveNote.FetchAllReceiveNotesFailedAction(error.json().message)))))));

  @Effect()
  fetchReceiveNote$: Observable<Action> = this._action$.pipe(ofType(fromReceiveNote.FETCH_RECEIVE_NOTE_ACTION),
    mergeMap((action: fromReceiveNote.FetchReceiveNoteAction) => this._tokenService.get(`receive_notes/${action.payload}`)
      .pipe(map(response => new fromReceiveNote.FetchReceiveNoteCompleteAction(response.json().message),
        catchError(error => of(new fromReceiveNote.FetchReceiveNoteFailedAction(error.json().message)))))));

  @Effect()
  fetchReceiveNoteFormData$: Observable<Action> = this._action$.pipe(ofType(fromReceiveNote.FETCH_RECEIVE_NOTE_FORM_DATA_ACTION),
    mergeMap((action: fromReceiveNote.FetchReceiveNoteFormDataAction) => this._tokenService.get('receive_notes/new')
      .pipe(map(response => new fromReceiveNote.FetchReceiveNoteFormDataCompleteAction(response.json().message),
        catchError(error => of(new fromReceiveNote.FetchReceiveNoteFormDataFailedAction(error.json().message)))))));

  @Effect()
  createNewReceiveNote$: Observable<Action> = this._action$.pipe(ofType(fromReceiveNote.CREATE_RECEIVE_NOTE_ACTION),
    mergeMap((action: fromReceiveNote.CreateReceiveNoteAction) => this._tokenService.post('receive_notes', action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "receive-notes", "view"], { queryParams: { id: response.json().message.id } })
        return new fromReceiveNote.CreateReceiveNoteCompleteAction(response.json().message)
      },
        catchError(error => of(new fromReceiveNote.CreateReceiveNoteFailedAction(error.json().message)))))));

  @Effect()
  deleteReceiveNote$: Observable<Action> = this._action$.pipe(ofType(fromReceiveNote.DELETE_RECEIVE_NOTE_ACTION),
    mergeMap((action: fromReceiveNote.DeleteReceiveNoteAction) => this._tokenService.delete(`receive_notes/${this.receiveNote.id}`)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "receive-notes"]);
        return new fromReceiveNote.DeleteReceiveNoteCompleteAction
      },
        catchError(error => of(new fromReceiveNote.DeleteReceiveNoteFailedAction(error.json().message)))))));

  @Effect()
  confirmReceiveNote$: Observable<Action> = this._action$.pipe(ofType(fromReceiveNote.CONFIRM_RECEIVE_NOTE_ACTION),
    mergeMap((action: fromReceiveNote.ConfirmReceiveNoteAction) => this._tokenService.post(`receive_notes/${this.receiveNote.id}/confirm`, null)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "receive-notes"])
        return new fromReceiveNote.ConfirmReceiveNoteCompleteAction(response.json().message);
      },
        catchError(error => of(new fromReceiveNote.ConfirmReceiveNoteFailedAction(error.json().message)))))));

  @Effect()
  updateReceiveNote$: Observable<Action> = this._action$.pipe(ofType(fromReceiveNote.UPDATE_RECEIVE_NOTE_ACTION),
    mergeMap((action: fromReceiveNote.UpdateReceiveNoteAction) => this._tokenService.patch(`receive_notes/${action.payload.receive_note.id}`, action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "receive-notes", "view"], { queryParams: { id: response.json().message.id } });
        return new fromReceiveNote.UpdateReceiveNoteCompleteAction(response.json().message);
      },
        catchError(error => of(new fromReceiveNote.UpdateReceiveNoteFailedAction(error.json().message)))))));

}