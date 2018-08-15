import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

export const FETCH_ALL_INVENTORIES_ACTION = '[Inventory] Fetch All Inventories Action';
export const FETCH_ALL_INVENTORIES_COMPLETE_ACTION = '[Inventory] Fetch All Inventories Complete Action';
export const FETCH_ALL_INVENTORIES_FAILED_ACTION = '[Inventory] Fetch All Inventories Failed Action';

export const FETCH_INVENTORY_ACTION = '[Inventory] Fetch Inventory Action';
export const FETCH_INVENTORY_COMPLETE_ACTION = '[Inventory] Fetch Inventory Complete Action';
export const FETCH_INVENTORY_FAILED_ACTION = '[Inventory] Fetch Inventory Failed Action';

export const FILTER_INVENTORY_ACTION = '[Inventory] Filter Inventory Action';
export const FILTER_INVENTORY_COMPLETE_ACTION = '[Inventory] Filter Inventory Complete Action';
export const FILTER_INVENTORY_FAILED_ACTION = '[Inventory] Filter Inventory Failed Action';

export const CREATE_INVENTORY_ACTION = '[Inventory] Create Inventory Action';
export const CREATE_INVENTORY_COMPLETE_ACTION = '[Inventory] Create Inventory Complete Action';
export const CREATE_INVENTORY_FAILED_ACTION = '[Inventory] Create Inventory Failed Action';

export const UPDATE_INVENTORY_ACTION = '[Inventory] Update Inventory Action';
export const UPDATE_INVENTORY_COMPLETE_ACTION = '[Inventory] Update Inventory Complete Action';
export const UPDATE_INVENTORY_FAILED_ACTION = '[Inventory] Update Inventory Failed Action';

export const DELETE_INVENTORY_ACTION = '[Inventory] Delete Inventory Action';
export const DELETE_INVENTORY_COMPLETE_ACTION = '[Inventory] Delete Inventory Complete Action';
export const DELETE_INVENTORY_FAILED_ACTION = '[Inventory] Delete Inventory Failed Action';

export const TRANSFER_INVENTORY_ACTION = '[Inventory] Transfer Inventory Action';
export const TRANSFER_INVENTORY_COMPLETE_ACTION = '[Inventory] Transfer Inventory Complete Action';
export const TRANSFER_INVENTORY_FAILED_ACTION = '[Inventory] Transfer Inventory Failed Action';

export class FetchAllInventoriesAction implements Action {
  readonly type = FETCH_ALL_INVENTORIES_ACTION;
  constructor(public payload?: any) {
    swal({
      title: 'Fetching inventory...'
    });
    swal.showLoading();
  }
}

export class FetchAllInventoriesCompleteAction implements Action {
  readonly type = FETCH_ALL_INVENTORIES_COMPLETE_ACTION;
  constructor(public payload: any) {
    swal.close();
  }
}

export class FetchAllInventoriesFailedAction implements Action {
  readonly type = FETCH_ALL_INVENTORIES_FAILED_ACTION;
  constructor(public payload?: any) { }
}

export class FetchInventoryAction implements Action {
  readonly type = FETCH_INVENTORY_ACTION;
  constructor(public payload: any) { }
}

export class FetchInventoryCompleteAction implements Action {
  readonly type = FETCH_INVENTORY_COMPLETE_ACTION;
  constructor(public payload?: any) { }
}

export class FetchInventoryFailedAction implements Action {
  readonly type = FETCH_INVENTORY_FAILED_ACTION;
  constructor(public payload?: any) { }
}

export class FilterInventoryAction implements Action {
  readonly type = FILTER_INVENTORY_ACTION;
  constructor(public payload: any) { }
}

export class FilterInventoryCompleteAction implements Action {
  readonly type = FILTER_INVENTORY_COMPLETE_ACTION;
  constructor(public payload?: any) { }
}

export class FilterInventoryFailedAction implements Action {
  readonly type = FILTER_INVENTORY_FAILED_ACTION;
  constructor(public payload?: any) { }
}

export class CreateInventoryAction implements Action {
  readonly type = CREATE_INVENTORY_ACTION;
  constructor(public payload:any) { }
}

export class CreateInventoryCompleteAction implements Action {
  readonly type = CREATE_INVENTORY_COMPLETE_ACTION;
  constructor(public payload:any) {
    swal({
      title: "Inventory Created!",
      type: "success",
      timer: 3000,
      showConfirmButton: false
    });
  }
}

export class CreateInventoryFailedAction implements Action {
  readonly type = CREATE_INVENTORY_FAILED_ACTION;
  constructor(public payload:any) {
    swal("There was an error.", payload, "error");
  }
}

export class UpdateInventoryAction implements Action {
  readonly type = UPDATE_INVENTORY_ACTION;
  constructor(public payload: any) { }
}

export class UpdateInventoryCompleteAction implements Action {
  readonly type = UPDATE_INVENTORY_COMPLETE_ACTION;
  constructor(public payload?: any) { }
}

export class UpdateInventoryFailedAction implements Action {
  readonly type = UPDATE_INVENTORY_FAILED_ACTION;
  constructor(public payload?: any) { }
}

export class DeleteInventoryAction implements Action {
  readonly type = DELETE_INVENTORY_ACTION;
  constructor(public payload: any) { }
}

export class DeleteInventoryCompleteAction implements Action {
  readonly type = DELETE_INVENTORY_COMPLETE_ACTION;
  constructor(public payload?: any) { }
}

export class DeleteInventoryFailedAction implements Action {
  readonly type = DELETE_INVENTORY_FAILED_ACTION;
  constructor(public payload?: any) { }
}

export class TransferInventoryAction implements Action {
  readonly type = TRANSFER_INVENTORY_ACTION;
  constructor(public payload:any) { }
}

export class TransferInventoryCompleteAction implements Action {
  readonly type = TRANSFER_INVENTORY_COMPLETE_ACTION;
  constructor(public payload:any) {
    swal({
      title: "Inventories are transferred!",
      type: "success",
      timer: 3000,
      showConfirmButton: false
    });
  }
}

export class TransferInventoryFailedAction implements Action {
  readonly type = TRANSFER_INVENTORY_FAILED_ACTION;
  constructor(public payload:any) {
    swal("There was an error transferring the device.", payload, "error");
  }
}

export type Actions =
  FetchAllInventoriesAction
  | FetchAllInventoriesCompleteAction
  | FetchAllInventoriesFailedAction
  | FetchInventoryAction
  | FetchInventoryCompleteAction
  | FetchInventoryFailedAction
  | FilterInventoryAction
  | FilterInventoryCompleteAction
  | FilterInventoryFailedAction
  | CreateInventoryAction
  | CreateInventoryCompleteAction
  | CreateInventoryFailedAction
  | UpdateInventoryAction
  | UpdateInventoryCompleteAction
  | UpdateInventoryFailedAction
  | DeleteInventoryAction
  | DeleteInventoryCompleteAction
  | DeleteInventoryFailedAction
  | TransferInventoryAction
  | TransferInventoryCompleteAction
  | TransferInventoryFailedAction;