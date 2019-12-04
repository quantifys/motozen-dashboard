import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import * as fromRoot from '../../shared/reducers';
import * as fromVtsUser from '../actions/vts-user.actions';
import { VtsUser } from '../models';

@Injectable()
export class VtsUserEffects {

  private user: VtsUser = new VtsUser({});

  constructor(
    private _action$: Actions,
    private _store: Store<fromRoot.State>,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    this._store.select(fromRoot.getCurrentVtsUser).subscribe(user => this.user = user);
  }

  @Effect()
  fetchAllVtsUsers$: Observable<Action> = this._action$.ofType(fromVtsUser.FETCH_ALL_VTS_USERS_ACTION).pipe(
    map((action: fromVtsUser.FetchAllVtsUsersAction) => action.payload),
    exhaustMap(body => this._tokenService.post(`tracker_customers/list`, body)
      .pipe(
        map(response => new fromVtsUser.FetchAllVtsUsersCompleteAction({
          data: response.json().message,
          total: response.headers.get('total'),
          per_page: response.headers.get('per-page')
        })),
        catchError(error => of(new fromVtsUser.FetchAllVtsUsersFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchVtsUser$: Observable<Action> = this._action$.ofType(fromVtsUser.FETCH_VTS_USER_ACTION).pipe(
    map((action: fromVtsUser.FetchVtsUserAction) => action.payload),
    exhaustMap(id => this._tokenService.get(`tracker_customers/${id}`)
      .pipe(
        map(response => new fromVtsUser.FetchVtsUserCompleteAction(response.json().message)),
        catchError(error => of(new fromVtsUser.FetchVtsUserFailedAction(error.json().message)))
      ))
  );

  @Effect()
  createNewVtsUser$: Observable<Action> = this._action$.ofType(fromVtsUser.CREATE_VTS_USER_ACTION).pipe(
    map((action: fromVtsUser.CreateVtsUserAction) => action.payload),
    exhaustMap(body => this._tokenService.post('tracker_customers', body)
      .pipe(
        map(response => {
          this._router.navigate(['dashboard', 'vts-users', 'view'], { queryParams: { id: response.json().message.id } });
          return new fromVtsUser.CreateVtsUserCompleteAction(response.json().message);
        }),
        catchError(error => of(new fromVtsUser.CreateVtsUserFailedAction(error.json().message)))
      ))
  );

  @Effect()
  deleteVtsUser$: Observable<Action> = this._action$.ofType(fromVtsUser.DELETE_VTS_USER_ACTION).pipe(
    map((action: fromVtsUser.DeleteVtsUserAction) => action),
    exhaustMap(() => this._tokenService.delete(`tracker_customers/${this.user.id}`)
      .pipe(
        map(() => {
          this._router.navigate(['dashboard', 'vts-users']);
          return new fromVtsUser.DeleteVtsUserCompleteAction(this.user.id);
        }),
        catchError(error => of(new fromVtsUser.DeleteVtsUserFailedAction(error.json().message)))
      ))
  );

  @Effect()
  updateVtsUser$: Observable<Action> = this._action$.ofType(fromVtsUser.UPDATE_VTS_USER_ACTION).pipe(
    map((action: fromVtsUser.UpdateVtsUserAction) => action.payload),
    exhaustMap(body => this._tokenService.patch(`tracker_customers/${this.user.id}`, body)
      .pipe(
        map(response => {
          this._router.navigate(['dashboard', 'vts-users', 'view'], { queryParams: { id: response.json().message.id } });
          return new fromVtsUser.UpdateVtsUserCompleteAction(response.json().message);
        }),
        catchError(error => of(new fromVtsUser.UpdateVtsUserFailedAction(error.json().message)))
      ))
  );
}
