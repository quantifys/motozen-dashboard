import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

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

export class FetchAllExpensesAction implements Action {
  readonly type = FETCH_ALL_EXPENSES_ACTION;
  constructor(public payload?: any) { }
}

export class FetchAllExpensesCompleteAction implements Action {
  readonly type = FETCH_ALL_EXPENSES_COMPLETE_ACTION;
  constructor(public payload: any) { }
}

export class FetchAllExpensesFailedAction implements Action {
  readonly type = FETCH_ALL_EXPENSES_FAILED_ACTION;
  constructor(public payload?: any) { }
}

export class FetchExpenseAction implements Action {
  readonly type = FETCH_EXPENSE_ACTION;
  constructor(public payload?: any) { }
}

export class FetchExpenseCompleteAction implements Action {
  readonly type = FETCH_EXPENSE_COMPLETE_ACTION;
  constructor(public payload?: any) { }
}

export class FetchExpenseFailedAction implements Action {
  readonly type = FETCH_EXPENSE_FAILED_ACTION;
  constructor(public payload?: any) { }
}

export class CreateExpenseAction implements Action {
  readonly type = CREATE_EXPENSE_ACTION;
  constructor(public payload:any) { }
}

export class CreateExpenseCompleteAction implements Action {
  readonly type = CREATE_EXPENSE_COMPLETE_ACTION;
  constructor(public payload:any) {
    swal("Great!", "Expense was recorded.","success");
  }
}

export class CreateExpenseFailedAction implements Action {
  readonly type = CREATE_EXPENSE_FAILED_ACTION;
  constructor(public payload:any) {
    swal("There was an error.", payload, "error");
  }
}

export class UpdateExpenseAction implements Action {
  readonly type = UPDATE_EXPENSE_ACTION;
  constructor(public payload: any) { }
}

export class UpdateExpenseCompleteAction implements Action {
  readonly type = UPDATE_EXPENSE_COMPLETE_ACTION;
  constructor(public payload: any) {
    swal("Great!", "Expense was updated.","success");
  }
}

export class UpdateExpenseFailedAction implements Action {
  readonly type = UPDATE_EXPENSE_FAILED_ACTION;
  constructor(public payload?: any) {
    swal("There was an error.", payload, "error");
  }
}

export class DeleteExpenseAction implements Action {
  readonly type = DELETE_EXPENSE_ACTION;
  constructor(public payload: any) { }
}

export class DeleteExpenseCompleteAction implements Action {
  readonly type = DELETE_EXPENSE_COMPLETE_ACTION;
  constructor(public payload: any) {
    swal("Great!", "Expense was deleted.","success");
  }
}

export class DeleteExpenseFailedAction implements Action {
  readonly type = DELETE_EXPENSE_FAILED_ACTION;
  constructor(public payload?: any) {
    swal("There was an error.", payload, "error");
  }
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
  | DeleteExpenseFailedAction;