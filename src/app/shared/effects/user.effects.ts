import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromUser from '../actions/user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private _action$: Actions,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) { }

  @Effect()
  loginUser$: Observable<Action> = this._action$.pipe(ofType(fromUser.LOGIN_USER_ACTION),
    mergeMap((action: fromUser.LoginUserAction) => this._tokenService.signIn(action.payload)
      .pipe(map(response => {
        this._router.navigate(['/dashboard']);
        return new fromUser.LoginUserCompleteAction(response.json().data);
      }),
        catchError(error => of(new fromUser.LoginUserFailedAction(error.json()))))));

  @Effect()
  validateUser$: Observable<Action> = this._action$.pipe(ofType(fromUser.VALIDATE_USER_TOKEN_ACTION),
    mergeMap((action: fromUser.ValidateUserTokenAction) => this._tokenService.validateToken()
      .pipe(map(response => new fromUser.ValidateUserTokenCompleteAction(response.json().data)),
        catchError(error => of(new fromUser.ValidateUserTokenFailedAction(error.json()))))));

  @Effect()
  signOutUser$: Observable<Action> = this._action$.pipe(ofType(fromUser.SIGNOUT_USER_ACTION),
    mergeMap((action: fromUser.SignoutUserAction) => this._tokenService.signOut()
      .pipe(map(response => {
        this._router.navigate(["login"]);
        return new fromUser.SignoutUserCompleteAction();
      },
        catchError(error => of(new fromUser.SignoutUserFailedAction(error.json())))))));

  @Effect()
  fetchUsers$: Observable<Action> = this._action$.pipe(ofType(fromUser.FETCH_ALL_USERS_ACTION),
    mergeMap((action: fromUser.FetchAllUsersAction) => this._tokenService.get('users')
      .pipe(map(response => new fromUser.FetchAllUsersCompleteAction(response.json().message),
        catchError(error => of(new fromUser.FetchAllUsersFailedAction(error.json().message)))))));

  @Effect()
  fetchUser$: Observable<Action> = this._action$.pipe(ofType(fromUser.FETCH_USER_ACTION),
    mergeMap((action: fromUser.FetchUserAction) => this._tokenService.get(`users/${action.payload}`)
      .pipe(map(response => new fromUser.FetchUserCompleteAction(response.json().message),
        catchError(error => of(new fromUser.FetchUserFailedAction(error.json().message)))))));

  @Effect()
  filterUsers$: Observable<Action> = this._action$.pipe(ofType(fromUser.FILTER_USERS_ACTION),
    mergeMap((action: fromUser.FilterUsersAction) => this._tokenService.post('users/list', action.payload)
      .pipe(map(response => new fromUser.FilterUsersCompleteAction(response.json().message),
        catchError(error => of(new fromUser.FilterUsersFailedAction(error.json().message)))))));

  @Effect()
  createNewUser$: Observable<Action> = this._action$.pipe(ofType(fromUser.CREATE_NEW_USER_ACTION),
    mergeMap((action: fromUser.CreateNewUserAction) => this._tokenService.post('users', action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "users", "view"], { queryParams: { id: response.json().message.id } })
        return new fromUser.CreateNewUserCompleteAction(response.json().message)
      },
        catchError(error => of(new fromUser.CreateNewUserFailedAction(error.json().message)))))));

  @Effect()
  deleteUser$: Observable<Action> = this._action$.pipe(ofType(fromUser.DELETE_USER_ACTION),
    mergeMap((action: fromUser.DeleteUserAction) => this._tokenService.delete(`users/${action.payload}`)
      .pipe(map(response => new fromUser.DeleteUserCompleteAction(response.json().message),
        catchError(error => of(new fromUser.DeleteUserFailedAction(error.json().message)))))));

}