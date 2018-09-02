import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

const toast = (swal as any).mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000
});

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

export const CLEAR_INVENTORY_DATA_ACTION = '[Inventory] Clear Inventory Data Action';

export class FetchAllInventoriesAction implements Action {
  readonly type = FETCH_ALL_INVENTORIES_ACTION;
  constructor() {
    toast({
      title: 'Fetching inventory...'
    });
    toast.showLoading();
  }
}

export class FetchAllInventoriesCompleteAction implements Action {
  readonly type = FETCH_ALL_INVENTORIES_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Inventory list loaded!'
    });
  }
}

export class FetchAllInventoriesFailedAction implements Action {
  readonly type = FETCH_ALL_INVENTORIES_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchInventoryAction implements Action {
  readonly type = FETCH_INVENTORY_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching inventory item...'
    });
    toast.showLoading();
  }
}

export class FetchInventoryCompleteAction implements Action {
  readonly type = FETCH_INVENTORY_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Inventory item loaded!'
    });
  }
}

export class FetchInventoryFailedAction implements Action {
  readonly type = FETCH_INVENTORY_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FilterInventoryAction implements Action {
  readonly type = FILTER_INVENTORY_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching inventory...'
    });
    toast.showLoading();
  }
}

export class FilterInventoryCompleteAction implements Action {
  readonly type = FILTER_INVENTORY_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Inventory list loaded!'
    });
  }
}

export class FilterInventoryFailedAction implements Action {
  readonly type = FILTER_INVENTORY_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class CreateInventoryAction implements Action {
  readonly type = CREATE_INVENTORY_ACTION;
  constructor(public payload:any) {
    toast({
      title: 'Adding inventory...'
    });
    toast.showLoading();
  }
}

export class CreateInventoryCompleteAction implements Action {
  readonly type = CREATE_INVENTORY_COMPLETE_ACTION;
  constructor(public payload:any) {
    toast({
      type: 'success',
      title: 'Inventory added!'
    });
  }
}

export class CreateInventoryFailedAction implements Action {
  readonly type = CREATE_INVENTORY_FAILED_ACTION;
  constructor(public payload:any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class UpdateInventoryAction implements Action {
  readonly type = UPDATE_INVENTORY_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Updating inventory...'
    });
    toast.showLoading();
  }
}

export class UpdateInventoryCompleteAction implements Action {
  readonly type = UPDATE_INVENTORY_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Inventory updated!'
    });
  }
}

export class UpdateInventoryFailedAction implements Action {
  readonly type = UPDATE_INVENTORY_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class DeleteInventoryAction implements Action {
  readonly type = DELETE_INVENTORY_ACTION;
  constructor() {
    toast({
      title: 'Deleting inventory...'
    });
    toast.showLoading();
  }
}

export class DeleteInventoryCompleteAction implements Action {
  readonly type = DELETE_INVENTORY_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Inventory deleted!'
    });
  }
}

export class DeleteInventoryFailedAction implements Action {
  readonly type = DELETE_INVENTORY_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class ClearInventoryDataAction implements Action {
  readonly type = CLEAR_INVENTORY_DATA_ACTION;
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
  | ClearInventoryDataAction;