import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromRoot from '../../shared/reducers';
import * as fromSalarySlip from '../actions/salary-slip.actions';
import { SalarySlip } from '../models';

@Injectable()
export class SalarySlipEffects {

  private salarySlip: SalarySlip = new SalarySlip({});

  constructor(
    private _store: Store<fromRoot.State>,
    private _action$: Actions,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    this._store.select(fromRoot.getCurrentSalarySlip).subscribe(slip => this.salarySlip = slip);
  }

  @Effect()
  fetchSalarySlips$: Observable<Action> = this._action$.pipe(ofType(fromSalarySlip.FETCH_ALL_SALARY_SLIPS_ACTION),
    mergeMap((action: fromSalarySlip.FetchAllSalarySlipsAction) => this._tokenService.post('salary_slips/list', action.payload)
      .pipe(map(response => new fromSalarySlip.FetchAllSalarySlipsCompleteAction({
        data: response.json().message,
        total: response.headers.get('total'),
        per_page: response.headers.get('per-page')
      }),
        catchError(error => of(new fromSalarySlip.FetchAllSalarySlipsFailedAction(error.json().message)))))));

  @Effect()
  fetchSalarySlip$: Observable<Action> = this._action$.pipe(ofType(fromSalarySlip.FETCH_SALARY_SLIP_ACTION),
    mergeMap((action: fromSalarySlip.FetchSalarySlipAction) => this._tokenService.get(`salary_slips/${action.payload}`)
      .pipe(map(response => new fromSalarySlip.FetchSalarySlipCompleteAction(response.json().message),
        catchError(error => of(new fromSalarySlip.FetchSalarySlipFailedAction(error.json().message)))))));

  @Effect()
  createNewSalarySlip$: Observable<Action> = this._action$.pipe(ofType(fromSalarySlip.CREATE_SALARY_SLIP_ACTION),
    mergeMap((action: fromSalarySlip.CreateSalarySlipAction) => this._tokenService.post('salary_slips', action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "salary-slips", "view"], { queryParams: { id: response.json().message.id } })
        return new fromSalarySlip.CreateSalarySlipCompleteAction(response.json().message)
      },
        catchError(error => of(new fromSalarySlip.CreateSalarySlipFailedAction(error.json().message)))))));

  @Effect()
  deleteSalarySlip$: Observable<Action> = this._action$.pipe(ofType(fromSalarySlip.DELETE_SALARY_SLIP_ACTION),
    mergeMap((action: fromSalarySlip.DeleteSalarySlipAction) => this._tokenService.delete(`salary_slips/${this.salarySlip.id}`)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "salary-slips"]);
        return new fromSalarySlip.DeleteSalarySlipCompleteAction
      },
        catchError(error => of(new fromSalarySlip.DeleteSalarySlipFailedAction(error.json().message)))))));

  @Effect()
  confirmSalarySlip$: Observable<Action> = this._action$.pipe(ofType(fromSalarySlip.CONFIRM_SALARY_SLIP_ACTION),
    mergeMap((action: fromSalarySlip.ConfirmSalarySlipAction) => this._tokenService.post(`salary_slips/${this.salarySlip.id}/confirm`, action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "salary-slips"])
        return new fromSalarySlip.ConfirmSalarySlipCompleteAction(response.json().message);
      },
        catchError(error => of(new fromSalarySlip.ConfirmSalarySlipFailedAction(error.json().message)))))));

  @Effect()
  paySalarySlip$: Observable<Action> = this._action$.pipe(ofType(fromSalarySlip.PAY_SALARY_SLIP_ACTION),
    mergeMap((action: fromSalarySlip.PaySalarySlipAction) => this._tokenService.post(`salary_slips/${this.salarySlip.id}/pay`, action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "salary-slips"])
        return new fromSalarySlip.PaySalarySlipCompleteAction(response.json().message);
      },
        catchError(error => of(new fromSalarySlip.PaySalarySlipFailedAction(error.json().message)))))));

  @Effect()
  updateSalarySlip$: Observable<Action> = this._action$.pipe(ofType(fromSalarySlip.UPDATE_SALARY_SLIP_ACTION),
    mergeMap((action: fromSalarySlip.UpdateSalarySlipAction) => this._tokenService.patch(`salary_slips/${action.payload.salary_slip.id}`, action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "salary-slips", "view"], { queryParams: { id: response.json().message.id } });
        return new fromSalarySlip.UpdateSalarySlipCompleteAction(response.json().message);
      },
        catchError(error => of(new fromSalarySlip.UpdateSalarySlipFailedAction(error.json().message)))))));

  @Effect()
  fetchSalarySlipFormdata$: Observable<Action> = this._action$.pipe(ofType(fromSalarySlip.FETCH_SALARY_SLIP_FORMDATA_ACTION),
    mergeMap((action: fromSalarySlip.FetchSalarySlipFormDataAction) => this._tokenService.get('salary_slips/new')
      .pipe(map(response => new fromSalarySlip.FetchSalarySlipFormDataCompleteAction(response.json().message),
        catchError(error => of(new fromSalarySlip.FetchSalarySlipFormDataFailedAction(error.json().message)))))));

}