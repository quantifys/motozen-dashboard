import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import * as fromTransaction from '../actions/transaction.actions';

@Injectable()
export class TransactionEffects {

  constructor(
    private _action$: Actions,
    private _tokenService: Angular2TokenService
  ) { }

  @Effect()
  fetchTransactions$: Observable<Action> = this._action$.ofType(fromTransaction.FETCH_ALL_TRANSACTIONS_ACTION).pipe(
    map((action: fromTransaction.FetchAllTransactionsAction) => action.payload),
    exhaustMap(body => this._tokenService.post('transactions/list', body)
      .pipe(
        map(response => new fromTransaction.FetchAllTransactionsCompleteAction({
          data: response.json().message,
          total: response.headers.get('total'),
          per_page: response.headers.get('per-page')
        })),
        catchError(error => of(new fromTransaction.FetchAllTransactionsFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchTransaction$: Observable<Action> = this._action$.ofType(fromTransaction.FETCH_TRANSACTION_ACTION).pipe(
    map((action: fromTransaction.FetchTransactionAction) => action.payload),
    exhaustMap(id => this._tokenService.get(`transactions/${id}`)
      .pipe(
        map(response => new fromTransaction.FetchTransactionCompleteAction(response.json().message)),
        catchError(error => of(new fromTransaction.FetchTransactionFailedAction(error.json().message)))
      ))
  );

}