import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

const toast = (swal as any).mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000
});

export const FETCH_ALL_TRANSACTIONS_ACTION = '[Transaction] Fetch All Transactions Action';
export const FETCH_ALL_TRANSACTIONS_COMPLETE_ACTION = '[Transaction] Fetch All Transactions Complete Action';
export const FETCH_ALL_TRANSACTIONS_FAILED_ACTION = '[Transaction] Fetch All Transactions Failed Action';

export const FETCH_TRANSACTION_ACTION = '[Transaction] Fetch Transaction Action';
export const FETCH_TRANSACTION_COMPLETE_ACTION = '[Transaction] Fetch Transaction Complete Action';
export const FETCH_TRANSACTION_FAILED_ACTION = '[Transaction] Fetch Transaction Failed Action';

export class FetchAllTransactionsAction implements Action {
  readonly type = FETCH_ALL_TRANSACTIONS_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Loading transactions...'
    });
    toast.showLoading();
  }
}

export class FetchAllTransactionsCompleteAction implements Action {
  readonly type = FETCH_ALL_TRANSACTIONS_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Transactions fetched!'
    });
  }
}

export class FetchAllTransactionsFailedAction implements Action {
  readonly type = FETCH_ALL_TRANSACTIONS_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: payload
    });
  }
}

export class FetchTransactionAction implements Action {
  readonly type = FETCH_TRANSACTION_ACTION;
  constructor(public payload: any) { }
}

export class FetchTransactionCompleteAction implements Action {
  readonly type = FETCH_TRANSACTION_COMPLETE_ACTION;
  constructor(public payload: any) { }
}

export class FetchTransactionFailedAction implements Action {
  readonly type = FETCH_TRANSACTION_FAILED_ACTION;
  constructor(public payload: any) { }
}

export type Actions =
  FetchAllTransactionsAction
  | FetchAllTransactionsCompleteAction
  | FetchAllTransactionsFailedAction
  | FetchTransactionAction
  | FetchTransactionCompleteAction
  | FetchTransactionFailedAction;