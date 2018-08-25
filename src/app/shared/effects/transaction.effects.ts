import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromTransaction from '../actions/transaction.action';

@Injectable()
export class TransactionEffects {

  constructor(
    private _action$: Actions,
    private _tokenService: Angular2TokenService
  ) { }

  @Effect()
  fetchTransactions$: Observable<Action> = this._action$.pipe(ofType(fromTransaction.FETCH_ALL_TRANSACTIONS_ACTION),
    mergeMap((action: fromTransaction.FetchAllTransactionsAction) => this._tokenService.post('transactions/list', action.payload)
      .pipe(map(response => new fromTransaction.FetchAllTransactionsCompleteAction({
        data: response.json().message,
        total: response.headers.get('total'),
        per_page: response.headers.get('per-page')
      }),
        catchError(error => of(new fromTransaction.FetchAllTransactionsFailedAction(error.json().message)))))));

  @Effect()
  fetchTransaction$: Observable<Action> = this._action$.pipe(ofType(fromTransaction.FETCH_TRANSACTION_ACTION),
    mergeMap((action: fromTransaction.FetchTransactionAction) => this._tokenService.get(`transactions/${action.payload}`)
      .pipe(map(response => new fromTransaction.FetchTransactionCompleteAction(response.json().message),
        catchError(error => of(new fromTransaction.FetchTransactionFailedAction(error.json().message)))))));

}