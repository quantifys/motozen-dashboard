import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

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
  fetchReceiveNotes$: Observable<Action> = this._action$.ofType(fromReceiveNote.FETCH_ALL_RECEIVE_NOTES_ACTION).pipe(
    map((action: fromReceiveNote.FetchAllReceiveNotesAction) => action.payload),
    exhaustMap(body => this._tokenService.post('receive_notes/list', body)
      .pipe(
        map(response => new fromReceiveNote.FetchAllReceiveNotesCompleteAction({
          data: response.json().message,
          total: response.headers.get('total'),
          per_page: response.headers.get('per-page')
        })),
        catchError(error => of(new fromReceiveNote.FetchAllReceiveNotesFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchReceiveNote$: Observable<Action> = this._action$.ofType(fromReceiveNote.FETCH_RECEIVE_NOTE_ACTION).pipe(
    map((action: fromReceiveNote.FetchReceiveNoteAction) => action.payload),
    exhaustMap(id => this._tokenService.get(`receive_notes/${id}`)
      .pipe(
        map(response => new fromReceiveNote.FetchReceiveNoteCompleteAction(response.json().message)),
        catchError(error => of(new fromReceiveNote.FetchReceiveNoteFailedAction(error.json().message)))
      ))
  );

  @Effect()
  confirmReceiveNote$: Observable<Action> = this._action$.ofType(fromReceiveNote.CONFIRM_RECEIVE_NOTE_ACTION).pipe(
    map((action: fromReceiveNote.ConfirmReceiveNoteAction) => action),
    exhaustMap(() => this._tokenService.post(`receive_notes/${this.receiveNote.id}/confirm`, null)
      .pipe(
        map(response => new fromReceiveNote.ConfirmReceiveNoteCompleteAction(response.json().message)),
        catchError(error => of(new fromReceiveNote.ConfirmReceiveNoteFailedAction(error.json().message)))
      ))
  );

  @Effect()
  createNewReceiveNote$: Observable<Action> = this._action$.ofType(fromReceiveNote.CREATE_RECEIVE_NOTE_ACTION).pipe(
    map((action: fromReceiveNote.CreateReceiveNoteAction) => action.payload),
    exhaustMap(body => this._tokenService.post('receive_notes', body)
      .pipe(
        map(response => {
          this._router.navigate(["dashboard", "receive-notes", "view"], { queryParams: { id: response.json().message.id } });
          return new fromReceiveNote.CreateReceiveNoteCompleteAction(response.json().message)
        }),
        catchError(error => of(new fromReceiveNote.CreateReceiveNoteFailedAction(error.json().message)))
      ))
  );

  @Effect()
  deleteReceiveNote$: Observable<Action> = this._action$.ofType(fromReceiveNote.DELETE_RECEIVE_NOTE_ACTION).pipe(
    map((action: fromReceiveNote.DeleteReceiveNoteAction) => action),
    exhaustMap(() => this._tokenService.delete(`receive_notes/${this.receiveNote.id}`)
      .pipe(
        map(() => {
          this._router.navigate(["dashboard", "receive-notes"]);
          return new fromReceiveNote.DeleteReceiveNoteCompleteAction(this.receiveNote.id);
        }),
        catchError(error => of(new fromReceiveNote.DeleteReceiveNoteFailedAction(error.json().message)))
      ))
  );

  @Effect()
  updateReceiveNote$: Observable<Action> = this._action$.ofType(fromReceiveNote.UPDATE_RECEIVE_NOTE_ACTION).pipe(
    map((action: fromReceiveNote.UpdateReceiveNoteAction) => action.payload),
    exhaustMap(body => this._tokenService.patch(`receive_notes/${this.receiveNote.id}`, body)
      .pipe(
        map(response => {
          this._router.navigate(["dashboard", "receive-notes", "view"], { queryParams: { id: response.json().message.id } });
          return new fromReceiveNote.UpdateReceiveNoteCompleteAction(response.json().message)
        }),
        catchError(error => of(new fromReceiveNote.UpdateReceiveNoteFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchReceiveNoteFormdata$: Observable<Action> = this._action$.ofType(fromReceiveNote.FETCH_RECEIVE_NOTE_FORM_DATA_ACTION).pipe(
    map((action: fromReceiveNote.FetchReceiveNoteFormDataAction) => action),
    exhaustMap(() => this._tokenService.get("receive_notes/new")
      .pipe(
        map(response => new fromReceiveNote.FetchReceiveNoteFormDataCompleteAction(response.json().message)),
        catchError(error => of(new fromReceiveNote.FetchReceiveNoteFormDataFailedAction(error.json().message)))
      ))
  );

}