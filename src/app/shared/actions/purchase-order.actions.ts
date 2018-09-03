import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

const toast = (swal as any).mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000
});

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

export const CLOSE_PURCHASE_ORDER_ACTION = '[PurchaseOrder] Close Purchase Order Action';
export const CLOSE_PURCHASE_ORDER_COMPLETE_ACTION = '[PurchaseOrder] Close Purchase Order Complete Action';
export const CLOSE_PURCHASE_ORDER_FAILED_ACTION = '[PurchaseOrder] Close Purchase Order Failed Action';

export const FETCH_PURCHASE_ORDER_FORMDATA_ACTION = '[PurchaseOrder] Fetch Purchase Order Form Data Action';
export const FETCH_PURCHASE_ORDER_FORMDATA_COMPLETE_ACTION = '[PurchaseOrder] Fetch Purchase Order Form Data Complete Action';
export const FETCH_PURCHASE_ORDER_FORMDATA_FAILED_ACTION = '[PurchaseOrder] Fetch Purchase Order Form Data Failed Action';

export class FetchAllPurchaseOrdersAction implements Action {
  readonly type = FETCH_ALL_PURCHASE_ORDERS_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching purchase orders...'
    });
    toast.showLoading();
  }
}

export class FetchAllPurchaseOrdersCompleteAction implements Action {
  readonly type = FETCH_ALL_PURCHASE_ORDERS_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Purchase order list loaded!'
    });
  }
}

export class FetchAllPurchaseOrdersFailedAction implements Action {
  readonly type = FETCH_ALL_PURCHASE_ORDERS_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchPurchaseOrderAction implements Action {
  readonly type = FETCH_PURCHASE_ORDER_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching purchase order...'
    });
    toast.showLoading();
  }
}

export class FetchPurchaseOrderCompleteAction implements Action {
  readonly type = FETCH_PURCHASE_ORDER_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'Purchase order loaded!'
    });
  }
}

export class FetchPurchaseOrderFailedAction implements Action {
  readonly type = FETCH_PURCHASE_ORDER_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class CreatePurchaseOrderAction implements Action {
  readonly type = CREATE_PURCHASE_ORDER_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Raising purchase order...'
    });
    toast.showLoading();
  }
}

export class CreatePurchaseOrderCompleteAction implements Action {
  readonly type = CREATE_PURCHASE_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Purchase order raised!'
    });
  }
}

export class CreatePurchaseOrderFailedAction implements Action {
  readonly type = CREATE_PURCHASE_ORDER_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class UpdatePurchaseOrderAction implements Action {
  readonly type = UPDATE_PURCHASE_ORDER_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Updating purchase order...'
    });
    toast.showLoading();
  }
}

export class UpdatePurchaseOrderCompleteAction implements Action {
  readonly type = UPDATE_PURCHASE_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Purchase order updated!'
    });
  }
}

export class UpdatePurchaseOrderFailedAction implements Action {
  readonly type = UPDATE_PURCHASE_ORDER_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class DeletePurchaseOrderAction implements Action {
  readonly type = DELETE_PURCHASE_ORDER_ACTION;
  constructor() {
    toast({
      title: 'Deleting purchase order...'
    });
    toast.showLoading();
  }
}

export class DeletePurchaseOrderCompleteAction implements Action {
  readonly type = DELETE_PURCHASE_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Purchase order deleted!'
    });
  }
}

export class DeletePurchaseOrderFailedAction implements Action {
  readonly type = DELETE_PURCHASE_ORDER_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class OpenPurchaseOrderAction implements Action {
  readonly type = OPEN_PURCHASE_ORDER_ACTION;
  constructor() {
    toast({
      title: 'Opening purchase order...'
    });
    toast.showLoading();
  }
}

export class OpenPurchaseOrderCompleteAction implements Action {
  readonly type = OPEN_PURCHASE_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Purchase order marked open!'
    });
  }
}

export class OpenPurchaseOrderFailedAction implements Action {
  readonly type = OPEN_PURCHASE_ORDER_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class ConfirmPurchaseOrderAction implements Action {
  readonly type = CONFIRM_PURCHASE_ORDER_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Confirming purchase order...'
    });
    toast.showLoading();
  }
}

export class ConfirmPurchaseOrderCompleteAction implements Action {
  readonly type = CONFIRM_PURCHASE_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Purchase order confirmed!'
    });
  }
}

export class ConfirmPurchaseOrderFailedAction implements Action {
  readonly type = CONFIRM_PURCHASE_ORDER_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class DispatchPurchaseOrderAction implements Action {
  readonly type = DISPATCH_PURCHASE_ORDER_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Dispatching purchase order...'
    });
    toast.showLoading();
  }
}

export class DispatchPurchaseOrderCompleteAction implements Action {
  readonly type = DISPATCH_PURCHASE_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Purchase order dispatched!'
    });
  }
}

export class DispatchPurchaseOrderFailedAction implements Action {
  readonly type = DISPATCH_PURCHASE_ORDER_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class ClosePurchaseOrderAction implements Action {
  readonly type = CLOSE_PURCHASE_ORDER_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Closing purchase order...'
    });
    toast.showLoading();
  }
}

export class ClosePurchaseOrderCompleteAction implements Action {
  readonly type = CLOSE_PURCHASE_ORDER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Purchase order closed!'
    });
  }
}

export class ClosePurchaseOrderFailedAction implements Action {
  readonly type = CLOSE_PURCHASE_ORDER_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchPurchaseOrderFormDataAction implements Action {
  readonly type = FETCH_PURCHASE_ORDER_FORMDATA_ACTION;
  constructor() {
    toast({
      title: 'Fetching purchase order form data...'
    });
    toast.showLoading();
  }
}

export class FetchPurchaseOrderFormDataCompleteAction implements Action {
  readonly type = FETCH_PURCHASE_ORDER_FORMDATA_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Purchase order form data loaded!'
    });
  }
}

export class FetchPurchaseOrderFormDataFailedAction implements Action {
  readonly type = FETCH_PURCHASE_ORDER_FORMDATA_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
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
  | ClosePurchaseOrderAction
  | ClosePurchaseOrderCompleteAction
  | ClosePurchaseOrderFailedAction
  | FetchPurchaseOrderFormDataAction
  | FetchPurchaseOrderFormDataCompleteAction
  | FetchPurchaseOrderFormDataFailedAction;