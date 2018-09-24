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
    exhaustMap(() => this._tokenService.post(`dashboard_data/mfg/all`, null)
      .pipe(
        map(response => new fromDashboard.FetchDashboardDataCompleteAction(response.json().message)),
        catchError(error => of(new fromDashboard.FetchDashboardDataFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchMFGCertificateGraphDashboard$: Observable<Action> = this._action$.ofType(fromDashboard.FETCH_MFG_CERTIFICATE_GRAPH_DASHBOARD_ACTION).pipe(
    map((action: fromDashboard.FetchMFGCertificateGraphDashboardDataAction) => action.payload),
    exhaustMap(body => this._tokenService.post(`dashboard_data/mfg/certificates/graph`, body)
      .pipe(
        map(response => new fromDashboard.FetchMFGCertificateGraphDashboardDataCompleteAction(response.json().message)),
        catchError(error => of(new fromDashboard.FetchMFGCertificateGraphDashboardDataFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchMFGCertificateTableDashboard$: Observable<Action> = this._action$.ofType(fromDashboard.FETCH_MFG_CERTIFICATE_TABLE_DASHBOARD_ACTION).pipe(
    map((action: fromDashboard.FetchMFGCertificateTableDashboardDataAction) => action.payload),
    exhaustMap(body => this._tokenService.post(`dashboard_data/mfg/certificates/table`, body)
      .pipe(
        map(response => new fromDashboard.FetchMFGCertificateTableDashboardDataCompleteAction(response.json().message)),
        catchError(error => of(new fromDashboard.FetchMFGCertificateTableDashboardDataFailedAction(error.json().message)))
      ))
  );

}