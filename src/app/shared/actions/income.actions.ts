import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

const toast = (swal as any).mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000
});

export const FETCH_ALL_INCOMES_ACTION = '[Income] Fetch All Incomes Action';
export const FETCH_ALL_INCOMES_COMPLETE_ACTION = '[Income] Fetch All Incomes Complete Action';
export const FETCH_ALL_INCOMES_FAILED_ACTION = '[Income] Fetch All Incomes Failed Action';

export const FETCH_INCOME_ACTION = '[Income] Fetch Income Action';
export const FETCH_INCOME_COMPLETE_ACTION = '[Income] Fetch Income Complete Action';
export const FETCH_INCOME_FAILED_ACTION = '[Income] Fetch Income Failed Action';

export const CREATE_INCOME_ACTION = '[Income] Create Income Action';
export const CREATE_INCOME_COMPLETE_ACTION = '[Income] Create Income Complete Action';
export const CREATE_INCOME_FAILED_ACTION = '[Income] Create Income Failed Action';

export const UPDATE_INCOME_ACTION = '[Income] Update Income Action';
export const UPDATE_INCOME_COMPLETE_ACTION = '[Income] Update Income Complete Action';
export const UPDATE_INCOME_FAILED_ACTION = '[Income] Update Income Failed Action';

export const DELETE_INCOME_ACTION = '[Income] Delete Income Action';
export const DELETE_INCOME_COMPLETE_ACTION = '[Income] Delete Income Complete Action';
export const DELETE_INCOME_FAILED_ACTION = '[Income] Delete Income Failed Action';

export class FetchAllIncomesAction implements Action {
  readonly type = FETCH_ALL_INCOMES_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Loading income list...'
    });
    toast.showLoading();
  }
}

export class FetchAllIncomesCompleteAction implements Action {
  readonly type = FETCH_ALL_INCOMES_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Incomes fetched!'
    });
  }
}

export class FetchAllIncomesFailedAction implements Action {
  readonly type = FETCH_ALL_INCOMES_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchIncomeAction implements Action {
  readonly type = FETCH_INCOME_ACTION;
  constructor(public payload?: any) {
    toast({
      title: 'Loading income data...'
    });
    toast.showLoading();
  }
}

export class FetchIncomeCompleteAction implements Action {
  readonly type = FETCH_INCOME_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'Income fetched!'
    });
  }
}

export class FetchIncomeFailedAction implements Action {
  readonly type = FETCH_INCOME_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class CreateIncomeAction implements Action {
  readonly type = CREATE_INCOME_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Adding income data...'
    });
    toast.showLoading();
  }
}

export class CreateIncomeCompleteAction implements Action {
  readonly type = CREATE_INCOME_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Income added!'
    });
  }
}

export class CreateIncomeFailedAction implements Action {
  readonly type = CREATE_INCOME_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class UpdateIncomeAction implements Action {
  readonly type = UPDATE_INCOME_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Updating income data...'
    });
    toast.showLoading();
  }
}

export class UpdateIncomeCompleteAction implements Action {
  readonly type = UPDATE_INCOME_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Income data updated!'
    });
  }
}

export class UpdateIncomeFailedAction implements Action {
  readonly type = UPDATE_INCOME_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class DeleteIncomeAction implements Action {
  readonly type = DELETE_INCOME_ACTION;
  constructor(public payload?: any) {
    toast({
      title: 'Deleting income...'
    });
    toast.showLoading();
  }
}

export class DeleteIncomeCompleteAction implements Action {
  readonly type = DELETE_INCOME_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'Income deleted!'
    });
  }
}

export class DeleteIncomeFailedAction implements Action {
  readonly type = DELETE_INCOME_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export type Actions =
  FetchAllIncomesAction
  | FetchAllIncomesCompleteAction
  | FetchAllIncomesFailedAction
  | FetchIncomeAction
  | FetchIncomeCompleteAction
  | FetchIncomeFailedAction
  | CreateIncomeAction
  | CreateIncomeCompleteAction
  | CreateIncomeFailedAction
  | UpdateIncomeAction
  | UpdateIncomeCompleteAction
  | UpdateIncomeFailedAction
  | DeleteIncomeAction
  | DeleteIncomeCompleteAction
  | DeleteIncomeFailedAction;