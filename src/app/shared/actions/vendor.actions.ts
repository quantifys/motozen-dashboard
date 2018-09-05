import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

const toast = (swal as any).mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000
});

export const FETCH_ALL_VENDORS_ACTION = '[Vendor] Fetch All Vendors Action';
export const FETCH_ALL_VENDORS_COMPLETE_ACTION = '[Vendor] Fetch All Vendors Complete Action';
export const FETCH_ALL_VENDORS_FAILED_ACTION = '[Vendor] Fetch All Vendors Failed Action';

export const FETCH_VENDOR_ACTION = '[Vendor] Fetch Vendor Action';
export const FETCH_VENDOR_COMPLETE_ACTION = '[Vendor] Fetch Vendor Complete Action';
export const FETCH_VENDOR_FAILED_ACTION = '[Vendor] Fetch Vendor Failed Action';

export const CREATE_VENDOR_ACTION = '[Vendor] Create Vendor Action';
export const CREATE_VENDOR_COMPLETE_ACTION = '[Vendor] Create Vendor Complete Action';
export const CREATE_VENDOR_FAILED_ACTION = '[Vendor] Create Vendor Failed Action';

export const UPDATE_VENDOR_ACTION = '[Vendor] Update Vendor Action';
export const UPDATE_VENDOR_COMPLETE_ACTION = '[Vendor] Update Vendor Complete Action';
export const UPDATE_VENDOR_FAILED_ACTION = '[Vendor] Update Vendor Failed Action';

export const DELETE_VENDOR_ACTION = '[Vendor] Delete Vendor Action';
export const DELETE_VENDOR_COMPLETE_ACTION = '[Vendor] Delete Vendor Complete Action';
export const DELETE_VENDOR_FAILED_ACTION = '[Vendor] Delete Vendor Failed Action';

export const ACTIVATE_VENDOR_ACTION = '[Vendor] Activate Vendor Action';
export const ACTIVATE_VENDOR_COMPLETE_ACTION = '[Vendor] Activate Vendor Complete Action';
export const ACTIVATE_VENDOR_FAILED_ACTION = '[Vendor] Activate Vendor Failed Action';

export const DISABLE_VENDOR_ACTION = '[Vendor] Disable Vendor Action';
export const DISABLE_VENDOR_COMPLETE_ACTION = '[Vendor] Disable Vendor Complete Action';
export const DISABLE_VENDOR_FAILED_ACTION = '[Vendor] Disable Vendor Failed Action';

export class FetchAllVendorsAction implements Action {
  readonly type = FETCH_ALL_VENDORS_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Loading vendors...'
    });
    toast.showLoading();
  }
}

export class FetchAllVendorsCompleteAction implements Action {
  readonly type = FETCH_ALL_VENDORS_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Vendors fetched!'
    });
  }
}

export class FetchAllVendorsFailedAction implements Action {
  readonly type = FETCH_ALL_VENDORS_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchVendorAction implements Action {
  readonly type = FETCH_VENDOR_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Loading vendors...'
    });
    toast.showLoading();
  }
}

export class FetchVendorCompleteAction implements Action {
  readonly type = FETCH_VENDOR_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Vendor loaded!'
    });
  }
}

export class FetchVendorFailedAction implements Action {
  readonly type = FETCH_VENDOR_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class CreateVendorAction implements Action {
  readonly type = CREATE_VENDOR_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Adding vendor...'
    });
    toast.showLoading();
  }
}

export class CreateVendorCompleteAction implements Action {
  readonly type = CREATE_VENDOR_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Vendor added!'
    });
  }
}

export class CreateVendorFailedAction implements Action {
  readonly type = CREATE_VENDOR_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class UpdateVendorAction implements Action {
  readonly type = UPDATE_VENDOR_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Updating vendor...'
    });
    toast.showLoading();
  }
}

export class UpdateVendorCompleteAction implements Action {
  readonly type = UPDATE_VENDOR_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Vendor updated!'
    });
  }
}

export class UpdateVendorFailedAction implements Action {
  readonly type = UPDATE_VENDOR_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class DeleteVendorAction implements Action {
  readonly type = DELETE_VENDOR_ACTION;
  constructor() {
    toast({
      title: 'Deleting vendor...'
    });
    toast.showLoading();
  }
}

export class DeleteVendorCompleteAction implements Action {
  readonly type = DELETE_VENDOR_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Vendor deleted!'
    });
  }
}

export class DeleteVendorFailedAction implements Action {
  readonly type = DELETE_VENDOR_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class ActivateVendorAction implements Action {
  readonly type = ACTIVATE_VENDOR_ACTION;
  constructor(public payload?: any) {
    toast({
      title: 'Activating vendor...'
    });
    toast.showLoading();
  }
}

export class ActivateVendorCompleteAction implements Action {
  readonly type = ACTIVATE_VENDOR_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Vendor activated!'
    });
  }
}

export class ActivateVendorFailedAction implements Action {
  readonly type = ACTIVATE_VENDOR_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class DisableVendorAction implements Action {
  readonly type = DISABLE_VENDOR_ACTION;
  constructor(public payload?: any) {
    toast({
      title: 'Disabling vendor...'
    });
    toast.showLoading();
  }
}

export class DisableVendorCompleteAction implements Action {
  readonly type = DISABLE_VENDOR_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Vendor disabled!'
    });
  }
}

export class DisableVendorFailedAction implements Action {
  readonly type = DISABLE_VENDOR_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export type Actions =
  FetchAllVendorsAction
  | FetchAllVendorsCompleteAction
  | FetchAllVendorsFailedAction
  | FetchVendorAction
  | FetchVendorCompleteAction
  | FetchVendorFailedAction
  | CreateVendorAction
  | CreateVendorCompleteAction
  | CreateVendorFailedAction
  | UpdateVendorAction
  | UpdateVendorCompleteAction
  | UpdateVendorFailedAction
  | DeleteVendorAction
  | DeleteVendorCompleteAction
  | DeleteVendorFailedAction
  | ActivateVendorAction
  | ActivateVendorCompleteAction
  | ActivateVendorFailedAction
  | DisableVendorAction
  | DisableVendorCompleteAction
  | DisableVendorFailedAction;