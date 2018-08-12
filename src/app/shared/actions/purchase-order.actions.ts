import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

export const FETCH_ALL_PURCHASE_ORDERS_ACTION = '[PurchaseOrder] Fetch All PurchaseOrders Action';
export const FETCH_ALL_PURCHASE_ORDERS_COMPLETE_ACTION = '[PurchaseOrder] Fetch All PurchaseOrders Complete Action';
export const FETCH_ALL_PURCHASE_ORDERS_FAILED_ACTION = '[PurchaseOrder] Fetch All PurchaseOrders Failed Action';

export const FETCH_PURCHASE_ORDER_ACTION = '[PurchaseOrder] Fetch Purchase Order Action';
export const FETCH_PURCHASE_ORDER_COMPLETE_ACTION = '[PurchaseOrder] Fetch Purchase Order Complete Action';
export const FETCH_PURCHASE_ORDER_FAILED_ACTION = '[PurchaseOrder] Fetch Purchase Order Failed Action';

export const CREATE_PURCHASE_ORDER_ACTION = '[PurchaseOrder] Create Purchase Order Action';
export const CREATE_PURCHASE_ORDER_COMPLETE_ACTION = '[PurchaseOrder] Create Purchase Order Complete Action';
export const CREATE_PURCHASE_ORDER_FAILED_ACTION = '[PurchaseOrder] Create Purchase Order Failed Action';

export const UPDATE_PURCHASE_ORDER_ACTION = '[PurchaseOrder] Update Purchase Order Action';
export const UPDATE_PURCHASE_ORDER_COMPLETE_ACTION = '[PurchaseOrder] Update Purchase Order Complete Action';
export const UPDATE_PURCHASE_ORDER_FAILED_ACTION = '[PurchaseOrder] Update Purchase Order Failed Action';

export const DELETE_PURCHASE_ORDER_ACTION = '[PurchaseOrder] Delete Purchase Order Action';
export const DELETE_PURCHASE_ORDER_COMPLETE_ACTION = '[PurchaseOrder] Delete Purchase Order Complete Action';
export const DELETE_PURCHASE_ORDER_FAILED_ACTION = '[PurchaseOrder] Delete Purchase Order Failed Action';

export const OPEN_PURCHASE_ORDER_ACTION = '[PurchaseOrder] Open Purchase Order Action';
export const OPEN_PURCHASE_ORDER_COMPLETE_ACTION = '[PurchaseOrder] Open Purchase Order Complete Action';
export const OPEN_PURCHASE_ORDER_FAILED_ACTION = '[PurchaseOrder] Open Purchase Order Failed Action';

export const CONFIRM_PURCHASE_ORDER_ACTION = '[PurchaseOrder] Confirm Purchase Order Action';
export const CONFIRM_PURCHASE_ORDER_COMPLETE_ACTION = '[PurchaseOrder] Confirm Purchase Order Complete Action';
export const CONFIRM_PURCHASE_ORDER_FAILED_ACTION = '[PurchaseOrder] Confirm Purchase Order Failed Action';

export const DISPATCH_PURCHASE_ORDER_ACTION = '[PurchaseOrder] Dispatch Purchase Order Action';
export const DISPATCH_PURCHASE_ORDER_COMPLETE_ACTION = '[PurchaseOrder] Dispatch Purchase Order Complete Action';
export const DISPATCH_PURCHASE_ORDER_FAILED_ACTION = '[PurchaseOrder] Dispatch Purchase Order Failed Action';

export const FETCH_PURCHASE_ORDER_FORMDATA_ACTION = '[PurchaseOrder] Fetch Purchase Order Form Data Action';
export const FETCH_PURCHASE_ORDER_FORMDATA_COMPLETE_ACTION = '[PurchaseOrder] Fetch Purchase Order Form Data Complete Action';
export const FETCH_PURCHASE_ORDER_FORMDATA_FAILED_ACTION = '[PurchaseOrder] Fetch Purchase Order Form Data Failed Action';

export class FetchAllPurchaseOrdersAction implements Action {
  readonly type = FETCH_ALL_PURCHASE_ORDERS_ACTION;
  constructor(public payload: any) { }
}

export class FetchAllPurchaseOrdersCompleteAction implements Action {
  readonly type = FETCH_ALL_PURCHASE_ORDERS_COMPLETE_ACTION;
  constructor(public payload: any) {
  }
}

export class FetchAllPurchaseOrdersFailedAction implements Action {
  readonly type = FETCH_ALL_PURCHASE_ORDERS_FAILED_ACTION;
  constructor(public payload?: any) { }
}

export class FetchPurchaseOrderAction implements Action {
  readonly type = FETCH_PURCHASE_ORDER_ACTION;
  constructor(public payload: any) { }
}

export class FetchPurchaseOrderCompleteAction implements Action {
  readonly type = FETCH_PURCHASE_ORDER_COMPLETE_ACTION;
  constructor(public payload?: any) { }
}

export class FetchPurchaseOrderFailedAction implements Action {
  readonly type = FETCH_PURCHASE_ORDER_FAILED_ACTION;
  constructor(public payload?: any) { }
}

export class CreatePurchaseOrderAction implements Action {
  readonly type = CREATE_PURCHASE_ORDER_ACTION;
  constructor(public payload: any) { }
}

export class CreatePurchaseOrderCompleteAction implements Action {
  readonly type = CREATE_PURCHASE_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    swal({
      title: "PurchaseOrder Created!",
      type: "success",
      timer: 3000,
      showConfirmButton: false
    });
  }
}

