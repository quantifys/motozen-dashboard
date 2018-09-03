import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import * as fromRoot from '../../shared/reducers';
import * as fromIncome from '../actions/income.actions';
import { Cost } from '../models';

@Injectable()
export class IncomeEffects {

  private income: Cost = new Cost({});

  constructor(
    private _action$: Actions,
    private _store: Store<fromRoot.State>,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    this._store.select(fromRoot.getCurrentIncome).subscribe(income => this.income = income);
  }

  @Effect()
  fetchAllIncomes$: Observable<Action> = this._action$.ofType(fromIncome.FETCH_ALL_INCOMES_ACTION).pipe(
    map((action: fromIncome.FetchAllIncomesAction) => action.payload),
    exhaustMap(body => this._tokenService.post(`incomes/list`, body)
      .pipe(
        map(response => new fromIncome.FetchAllIncomesCompleteAction({
          data: response.json().message,
          total: response.headers.get('total'),
          per_page: response.headers.get('per-page')
        })),
        catchError(error => of(new fromIncome.FetchAllIncomesFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchIncome$: Observable<Action> = this._action$.ofType(fromIncome.FETCH_INCOME_ACTION).pipe(
    map((action: fromIncome.FetchIncomeAction) => action.payload),
    exhaustMap(id => this._tokenService.get(`incomes/${id}`)
      .pipe(
        map(response => new fromIncome.FetchIncomeCompleteAction(response.json().message)),
        catchError(error => of(new fromIncome.FetchIncomeFailedAction(error.json().message)))
      ))
  );

  @Effect()
  createNewIncome$: Observable<Action> = this._action$.ofType(fromIncome.CREATE_INCOME_ACTION).pipe(
    map((action: fromIncome.CreateIncomeAction) => action.payload),
    exhaustMap(body => this._tokenService.post('incomes', body)
      .pipe(
        map(response => {
          this._router.navigate(["dashboard", "incomes", "view"], { queryParams: { id: response.json().message.id } });
          return new fromIncome.CreateIncomeCompleteAction(response.json().message)
        }),
        catchError(error => of(new fromIncome.CreateIncomeFailedAction(error.json().message)))
      ))
  );

  @Effect()
  deleteIncome$: Observable<Action> = this._action$.ofType(fromIncome.DELETE_INCOME_ACTION).pipe(
    map((action: fromIncome.DeleteIncomeAction) => action),
    exhaustMap(() => this._tokenService.delete(`incomes/${this.income.id}`)
      .pipe(
        map(() => {
          this._router.navigate(["dashboard", "incomes"]);
          return new fromIncome.DeleteIncomeCompleteAction(this.income.id);
        }),
        catchError(error => of(new fromIncome.DeleteIncomeFailedAction(error.json().message)))
      ))
  );

  @Effect()
  updateIncome$: Observable<Action> = this._action$.ofType(fromIncome.UPDATE_INCOME_ACTION).pipe(
    map((action: fromIncome.UpdateIncomeAction) => action.payload),
    exhaustMap(body => this._tokenService.patch(`incomes/${this.income.id}`, body)
      .pipe(
        map(response => {
          this._router.navigate(["dashboard", "incomes", "view"], { queryParams: { id: response.json().message.id } });
          return new fromIncome.UpdateIncomeCompleteAction(response.json().message)
        }),
        catchError(error => of(new fromIncome.UpdateIncomeFailedAction(error.json().message)))
      ))
  );

}