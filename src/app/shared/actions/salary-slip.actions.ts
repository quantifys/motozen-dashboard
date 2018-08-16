import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

const toast = (swal as any).mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000
});

export const FETCH_ALL_SALARY_SLIPS_ACTION = '[SalarySlip] Fetch All Salary Slips Action';
export const FETCH_ALL_SALARY_SLIPS_COMPLETE_ACTION = '[SalarySlip] Fetch All Salary Slips Complete Action';
export const FETCH_ALL_SALARY_SLIPS_FAILED_ACTION = '[SalarySlip] Fetch All Salary Slips Failed Action';

export const FETCH_SALARY_SLIP_ACTION = '[SalarySlip] Fetch Salary Slip Action';
export const FETCH_SALARY_SLIP_COMPLETE_ACTION = '[SalarySlip] Fetch Salary Slip Complete Action';
export const FETCH_SALARY_SLIP_FAILED_ACTION = '[SalarySlip] Fetch Salary Slip Failed Action';

export const CREATE_SALARY_SLIP_ACTION = '[SalarySlip] Create Salary Slip Action';
export const CREATE_SALARY_SLIP_COMPLETE_ACTION = '[SalarySlip] Create Salary Slip Complete Action';
export const CREATE_SALARY_SLIP_FAILED_ACTION = '[SalarySlip] Create Salary Slip Failed Action';

export const UPDATE_SALARY_SLIP_ACTION = '[SalarySlip] Update Salary Slip Action';
export const UPDATE_SALARY_SLIP_COMPLETE_ACTION = '[SalarySlip] Update Salary Slip Complete Action';
export const UPDATE_SALARY_SLIP_FAILED_ACTION = '[SalarySlip] Update Salary Slip Failed Action';

export const DELETE_SALARY_SLIP_ACTION = '[SalarySlip] Delete Salary Slip Action';
export const DELETE_SALARY_SLIP_COMPLETE_ACTION = '[SalarySlip] Delete Salary Slip Complete Action';
export const DELETE_SALARY_SLIP_FAILED_ACTION = '[SalarySlip] Delete Salary Slip Failed Action';

export const CONFIRM_SALARY_SLIP_ACTION = '[SalarySlip] Confirm Salary Slip Action';
export const CONFIRM_SALARY_SLIP_COMPLETE_ACTION = '[SalarySlip] Confirm Salary Slip Complete Action';
export const CONFIRM_SALARY_SLIP_FAILED_ACTION = '[SalarySlip] Confirm Salary Slip Failed Action';

export const PAY_SALARY_SLIP_ACTION = '[SalarySlip] Pay Salary Slip Action';
export const PAY_SALARY_SLIP_COMPLETE_ACTION = '[SalarySlip] Pay Salary Slip Complete Action';
export const PAY_SALARY_SLIP_FAILED_ACTION = '[SalarySlip] Pay Salary Slip Failed Action';

export const FETCH_SALARY_SLIP_FORMDATA_ACTION = '[SalarySlip] Fetch Salary Slip Form Data Action';
export const FETCH_SALARY_SLIP_FORMDATA_COMPLETE_ACTION = '[SalarySlip] Fetch Salary Slip Form Data Complete Action';
export const FETCH_SALARY_SLIP_FORMDATA_FAILED_ACTION = '[SalarySlip] Fetch Salary Slip Form Data Failed Action';

export class FetchAllSalarySlipsAction implements Action {
  readonly type = FETCH_ALL_SALARY_SLIPS_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Loading salary slips...'
    });
    toast.showLoading();
  }
}

export class FetchAllSalarySlipsCompleteAction implements Action {
  readonly type = FETCH_ALL_SALARY_SLIPS_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Salary slips fetched!'
    });
  }
}

export class FetchAllSalarySlipsFailedAction implements Action {
  readonly type = FETCH_ALL_SALARY_SLIPS_FAILED_ACTION;
  constructor(public payload: any) { }
}

export class FetchSalarySlipAction implements Action {
  readonly type = FETCH_SALARY_SLIP_ACTION;
  constructor(public payload: any) { }
}

export class FetchSalarySlipCompleteAction implements Action {
  readonly type = FETCH_SALARY_SLIP_COMPLETE_ACTION;
  constructor(public payload: any) { }
}

export class FetchSalarySlipFailedAction implements Action {
  readonly type = FETCH_SALARY_SLIP_FAILED_ACTION;
  constructor(public payload: any) { }
}

