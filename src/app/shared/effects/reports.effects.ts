import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import * as fromReports from '../actions/reports.actions';

@Injectable()
export class ReportEffects {

  constructor(
    private _action$: Actions,
    private _tokenService: Angular2TokenService
  ) { }

  @Effect()
  fetchPOSummary$: Observable<Action> = this._action$.ofType(fromReports.FETCH_PO_SUMMARY_MFG_ACTION).pipe(
    map((action: fromReports.FetchPOSummaryMFGAction) => action.payload),
    exhaustMap(body => this._tokenService.post(`reports/po-summary`, body)
      .pipe(
        map(response => new fromReports.FetchPOSummaryMFGCompleteAction(response.json().message),
        catchError(error => of(new fromReports.FetchPOSummaryMFGFailedAction(error.json().message)))
      ))
  ));

  @Effect()
  fetchPOSummaryFormData$: Observable<Action> = this._action$.ofType(fromReports.FETCH_PO_SUMMARY_MFG_FORM_DATA_ACTION).pipe(
    map((action: fromReports.FetchPOSummaryMFGFormDataAction) => action),
    exhaustMap(() => this._tokenService.get(`purchase_orders/list/filter-data`)
      .pipe(
        map(response => new fromReports.FetchPOSummaryMFGFormDataCompleteAction(response.json().message),
        catchError(error => of(new fromReports.FetchPOSummaryMFGFormDataFailedAction(error.json().message)))
      ))
  ));

  @Effect()
  fetchStockSummary$: Observable<Action> = this._action$.ofType(fromReports.FETCH_STOCK_SUMMARY_ACTION).pipe(
    map((action: fromReports.FetchStockSummaryAction) => action.payload),
    exhaustMap(body => this._tokenService.post(`reports/stock-summary`, body)
      .pipe(
        map(response => new fromReports.FetchStockSummaryCompleteAction(response.json().message),
        catchError(error => of(new fromReports.FetchStockSummaryFailedAction(error.json().message)))
      ))
  ));

  @Effect()
  fetchPODetailsReporty$: Observable<Action> = this._action$.ofType(fromReports.FETCH_PO_DETAILS_REPORT_ACTION).pipe(
    map((action: fromReports.FetchPODetailsReportAction) => action.payload),
    exhaustMap(body => this._tokenService.post(`purchase_orders/list/for-report`, body)
      .pipe(
        map(response => new fromReports.FetchPODetailsReportCompleteAction(response.json().message),
        catchError(error => of(new fromReports.FetchPODetailsReportFailedAction(error.json().message)))
      ))
  ));

}