import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

const toast = (swal as any).mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000
});

export const FETCH_ALL_REQUISITION_ORDERS_ACTION = '[RequisitionOrder] Fetch All Requisition Orders Action';
export const FETCH_ALL_REQUISITION_ORDERS_COMPLETE_ACTION = '[RequisitionOrder] Fetch All Requisition Orders Complete Action';
export const FETCH_ALL_REQUISITION_ORDERS_FAILED_ACTION = '[RequisitionOrder] Fetch All Requisition Orders Failed Action';

export const FETCH_REQUISITION_ORDER_ACTION = '[RequisitionOrder] Fetch Requisition Order Action';
export const FETCH_REQUISITION_ORDER_COMPLETE_ACTION = '[RequisitionOrder] Fetch Requisition Order Complete Action';
export const FETCH_REQUISITION_ORDER_FAILED_ACTION = '[RequisitionOrder] Fetch Requisition Order Failed Action';

export const FETCH_REQUISITION_ORDER_FORM_DATA_ACTION = '[RequisitionOrder] Fetch Requisition Order Form Data Action';
export const FETCH_REQUISITION_ORDER_FORM_DATA_COMPLETE_ACTION = '[RequisitionOrder] Fetch Requisition Order Form Data Complete Action';
export const FETCH_REQUISITION_ORDER_FORM_DATA_FAILED_ACTION = '[RequisitionOrder] Fetch Requisition Order Form Data Failed Action';

export const CREATE_REQUISITION_ORDER_ACTION = '[RequisitionOrder] Create Requisition Order Action';
export const CREATE_REQUISITION_ORDER_COMPLETE_ACTION = '[RequisitionOrder] Create Requisition Order Complete Action';
export const CREATE_REQUISITION_ORDER_FAILED_ACTION = '[RequisitionOrder] Create Requisition Order Failed Action';

export const UPDATE_REQUISITION_ORDER_ACTION = '[RequisitionOrder] Update Requisition Order Action';
export const UPDATE_REQUISITION_ORDER_COMPLETE_ACTION = '[RequisitionOrder] Update Requisition Order Complete Action';
export const UPDATE_REQUISITION_ORDER_FAILED_ACTION = '[RequisitionOrder] Update Requisition Order Failed Action';

export const DELETE_REQUISITION_ORDER_ACTION = '[RequisitionOrder] Delete Requisition Order Action';
export const DELETE_REQUISITION_ORDER_COMPLETE_ACTION = '[RequisitionOrder] Delete Requisition Order Complete Action';
export const DELETE_REQUISITION_ORDER_FAILED_ACTION = '[RequisitionOrder] Delete Requisition Order Failed Action';

export const CONFIRM_REQUISITION_ORDER_ACTION = '[RequisitionOrder] Confirm Requisition Order Action';
export const CONFIRM_REQUISITION_ORDER_COMPLETE_ACTION = '[RequisitionOrder] Confirm Requisition Order Complete Action';
export const CONFIRM_REQUISITION_ORDER_FAILED_ACTION = '[RequisitionOrder] Confirm Requisition Order Failed Action';

export class FetchAllRequisitionOrdersAction implements Action {
  readonly type = FETCH_ALL_REQUISITION_ORDERS_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Loading requisition orders...'
    });
    toast.showLoading();
  }
}

export class FetchAllRequisitionOrdersCompleteAction implements Action {
  readonly type = FETCH_ALL_REQUISITION_ORDERS_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Requisition orders fetched!'
    });
  }
}

export class FetchAllRequisitionOrdersFailedAction implements Action {
  readonly type = FETCH_ALL_REQUISITION_ORDERS_FAILED_ACTION;
  constructor(public payload: any) { }
}

export class FetchRequisitionOrderAction implements Action {
  readonly type = FETCH_REQUISITION_ORDER_ACTION;
  constructor(public payload: any) { }
}

export class FetchRequisitionOrderCompleteAction implements Action {
  readonly type = FETCH_REQUISITION_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) { }
}

export class FetchRequisitionOrderFailedAction implements Action {
  readonly type = FETCH_REQUISITION_ORDER_FAILED_ACTION;
  constructor(public payload: any) { }
}

