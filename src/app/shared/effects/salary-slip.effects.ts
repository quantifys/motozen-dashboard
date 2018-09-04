import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

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
  fetchSalarySlips$: Observable<Action> = this._action$.ofType(fromSalarySlip.FETCH_ALL_SALARY_SLIPS_ACTION).pipe(
    map((action: fromSalarySlip.FetchAllSalarySlipsAction) => action.payload),
    exhaustMap(body => this._tokenService.post('salary_slips/list', body)
      .pipe(
        map(response => new fromSalarySlip.FetchAllSalarySlipsCompleteAction({
          data: response.json().message,
          total: response.headers.get('total'),
          per_page: response.headers.get('per-page')
        })),
        catchError(error => of(new fromSalarySlip.FetchAllSalarySlipsFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchSalarySlip$: Observable<Action> = this._action$.ofType(fromSalarySlip.FETCH_SALARY_SLIP_ACTION).pipe(
    map((action: fromSalarySlip.FetchSalarySlipAction) => action.payload),
    exhaustMap(id => this._tokenService.get(`salary_slips/${id}`)
      .pipe(
        map(response => new fromSalarySlip.FetchSalarySlipCompleteAction(response.json().message)),
        catchError(error => of(new fromSalarySlip.FetchSalarySlipFailedAction(error.json().message)))
      ))
  );

  @Effect()
  createNewSalarySlip$: Observable<Action> = this._action$.ofType(fromSalarySlip.CREATE_SALARY_SLIP_ACTION).pipe(
    map((action: fromSalarySlip.CreateSalarySlipAction) => action.payload),
    exhaustMap(body => this._tokenService.post('salary_slips', body)
      .pipe(
        map(response => {
          this._router.navigate(["dashboard", "salary-slips", "view"], { queryParams: { id: response.json().message.id } });
          return new fromSalarySlip.CreateSalarySlipCompleteAction(response.json().message)
        }),
        catchError(error => of(new fromSalarySlip.CreateSalarySlipFailedAction(error.json().message)))
      ))
  );

  @Effect()
  deleteSalarySlip$: Observable<Action> = this._action$.ofType(fromSalarySlip.DELETE_SALARY_SLIP_ACTION).pipe(
    map((action: fromSalarySlip.DeleteSalarySlipAction) => action),
    exhaustMap(() => this._tokenService.delete(`salary_slips/${this.salarySlip.id}`)
      .pipe(
        map(() => {
          this._router.navigate(["dashboard", "salary-slips"]);
          return new fromSalarySlip.DeleteSalarySlipCompleteAction(this.salarySlip.id);
        }),
        catchError(error => of(new fromSalarySlip.DeleteSalarySlipFailedAction(error.json().message)))
      ))
  );

  @Effect()
  updateSalarySlip$: Observable<Action> = this._action$.ofType(fromSalarySlip.UPDATE_SALARY_SLIP_ACTION).pipe(
    map((action: fromSalarySlip.UpdateSalarySlipAction) => action.payload),
    exhaustMap(body => this._tokenService.patch(`salary_slips/${this.salarySlip.id}`, body)
      .pipe(
        map(response => {
          this._router.navigate(["dashboard", "salary-slips", "view"], { queryParams: { id: response.json().message.id } });
          return new fromSalarySlip.UpdateSalarySlipCompleteAction(response.json().message)
        }),
        catchError(error => of(new fromSalarySlip.UpdateSalarySlipFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchingSalarySlipFormData$: Observable<Action> = this._action$.ofType(fromSalarySlip.FETCH_SALARY_SLIP_FORMDATA_ACTION).pipe(
    map((action: fromSalarySlip.FetchSalarySlipFormDataAction) => action),
    exhaustMap(() => this._tokenService.get("salary_slips/new")
      .pipe(
        map(response => new fromSalarySlip.FetchSalarySlipFormDataCompleteAction(response.json().message)),
        catchError(error => of(new fromSalarySlip.FetchSalarySlipFormDataFailedAction(error.json().message)))
      ))
  );

  @Effect()
  confirmSalarySlip$: Observable<Action> = this._action$.ofType(fromSalarySlip.CONFIRM_SALARY_SLIP_ACTION).pipe(
    map((action: fromSalarySlip.ConfirmSalarySlipAction) => action.payload),
    exhaustMap(body => this._tokenService.post(`req_orders/${this.salarySlip.id}/confirm`, body)
      .pipe(
        map(response => new fromSalarySlip.ConfirmSalarySlipCompleteAction(response.json().message)),
        catchError(error => of(new fromSalarySlip.ConfirmSalarySlipFailedAction(error.json().message)))
      ))
  );

  @Effect()
  openRequisitionOrder$: Observable<Action> = this._action$.ofType(fromSalarySlip.PAY_SALARY_SLIP_ACTION).pipe(
    map((action: fromSalarySlip.PaySalarySlipAction) => action.payload),
    exhaustMap(body => this._tokenService.post(`req_orders/${this.salarySlip.id}/pay`, body)
      .pipe(
        map(response => new fromSalarySlip.PaySalarySlipCompleteAction(response.json().message)),
        catchError(error => of(new fromSalarySlip.PaySalarySlipFailedAction(error.json().message)))
      ))
  );

}