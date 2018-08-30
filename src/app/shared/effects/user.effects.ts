import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, exhaustMap } from 'rxjs/operators';

import * as fromRoot from '../../shared/reducers';
import * as fromUser from '../actions/user.actions';
import { User } from '../models';

@Injectable()
export class UserEffects {

  private user: User = new User({});

  constructor(
    private _store: Store<fromRoot.State>,
    private _action$: Actions,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    this._store.select(fromRoot.getCurrentUser).subscribe(user => this.user = user);
  }

  @Effect()
  loginUser$: Observable<Action> = this._action$.ofType(fromUser.LOGIN_USER_ACTION).pipe(
    map((action: fromUser.LoginUserAction) => action.payload),
    exhaustMap(body => this._tokenService.signIn(body)
      .pipe(
        map(response => {
          this._router.navigate(['/dashboard']);
          return new fromUser.LoginUserCompleteAction(response.json().data)
        }),
        catchError(error => of(new fromUser.LoginUserFailedAction(error.json().errors[0])))
      ))
  );

  @Effect()
  validateUser$: Observable<Action> = this._action$.ofType(fromUser.VALIDATE_USER_TOKEN_ACTION).pipe(
    map((action: fromUser.ValidateUserTokenAction) => action),
    exhaustMap(() => this._tokenService.validateToken()
      .pipe(
        map(response => new fromUser.ValidateUserTokenCompleteAction(response.json().data)),
        catchError(error => of(new fromUser.ValidateUserTokenFailedAction(error.json())))
      ))
  );

  @Effect()
  signOutUser$: Observable<Action> = this._action$.ofType(fromUser.SIGNOUT_USER_ACTION).pipe(
    map((action: fromUser.SignoutUserAction) => action),
    exhaustMap(() => this._tokenService.signOut()
      .pipe(
        map(response => {
          this._router.navigate(["login"]);
          return new fromUser.SignoutUserCompleteAction
        }),
        catchError(error => of(new fromUser.SignoutUserFailedAction(error.json())))
      ))
  );

  @Effect()
  fetchUsers$: Observable<Action> = this._action$.ofType(fromUser.FETCH_ALL_USERS_ACTION).pipe(
    map((action: fromUser.FetchAllUsersAction) => action),
    exhaustMap(() => this._tokenService.get('users')
      .pipe(
        map(response => new fromUser.FetchAllUsersCompleteAction(response.json().message)),
        catchError(error => of(new fromUser.FetchAllUsersFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchUser$: Observable<Action> = this._action$.ofType(fromUser.FETCH_USER_ACTION).pipe(
    map((action: fromUser.FetchUserAction) => action.payload),
    exhaustMap(body => this._tokenService.get(`users/${body}`)
      .pipe(
        map(response => new fromUser.FetchUserCompleteAction(response.json().message)),
        catchError(error => of(new fromUser.FetchUserFailedAction(error.json().message)))
      ))
  );

  @Effect()
  filterUsers$: Observable<Action> = this._action$.ofType(fromUser.FILTER_USERS_ACTION).pipe(
    map((action: fromUser.FilterUsersAction) => action.payload),
    exhaustMap(body => this._tokenService.post('users/list', body)
      .pipe(
        map(response => new fromUser.FilterUsersCompleteAction(response.json().message)),
        catchError(error => of(new fromUser.FilterUsersFailedAction(error.json().message)))
      ))
  );

  @Effect()
  createNewUser$: Observable<Action> = this._action$.ofType(fromUser.CREATE_NEW_USER_ACTION).pipe(
    map((action: fromUser.CreateNewUserAction) => action.payload),
    exhaustMap(userData => this._tokenService.post('users', userData)
      .pipe(
        map(response => {
          this._router.navigate(["dashboard", "users", "view"], { queryParams: { id: response.json().message.id } });
          return new fromUser.CreateNewUserCompleteAction(response.json().message);
        }),
        catchError(error => of(new fromUser.CreateNewUserFailedAction(error.json().message)))
      ))
  );

  @Effect()
  deleteUser$: Observable<Action> = this._action$.ofType(fromUser.DELETE_USER_ACTION).pipe(
    map((action: fromUser.DeleteUserAction) => action),
    exhaustMap(() => this._tokenService.delete(`users/${this.user.id}`)
      .pipe(
        map(() => {
          this._router.navigate(["dashboard", "users"]);
          return new fromUser.DeleteUserCompleteAction(this.user.id);
        }),
        catchError(error => of(new fromUser.DeleteUserFailedAction(error.json().message)))
      ))
  );


  @Effect()
  updateUser$: Observable<Action> = this._action$.ofType(fromUser.UPDATE_USER_ACTION).pipe(
    map((action: fromUser.UpdateUserAction) => action.payload),
    exhaustMap(userData => this._tokenService.patch(`users/${this.user.id}`, userData)
      .pipe(
        map(response => {
          this._router.navigate(["dashboard", "users", "view"], { queryParams: { id: response.json().message.id } });
          return new fromUser.UpdateUserCompleteAction(response.json().message);
        }),
        catchError(error => of(new fromUser.UpdateUserFailedAction(error.json().message)))
      ))
  );

}