export class CreateSalarySlipAction implements Action {
  readonly type = CREATE_SALARY_SLIP_ACTION;
  constructor(public payload: any) { }
}

export class CreateSalarySlipCompleteAction implements Action {
  readonly type = CREATE_SALARY_SLIP_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Salary slip added!'
    });
  }
}

export class CreateSalarySlipFailedAction implements Action {
  readonly type = CREATE_SALARY_SLIP_FAILED_ACTION;
  constructor(public payload: any) {
    swal("There was an error.", payload, "error");
  }
}

export class UpdateSalarySlipAction implements Action {
  readonly type = UPDATE_SALARY_SLIP_ACTION;
  constructor(public payload: any) { }
}

export class UpdateSalarySlipCompleteAction implements Action {
  readonly type = UPDATE_SALARY_SLIP_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Salary slip updated!'
    });
  }
}

export class UpdateSalarySlipFailedAction implements Action {
  readonly type = UPDATE_SALARY_SLIP_FAILED_ACTION;
  constructor(public payload?: any) {
    swal("There was an error.", payload, "error");
  }
}

export class DeleteSalarySlipAction implements Action {
  readonly type = DELETE_SALARY_SLIP_ACTION;
}

export class DeleteSalarySlipCompleteAction implements Action {
  readonly type = DELETE_SALARY_SLIP_COMPLETE_ACTION;
  constructor() {
    toast({
      type: 'success',
      title: 'Salary slip deleted!'
    });
  }
}

export class DeleteSalarySlipFailedAction implements Action {
  readonly type = DELETE_SALARY_SLIP_FAILED_ACTION;
  constructor(public payload: any) {
    swal("There was an error.", payload, "error");
  }
}

export class ConfirmSalarySlipAction implements Action {
  readonly type = CONFIRM_SALARY_SLIP_ACTION;
  constructor(public payload: any) { }
}

export class ConfirmSalarySlipCompleteAction implements Action {
  readonly type = CONFIRM_SALARY_SLIP_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Salary slip confirmed!'
    });
  }
}

export class ConfirmSalarySlipFailedAction implements Action {
  readonly type = CONFIRM_SALARY_SLIP_FAILED_ACTION;
  constructor(public payload: any) {
    swal("There was an error.", payload, "error");
  }
}

export class PaySalarySlipAction implements Action {
  readonly type = PAY_SALARY_SLIP_ACTION;
  constructor(public payload: any) { }
}

export class PaySalarySlipCompleteAction implements Action {
  readonly type = PAY_SALARY_SLIP_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Salary slip paid!'
    });
  }
}

export class PaySalarySlipFailedAction implements Action {
  readonly type = PAY_SALARY_SLIP_FAILED_ACTION;
  constructor(public payload: any) {
    swal("There was an error.", payload, "error");
  }
}

export class FetchSalarySlipFormDataAction implements Action {
  readonly type = FETCH_SALARY_SLIP_FORMDATA_ACTION;
}

export class FetchSalarySlipFormDataCompleteAction implements Action {
  readonly type = FETCH_SALARY_SLIP_FORMDATA_COMPLETE_ACTION;
  constructor(public payload: any) {
  }
}

export class FetchSalarySlipFormDataFailedAction implements Action {
  readonly type = FETCH_SALARY_SLIP_FORMDATA_FAILED_ACTION;
  constructor(public payload?: any) { }
}

export type Actions =
  FetchAllSalarySlipsAction
  | FetchAllSalarySlipsCompleteAction
  | FetchAllSalarySlipsFailedAction
  | FetchSalarySlipAction
  | FetchSalarySlipCompleteAction
  | FetchSalarySlipFailedAction
  | CreateSalarySlipAction
  | CreateSalarySlipCompleteAction
  | CreateSalarySlipFailedAction
  | UpdateSalarySlipAction
  | UpdateSalarySlipCompleteAction
  | UpdateSalarySlipFailedAction
  | DeleteSalarySlipAction
  | DeleteSalarySlipCompleteAction
  | DeleteSalarySlipFailedAction
  | ConfirmSalarySlipAction
  | ConfirmSalarySlipCompleteAction
  | ConfirmSalarySlipFailedAction
  | PaySalarySlipAction
  | PaySalarySlipCompleteAction
  | PaySalarySlipFailedAction
  | FetchSalarySlipFormDataAction
  | FetchSalarySlipFormDataCompleteAction
  | FetchSalarySlipFormDataFailedAction;