export class FetchRequisitionOrderFormDataAction implements Action {
  readonly type = FETCH_REQUISITION_ORDER_FORM_DATA_ACTION;
  constructor(public payload?: any) {
    toast({
      title: 'Loading form data...'
    });
    toast.showLoading();
  }
}

export class FetchRequisitionOrderFormDataCompleteAction implements Action {
  readonly type = FETCH_REQUISITION_ORDER_FORM_DATA_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Form data loaded!'
    });
  }
}

export class FetchRequisitionOrderFormDataFailedAction implements Action {
  readonly type = FETCH_REQUISITION_ORDER_FORM_DATA_FAILED_ACTION;
  constructor(public payload: any) { }
}

export class CreateRequisitionOrderAction implements Action {
  readonly type = CREATE_REQUISITION_ORDER_ACTION;
  constructor(public payload: any) { }
}

export class CreateRequisitionOrderCompleteAction implements Action {
  readonly type = CREATE_REQUISITION_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Requisition order added!'
    });
  }
}

export class CreateRequisitionOrderFailedAction implements Action {
  readonly type = CREATE_REQUISITION_ORDER_FAILED_ACTION;
  constructor(public payload: any) {
    swal("There was an error.", payload, "error");
  }
}

export class UpdateRequisitionOrderAction implements Action {
  readonly type = UPDATE_REQUISITION_ORDER_ACTION;
  constructor(public payload: any) { }
}

export class UpdateRequisitionOrderCompleteAction implements Action {
  readonly type = UPDATE_REQUISITION_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Requisition order updated!'
    });
  }
}

export class UpdateRequisitionOrderFailedAction implements Action {
  readonly type = UPDATE_REQUISITION_ORDER_FAILED_ACTION;
  constructor(public payload?: any) {
    swal("There was an error.", payload, "error");
  }
}

export class DeleteRequisitionOrderAction implements Action {
  readonly type = DELETE_REQUISITION_ORDER_ACTION;
}

export class DeleteRequisitionOrderCompleteAction implements Action {
  readonly type = DELETE_REQUISITION_ORDER_COMPLETE_ACTION;
  constructor() {
    toast({
      type: 'success',
      title: 'Requisition order deleted!'
    });
  }
}

export class DeleteRequisitionOrderFailedAction implements Action {
  readonly type = DELETE_REQUISITION_ORDER_FAILED_ACTION;
  constructor(public payload: any) {
    swal("There was an error.", payload, "error");
  }
}

export class ConfirmRequisitionOrderAction implements Action {
  readonly type = CONFIRM_REQUISITION_ORDER_ACTION;
}

export class ConfirmRequisitionOrderCompleteAction implements Action {
  readonly type = CONFIRM_REQUISITION_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Requisition order confirmed!'
    });
  }
}

export class ConfirmRequisitionOrderFailedAction implements Action {
  readonly type = CONFIRM_REQUISITION_ORDER_FAILED_ACTION;
  constructor(public payload: any) {
    swal("There was an error.", payload, "error");
  }
}

export type Actions =
  FetchAllRequisitionOrdersAction
  | FetchAllRequisitionOrdersCompleteAction
  | FetchAllRequisitionOrdersFailedAction
  | FetchRequisitionOrderAction
  | FetchRequisitionOrderCompleteAction
  | FetchRequisitionOrderFailedAction
  | FetchRequisitionOrderFormDataAction
  | FetchRequisitionOrderFormDataCompleteAction
  | FetchRequisitionOrderFormDataFailedAction
  | CreateRequisitionOrderAction
  | CreateRequisitionOrderCompleteAction
  | CreateRequisitionOrderFailedAction
  | UpdateRequisitionOrderAction
  | UpdateRequisitionOrderCompleteAction
  | UpdateRequisitionOrderFailedAction
  | DeleteRequisitionOrderAction
  | DeleteRequisitionOrderCompleteAction
  | DeleteRequisitionOrderFailedAction
  | ConfirmRequisitionOrderAction
  | ConfirmRequisitionOrderCompleteAction
  | ConfirmRequisitionOrderFailedAction;