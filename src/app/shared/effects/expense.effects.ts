import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromExpense from '../actions/expense.actions';

@Injectable()
export class ExpenseEffects {
  constructor(
    private _action$: Actions,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) { }

  @Effect()
  fetchAllExpenses$: Observable<Action> = this._action$.pipe(ofType(fromExpense.FETCH_ALL_EXPENSES_ACTION),
    mergeMap((action: fromExpense.FetchAllExpensesAction) => this._tokenService.get('expenses')
      .pipe(map(response => new fromExpense.FetchAllExpensesCompleteAction({
        data: response.json().message,
        total: response.headers.get('total'),
        per_page: response.headers.get('per-page')
      }),
        catchError(error => of(new fromExpense.FetchAllExpensesFailedAction(error.json().message)))))));

  @Effect()
  fetchExpense$: Observable<Action> = this._action$.pipe(ofType(fromExpense.FETCH_EXPENSE_ACTION),
    mergeMap((action: fromExpense.FetchExpenseAction) => this._tokenService.get(`expenses/${action.payload}`)
      .pipe(map(response => new fromExpense.FetchExpenseCompleteAction(response.json().message),
        catchError(error => of(new fromExpense.FetchExpenseFailedAction(error.json().message)))))));

  @Effect()
  createNewExpense$: Observable<Action> = this._action$.pipe(ofType(fromExpense.CREATE_EXPENSE_ACTION),
    mergeMap((action: fromExpense.CreateExpenseAction) => this._tokenService.post('expenses', action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "expenses", "view"], { queryParams: { id: response.json().message.id } })
        return new fromExpense.CreateExpenseCompleteAction(response.json().message)
      },
        catchError(error => of(new fromExpense.CreateExpenseFailedAction(error.json().message)))))));

  @Effect()
  deleteExpense$: Observable<Action> = this._action$.pipe(ofType(fromExpense.DELETE_EXPENSE_ACTION),
    mergeMap((action: fromExpense.DeleteExpenseAction) => this._tokenService.delete(`expenses/${action.payload}`)
      .pipe(map(response => new fromExpense.DeleteExpenseCompleteAction(action.payload),
        catchError(error => of(new fromExpense.DeleteExpenseFailedAction(error.json().message)))))));

  @Effect()
  updateExpense$: Observable<Action> = this._action$.pipe(ofType(fromExpense.UPDATE_EXPENSE_ACTION),
    mergeMap((action: fromExpense.UpdateExpenseAction) => this._tokenService.patch(`expenses/${action.payload.expense.id}`, action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "expenses", "view"], { queryParams: { id: response.json().message.id } });
        return new fromExpense.UpdateExpenseCompleteAction(response.json().message);
      },
        catchError(error => of(new fromExpense.UpdateExpenseFailedAction(error.json().message)))))));

}