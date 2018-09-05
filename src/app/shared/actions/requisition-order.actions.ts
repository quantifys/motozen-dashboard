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

export const OPEN_REQUISITION_ORDER_ACTION = '[RequisitionOrder] Open Requisition Order Action';
export const OPEN_REQUISITION_ORDER_COMPLETE_ACTION = '[RequisitionOrder] Open Requisition Order Complete Action';
export const OPEN_REQUISITION_ORDER_FAILED_ACTION = '[RequisitionOrder] Open Requisition Order Failed Action';

export const CLOSE_REQUISITION_ORDER_ACTION = '[RequisitionOrder] Close Requisition Order Action';
export const CLOSE_REQUISITION_ORDER_COMPLETE_ACTION = '[RequisitionOrder] Close Requisition Order Complete Action';
export const CLOSE_REQUISITION_ORDER_FAILED_ACTION = '[RequisitionOrder] Close Requisition Order Failed Action';

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
  constructor(public payload: any) {
		toast({
			type: 'error',
			title: payload
		});
  }
}

export class FetchRequisitionOrderAction implements Action {
  readonly type = FETCH_REQUISITION_ORDER_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Loading requisition order...'
    });
    toast.showLoading();
  }
}

export class FetchRequisitionOrderCompleteAction implements Action {
  readonly type = FETCH_REQUISITION_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Requisition order loaded!'
    });
  }
}

export class FetchRequisitionOrderFailedAction implements Action {
  readonly type = FETCH_REQUISITION_ORDER_FAILED_ACTION;
  constructor(public payload: any) {
		toast({
			type: 'error',
			title: payload
		});
  }
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
  constructor(public payload: any) {
		toast({
			type: 'error',
			title: payload
		});
  }
}

export class CreateRequisitionOrderAction implements Action {
  readonly type = CREATE_REQUISITION_ORDER_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Raising requisition order...'
    });
    toast.showLoading();
  }
}

export class CreateRequisitionOrderCompleteAction implements Action {
  readonly type = CREATE_REQUISITION_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Requisition order raised!'
    });
  }
}

export class CreateRequisitionOrderFailedAction implements Action {
  readonly type = CREATE_REQUISITION_ORDER_FAILED_ACTION;
  constructor(public payload: any) {
		toast({
			type: 'error',
			title: payload
		});
  }
}

export class UpdateRequisitionOrderAction implements Action {
  readonly type = UPDATE_REQUISITION_ORDER_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Updating requisition order...'
    });
    toast.showLoading();
  }
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
		toast({
			type: 'error',
			title: payload
		});
  }
}

export class DeleteRequisitionOrderAction implements Action {
  readonly type = DELETE_REQUISITION_ORDER_ACTION;
  constructor() {
    toast({
      title: 'Deleting requisition order...'
    });
    toast.showLoading();
  }
}

export class DeleteRequisitionOrderCompleteAction implements Action {
  readonly type = DELETE_REQUISITION_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Requisition order deleted!'
    });
  }
}

export class DeleteRequisitionOrderFailedAction implements Action {
  readonly type = DELETE_REQUISITION_ORDER_FAILED_ACTION;
  constructor(public payload: any) {
		toast({
			type: 'error',
			title: payload
		});
  }
}

export class OpenRequisitionOrderAction implements Action {
  readonly type = OPEN_REQUISITION_ORDER_ACTION;
  constructor() {
    toast({
      title: 'Marking requisition order open...'
    });
    toast.showLoading();
  }
}

export class OpenRequisitionOrderCompleteAction implements Action {
  readonly type = OPEN_REQUISITION_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Requisition order opened!'
    });
  }
}

export class OpenRequisitionOrderFailedAction implements Action {
  readonly type = OPEN_REQUISITION_ORDER_FAILED_ACTION;
  constructor(public payload: any) {
		toast({
			type: 'error',
			title: payload
		});
  }
}

export class CloseRequisitionOrderAction implements Action {
  readonly type = CLOSE_REQUISITION_ORDER_ACTION;
  constructor() {
    toast({
      title: 'Marking requisition order closed...'
    });
    toast.showLoading();
  }
}

export class CloseRequisitionOrderCompleteAction implements Action {
  readonly type = CLOSE_REQUISITION_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Requisition order closed!'
    });
  }
}

export class CloseRequisitionOrderFailedAction implements Action {
  readonly type = CLOSE_REQUISITION_ORDER_FAILED_ACTION;
  constructor(public payload: any) {
		toast({
			type: 'error',
			title: payload
		});
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
  | OpenRequisitionOrderAction
  | OpenRequisitionOrderCompleteAction
  | OpenRequisitionOrderFailedAction
  | CloseRequisitionOrderAction
  | CloseRequisitionOrderCompleteAction
  | CloseRequisitionOrderFailedAction;