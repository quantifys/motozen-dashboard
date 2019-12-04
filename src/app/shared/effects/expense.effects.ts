import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import * as fromRoot from '../../shared/reducers';
import * as fromExpense from '../actions/expense.actions';
import { Cost } from '../models';

@Injectable()
export class ExpenseEffects {

  private expense: Cost = new Cost({});

  constructor(
    private _action$: Actions,
    private _store: Store<fromRoot.State>,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    this._store.select(fromRoot.getCurrentExpense).subscribe(expense => this.expense = expense);
  }

  @Effect()
  fetchAllExpenses$: Observable<Action> = this._action$.ofType(fromExpense.FETCH_ALL_EXPENSES_ACTION).pipe(
    map((action: fromExpense.FetchAllExpensesAction) => action.payload),
    exhaustMap(body => this._tokenService.post(`expenses/list`, body)
      .pipe(
        map(response => new fromExpense.FetchAllExpensesCompleteAction({
          data: response.json().message,
          total: response.headers.get('total'),
          per_page: response.headers.get('per-page')
        })),
        catchError(error => of(new fromExpense.FetchAllExpensesFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchExpense$: Observable<Action> = this._action$.ofType(fromExpense.FETCH_EXPENSE_ACTION).pipe(
    map((action: fromExpense.FetchExpenseAction) => action.payload),
    exhaustMap(id => this._tokenService.get(`expenses/${id}`)
      .pipe(
        map(response => new fromExpense.FetchExpenseCompleteAction(response.json().message)),
        catchError(error => of(new fromExpense.FetchExpenseFailedAction(error.json().message)))
      ))
  );

  @Effect()
  createNewExpense$: Observable<Action> = this._action$.ofType(fromExpense.CREATE_EXPENSE_ACTION).pipe(
    map((action: fromExpense.CreateExpenseAction) => action.payload),
    exhaustMap(body => this._tokenService.post('expenses', body)
      .pipe(
        map(response => {
          this._router.navigate(['dashboard', 'expenses', 'view'], { queryParams: { id: response.json().message.id } });
          return new fromExpense.CreateExpenseCompleteAction(response.json().message);
        }),
        catchError(error => of(new fromExpense.CreateExpenseFailedAction(error.json().message)))
      ))
  );

  @Effect()
  deleteExpense$: Observable<Action> = this._action$.ofType(fromExpense.DELETE_EXPENSE_ACTION).pipe(
    map((action: fromExpense.DeleteExpenseAction) => action),
    exhaustMap(() => this._tokenService.delete(`expenses/${this.expense.id}`)
      .pipe(
        map(() => {
          this._router.navigate(['dashboard', 'expenses']);
          return new fromExpense.DeleteExpenseCompleteAction(this.expense.id);
        }),
        catchError(error => of(new fromExpense.DeleteExpenseFailedAction(error.json().message)))
      ))
  );

  @Effect()
  updateExpense$: Observable<Action> = this._action$.ofType(fromExpense.UPDATE_EXPENSE_ACTION).pipe(
    map((action: fromExpense.UpdateExpenseAction) => action.payload),
    exhaustMap(body => this._tokenService.patch(`expenses/${this.expense.id}`, body)
      .pipe(
        map(response => {
          this._router.navigate(['dashboard', 'expenses', 'view'], { queryParams: { id: response.json().message.id } });
          return new fromExpense.UpdateExpenseCompleteAction(response.json().message);
        }),
        catchError(error => of(new fromExpense.UpdateExpenseFailedAction(error.json().message)))
      ))
  );
}