export class CreatePurchaseOrderFailedAction implements Action {
  readonly type = CREATE_PURCHASE_ORDER_FAILED_ACTION;
  constructor(public payload: any) {
    swal("There was an error.", payload, "error");
  }
}

export class UpdatePurchaseOrderAction implements Action {
  readonly type = UPDATE_PURCHASE_ORDER_ACTION;
  constructor(public payload: any) { }
}

export class UpdatePurchaseOrderCompleteAction implements Action {
  readonly type = UPDATE_PURCHASE_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    swal({
      title: "PurchaseOrder Updated!",
      type: "success",
      timer: 3000,
      showConfirmButton: false
    });
  }
}

export class UpdatePurchaseOrderFailedAction implements Action {
  readonly type = UPDATE_PURCHASE_ORDER_FAILED_ACTION;
  constructor(public payload?: any) {
    swal("There was an error.", payload, "error");
  }
}

export class DeletePurchaseOrderAction implements Action {
  readonly type = DELETE_PURCHASE_ORDER_ACTION;
  constructor(public payload: any) {
  }
}

export class DeletePurchaseOrderCompleteAction implements Action {
  readonly type = DELETE_PURCHASE_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    swal({
      title: "PurchaseOrder Updated!",
      type: "success",
      timer: 3000,
      showConfirmButton: false
    });
  }
}

export class DeletePurchaseOrderFailedAction implements Action {
  readonly type = DELETE_PURCHASE_ORDER_FAILED_ACTION;
  constructor(public payload: any) {
    swal("There was an error.", payload, "error");
  }
}

export class OpenPurchaseOrderAction implements Action {
  readonly type = OPEN_PURCHASE_ORDER_ACTION;
}

export class OpenPurchaseOrderCompleteAction implements Action {
  readonly type = OPEN_PURCHASE_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    swal({
      title: "Purchase Order Opened!",
      type: "success",
      timer: 3000,
      showConfirmButton: false
    });
  }
}

export class OpenPurchaseOrderFailedAction implements Action {
  readonly type = OPEN_PURCHASE_ORDER_FAILED_ACTION;
  constructor(public payload: any) {
    swal("There was an error.", payload, "error");
  }
}

export class ConfirmPurchaseOrderAction implements Action {
  readonly type = CONFIRM_PURCHASE_ORDER_ACTION;
  constructor(public payload: any) { }
}

export class ConfirmPurchaseOrderCompleteAction implements Action {
  readonly type = CONFIRM_PURCHASE_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    swal({
      title: "Purchase Order Confirmed!",
      type: "success",
      timer: 3000,
      showConfirmButton: false
    });
  }
}

export class ConfirmPurchaseOrderFailedAction implements Action {
  readonly type = CONFIRM_PURCHASE_ORDER_FAILED_ACTION;
  constructor(public payload: any) {
    swal("There was an error.", payload, "error");
  }
}

export class DispatchPurchaseOrderAction implements Action {
  readonly type = DISPATCH_PURCHASE_ORDER_ACTION;
  constructor(public payload: any) { }
}

export class DispatchPurchaseOrderCompleteAction implements Action {
  readonly type = DISPATCH_PURCHASE_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    swal({
      title: "Purchase Order Dispatched!",
      type: "success",
      timer: 3000,
      showConfirmButton: false
    });
  }
}

export class DispatchPurchaseOrderFailedAction implements Action {
  readonly type = DISPATCH_PURCHASE_ORDER_FAILED_ACTION;
  constructor(public payload: any) {
    swal("There was an error.", payload, "error");
  }
}

export class FetchPurchaseOrderFormDataAction implements Action {
  readonly type = FETCH_PURCHASE_ORDER_FORMDATA_ACTION;
}

export class FetchPurchaseOrderFormDataCompleteAction implements Action {
  readonly type = FETCH_PURCHASE_ORDER_FORMDATA_COMPLETE_ACTION;
  constructor(public payload: any) {
  }
}

export class FetchPurchaseOrderFormDataFailedAction implements Action {
  readonly type = FETCH_PURCHASE_ORDER_FORMDATA_FAILED_ACTION;
  constructor(public payload?: any) { }
}

export type Actions =
  FetchAllPurchaseOrdersAction
  | FetchAllPurchaseOrdersCompleteAction
  | FetchAllPurchaseOrdersFailedAction
  | FetchPurchaseOrderAction
  | FetchPurchaseOrderCompleteAction
  | FetchPurchaseOrderFailedAction
  | CreatePurchaseOrderAction
  | CreatePurchaseOrderCompleteAction
  | CreatePurchaseOrderFailedAction
  | UpdatePurchaseOrderAction
  | UpdatePurchaseOrderCompleteAction
  | UpdatePurchaseOrderFailedAction
  | DeletePurchaseOrderAction
  | DeletePurchaseOrderCompleteAction
  | DeletePurchaseOrderFailedAction
  | OpenPurchaseOrderAction
  | OpenPurchaseOrderCompleteAction
  | OpenPurchaseOrderFailedAction
  | ConfirmPurchaseOrderAction
  | ConfirmPurchaseOrderCompleteAction
  | ConfirmPurchaseOrderFailedAction
  | DispatchPurchaseOrderAction
  | DispatchPurchaseOrderCompleteAction
  | DispatchPurchaseOrderFailedAction
  | FetchPurchaseOrderFormDataAction
  | FetchPurchaseOrderFormDataCompleteAction
  | FetchPurchaseOrderFormDataFailedAction;