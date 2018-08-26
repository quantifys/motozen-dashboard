import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromRoot from '../../shared/reducers';
import * as fromIncome from '../actions/income.actions';
import { Cost } from '../models';

@Injectable()
export class IncomeEffects {

  private income: Cost = new Cost({});

  constructor(
    private _store: Store<fromRoot.State>,
    private _action$: Actions,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    this._store.select(fromRoot.getCurrentIncome).subscribe(slip => this.income = slip);
  }

  @Effect()
  fetchAllIncomes$: Observable<Action> = this._action$.pipe(ofType(fromIncome.FETCH_ALL_INCOMES_ACTION),
    mergeMap((action: fromIncome.FetchAllIncomesAction) => this._tokenService.get('incomes')
      .pipe(map(response => new fromIncome.FetchAllIncomesCompleteAction({
        data: response.json().message,
        total: response.headers.get('total'),
        per_page: response.headers.get('per-page')
      }),
        catchError(error => of(new fromIncome.FetchAllIncomesFailedAction(error.json().message)))))));

  @Effect()
  fetchIncome$: Observable<Action> = this._action$.pipe(ofType(fromIncome.FETCH_INCOME_ACTION),
    mergeMap((action: fromIncome.FetchIncomeAction) => this._tokenService.get(`incomes/${action.payload}`)
      .pipe(map(response => new fromIncome.FetchIncomeCompleteAction(response.json().message),
        catchError(error => of(new fromIncome.FetchIncomeFailedAction(error.json().message)))))));

  @Effect()
  createNewIncome$: Observable<Action> = this._action$.pipe(ofType(fromIncome.CREATE_INCOME_ACTION),
    mergeMap((action: fromIncome.CreateIncomeAction) => this._tokenService.post('incomes', action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "incomes", "view"], { queryParams: { id: response.json().message.id } })
        return new fromIncome.CreateIncomeCompleteAction(response.json().message)
      },
        catchError(error => of(new fromIncome.CreateIncomeFailedAction(error.json().message)))))));

  @Effect()
  deleteIncome$: Observable<Action> = this._action$.pipe(ofType(fromIncome.DELETE_INCOME_ACTION),
    mergeMap((action: fromIncome.DeleteIncomeAction) => this._tokenService.delete(`incomes/${this.income.id}`)
    .pipe(map(response => {
      this._router.navigate(["dashboard", "incomes"]);
      return new fromIncome.DeleteIncomeCompleteAction
    },
        catchError(error => of(new fromIncome.DeleteIncomeFailedAction(error.json().message)))))));

  @Effect()
  updateIncome$: Observable<Action> = this._action$.pipe(ofType(fromIncome.UPDATE_INCOME_ACTION),
    mergeMap((action: fromIncome.UpdateIncomeAction) => this._tokenService.patch(`incomes/${action.payload.income.id}`, action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "incomes", "view"], { queryParams: { id: response.json().message.id } });
        return new fromIncome.UpdateIncomeCompleteAction(response.json().message);
      },
        catchError(error => of(new fromIncome.UpdateIncomeFailedAction(error.json().message)))))));

}