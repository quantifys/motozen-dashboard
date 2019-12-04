import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import { User } from '../models';
import * as fromRoot from '../../shared/reducers';
import * as fromDashboard from '../actions/dashboard.actions';

@Injectable()
export class DashboardEffects {

  public loggedUser: User = new User({});

  constructor(
    private _store: Store<fromRoot.State>,
    private _action$: Actions,
    private _tokenService: Angular2TokenService,
  ) {
    this._store.select(fromRoot.getLoggedUser).subscribe(user => this.loggedUser = user);
  }

  @Effect()
  fetchDashboard$: Observable<Action> = this._action$.ofType(fromDashboard.FETCH_DASHBOARD_ACTION).pipe(
    map((action: fromDashboard.FetchDashboardDataAction) => action),
    exhaustMap(() => this._tokenService
      .post(`dashboard_data/mfg/all`, null)
      .pipe(
        map(response => new fromDashboard.FetchDashboardDataCompleteAction(response.json().message)),
        catchError(error => of(new fromDashboard.FetchDashboardDataFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchDistributorDashboard$: Observable<Action> = this._action$.ofType(fromDashboard.FETCH_DIST_DASHBOARD_ACTION).pipe(
    map((action: fromDashboard.FetchDistDashboardDataAction) => action),
    exhaustMap(() => this._tokenService
      .post(`dashboard_data/distributor/all`, null)
      .pipe(
        map(response => new fromDashboard.FetchDistDashboardDataCompleteAction(response.json().message)),
        catchError(error => of(new fromDashboard.FetchDistDashboardDataFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchMFGCertificateGraphDashboard$: Observable<Action> = this._action$
    .ofType(fromDashboard.FETCH_MFG_CERTIFICATE_GRAPH_DASHBOARD_ACTION).pipe(
      map((action: fromDashboard.FetchMFGCertificateGraphDashboardDataAction) => action.payload),
      exhaustMap(body => this._tokenService.post(`dashboard_data/mfg/certificates/graph`, body)
        .pipe(
          map(response => new fromDashboard.FetchMFGCertificateGraphDashboardDataCompleteAction(response.json().message)),
          catchError(error => of(new fromDashboard.FetchMFGCertificateGraphDashboardDataFailedAction(error.json().message)))
        ))
    );

  @Effect()
  fetchMFGCertificateTableDashboard$: Observable<Action> = this._action$
    .ofType(fromDashboard.FETCH_MFG_CERTIFICATE_TABLE_DASHBOARD_ACTION).pipe(
      map((action: fromDashboard.FetchMFGCertificateTableDashboardDataAction) => action.payload),
      exhaustMap(body => this._tokenService.post(`dashboard_data/mfg/certificates/table`, body)
        .pipe(
          map(response => new fromDashboard.FetchMFGCertificateTableDashboardDataCompleteAction(response.json().message)),
          catchError(error => of(new fromDashboard.FetchMFGCertificateTableDashboardDataFailedAction(error.json().message)))
        ))
    );

  @Effect()
  fetchMFGTrackerCertificateGraphDashboard$: Observable<Action> = this._action$
    .ofType(fromDashboard.FETCH_MFG_TRACKER_CERTIFICATE_GRAPH_DASHBOARD_ACTION).pipe(
      map((action: fromDashboard.FetchMFGTrackerCertificateGraphDashboardDataAction) => action.payload),
      exhaustMap(body => this._tokenService.post(`dashboard_data/mfg/tracker_certificates/graph`, body)
        .pipe(
          map(response => new fromDashboard.FetchMFGTrackerCertificateGraphDashboardDataCompleteAction(response.json().message)),
          catchError(error => of(new fromDashboard.FetchMFGTrackerCertificateGraphDashboardDataFailedAction(error.json().message)))
        ))
    );

  @Effect()
  fetchMFGTrackerCertificateTableDashboard$: Observable<Action> = this._action$
    .ofType(fromDashboard.FETCH_MFG_TRACKER_CERTIFICATE_TABLE_DASHBOARD_ACTION).pipe(
      map((action: fromDashboard.FetchMFGTrackerCertificateTableDashboardDataAction) => action.payload),
      exhaustMap(body => this._tokenService.post(`dashboard_data/mfg/tracker_certificates/table`, body)
        .pipe(
          map(response => new fromDashboard.FetchMFGTrackerCertificateTableDashboardDataCompleteAction(response.json().message)),
          catchError(error => of(new fromDashboard.FetchMFGTrackerCertificateTableDashboardDataFailedAction(error.json().message)))
        ))
    );
}
