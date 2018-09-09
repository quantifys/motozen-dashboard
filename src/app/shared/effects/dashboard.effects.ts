import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import * as fromDashboard from '../actions/dashboard.actions';

@Injectable()
export class DashboardEffects {

  constructor(
    private _action$: Actions,
    private _tokenService: Angular2TokenService,
  ) {
  }

  @Effect()
  fetchDashboard$: Observable<Action> = this._action$.ofType(fromDashboard.FETCH_DASHBOARD_ACTION).pipe(
    map((action: fromDashboard.FetchDashboardDataAction) => action),
    exhaustMap(() => this._tokenService.get(`dashboard_data`)
      .pipe(
        map(response => new fromDashboard.FetchDashboardDataCompleteAction(response.json().message)),
        catchError(error => of(new fromDashboard.FetchDashboardDataFailedAction(error.json().message)))
      ))
  );

}