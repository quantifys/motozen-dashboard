import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

const toast = (swal as any).mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000
});

export const FETCH_ALL_EXPENSES_ACTION = '[Expense] Fetch All Expenses Action';
export const FETCH_ALL_EXPENSES_COMPLETE_ACTION = '[Expense] Fetch All Expenses Complete Action';
export const FETCH_ALL_EXPENSES_FAILED_ACTION = '[Expense] Fetch All Expenses Failed Action';

export const FETCH_EXPENSE_ACTION = '[Expense] Fetch Expense Action';
export const FETCH_EXPENSE_COMPLETE_ACTION = '[Expense] Fetch Expense Complete Action';
export const FETCH_EXPENSE_FAILED_ACTION = '[Expense] Fetch Expense Failed Action';

export const CREATE_EXPENSE_ACTION = '[Expense] Create Expense Action';
export const CREATE_EXPENSE_COMPLETE_ACTION = '[Expense] Create Expense Complete Action';
export const CREATE_EXPENSE_FAILED_ACTION = '[Expense] Create Expense Failed Action';

export const UPDATE_EXPENSE_ACTION = '[Expense] Update Expense Action';
export const UPDATE_EXPENSE_COMPLETE_ACTION = '[Expense] Update Expense Complete Action';
export const UPDATE_EXPENSE_FAILED_ACTION = '[Expense] Update Expense Failed Action';

export const DELETE_EXPENSE_ACTION = '[Expense] Delete Expense Action';
export const DELETE_EXPENSE_COMPLETE_ACTION = '[Expense] Delete Expense Complete Action';
export const DELETE_EXPENSE_FAILED_ACTION = '[Expense] Delete Expense Failed Action';

export const CLEAR_EXPENSE_ACTION = '[Expense] Clear Expense Action';

export class FetchAllExpensesAction implements Action {
  readonly type = FETCH_ALL_EXPENSES_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching expenses...'
    });
    toast.showLoading();
  }
}

export class FetchAllExpensesCompleteAction implements Action {
  readonly type = FETCH_ALL_EXPENSES_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Expense list loaded!'
    });
  }
}

export class FetchAllExpensesFailedAction implements Action {
  readonly type = FETCH_ALL_EXPENSES_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchExpenseAction implements Action {
  readonly type = FETCH_EXPENSE_ACTION;
  constructor(public payload?: any) {
    toast({
      title: 'Loading expense...'
    });
    toast.showLoading();
  }
}

export class FetchExpenseCompleteAction implements Action {
  readonly type = FETCH_EXPENSE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Expense loaded!'
    });
  }
}

export class FetchExpenseFailedAction implements Action {
  readonly type = FETCH_EXPENSE_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class CreateExpenseAction implements Action {
  readonly type = CREATE_EXPENSE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Adding expense...'
    });
    toast.showLoading();
  }
}

export class CreateExpenseCompleteAction implements Action {
  readonly type = CREATE_EXPENSE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Expense added!'
    });
  }
}

export class CreateExpenseFailedAction implements Action {
  readonly type = CREATE_EXPENSE_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class UpdateExpenseAction implements Action {
  readonly type = UPDATE_EXPENSE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Updating expense...'
    });
    toast.showLoading();
  }
}

export class UpdateExpenseCompleteAction implements Action {
  readonly type = UPDATE_EXPENSE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Expense updated!'
    });
  }
}

export class UpdateExpenseFailedAction implements Action {
  readonly type = UPDATE_EXPENSE_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class DeleteExpenseAction implements Action {
  readonly type = DELETE_EXPENSE_ACTION;
  constructor() {
    toast({
      title: 'Deleting expense...'
    });
    toast.showLoading();
  }
}

export class DeleteExpenseCompleteAction implements Action {
  readonly type = DELETE_EXPENSE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Expense deleted!'
    });
  }
}

export class DeleteExpenseFailedAction implements Action {
  readonly type = DELETE_EXPENSE_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class ClearExpenseAction implements Action {
  readonly type = CLEAR_EXPENSE_ACTION;
}

export type Actions =
  FetchAllExpensesAction
  | FetchAllExpensesCompleteAction
  | FetchAllExpensesFailedAction
  | FetchExpenseAction
  | FetchExpenseCompleteAction
  | FetchExpenseFailedAction
  | CreateExpenseAction
  | CreateExpenseCompleteAction
  | CreateExpenseFailedAction
  | UpdateExpenseAction
  | UpdateExpenseCompleteAction
  | UpdateExpenseFailedAction
  | DeleteExpenseAction
  | DeleteExpenseCompleteAction
  | DeleteExpenseFailedAction
  | ClearExpenseAction;
