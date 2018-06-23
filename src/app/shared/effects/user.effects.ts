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
        catchError(error => {
          this._tokenService.signOut();
          this._router.navigate(['/login']);
          return of(new fromUser.ValidateUserTokenFailedAction(error.json()));
        }))));

  @Effect()
  signOutUser$: Observable<Action> = this._action$.pipe(ofType(fromUser.SIGNOUT_USER_ACTION),
    mergeMap((action: fromUser.SignoutUserAction) => this._tokenService.signOut()
      .pipe(map(response => {
        this._router.navigate(["login"]);
        return new fromUser.SignoutUserCompleteAction();
      },
        catchError(error => of(new fromUser.SignoutUserFailedAction(error.json())))))));
        
}