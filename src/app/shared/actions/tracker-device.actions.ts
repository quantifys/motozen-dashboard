import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

const toast = (swal as any).mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000
});

export const FETCH_ALL_TRACKER_DEVICES_ACTION = '[TrackerDevice] Fetch All Tracker Devices Action';
export const FETCH_ALL_TRACKER_DEVICES_COMPLETE_ACTION = '[TrackerDevice] Fetch All Tracker Devices Complete Action';
export const FETCH_ALL_TRACKER_DEVICES_FAILED_ACTION = '[TrackerDevice] Fetch All Tracker Devices Failed Action';

export const FETCH_TRACKER_DEVICE_ACTION = '[TrackerDevice] Fetch Tracker Device Action';
export const FETCH_TRACKER_DEVICE_COMPLETE_ACTION = '[TrackerDevice] Fetch Tracker Device Complete Action';
export const FETCH_TRACKER_DEVICE_FAILED_ACTION = '[TrackerDevice] Fetch Tracker Device Failed Action';

export const CREATE_TRACKER_DEVICE_ACTION = '[TrackerDevice] Create Tracker Device Action';
export const CREATE_TRACKER_DEVICE_COMPLETE_ACTION = '[TrackerDevice] Create Tracker Device Complete Action';
export const CREATE_TRACKER_DEVICE_FAILED_ACTION = '[TrackerDevice] Create Tracker Device Failed Action';

export const UPDATE_TRACKER_DEVICE_ACTION = '[TrackerDevice] Update Tracker Device Action';
export const UPDATE_TRACKER_DEVICE_COMPLETE_ACTION = '[TrackerDevice] Update Tracker Device Complete Action';
export const UPDATE_TRACKER_DEVICE_FAILED_ACTION = '[TrackerDevice] Update Tracker Device Failed Action';

export const DELETE_TRACKER_DEVICE_ACTION = '[TrackerDevice] Delete Tracker Device Action';
export const DELETE_TRACKER_DEVICE_COMPLETE_ACTION = '[TrackerDevice] Delete Tracker Device Complete Action';
export const DELETE_TRACKER_DEVICE_FAILED_ACTION = '[TrackerDevice] Delete Tracker Device Failed Action';

export const TRANSFER_TRACKER_DEVICE_ACTION = '[TrackerDevice] Transfer Tracker Device Action';
export const TRANSFER_TRACKER_DEVICE_COMPLETE_ACTION = '[TrackerDevice] Transfer Tracker Device Complete Action';
export const TRANSFER_TRACKER_DEVICE_FAILED_ACTION = '[TrackerDevice] Transfer Tracker Device Failed Action';

export const FETCH_TRACKER_DEVICE_TRANSFER_FORMDATA_ACTION = '[TrackerDevice] Fetch TrackerDevice Transfer Form Data Action';
export const FETCH_TRACKER_DEVICE_TRANSFER_FORMDATA_COMPLETE_ACTION =
  '[TrackerDevice] Fetch TrackerDevice Transfer Form Data Complete Action';
export const FETCH_TRACKER_DEVICE_TRANSFER_FORMDATA_FAILED_ACTION = '[TrackerDevice] Fetch TrackerDevice Transfer Form Data Failed Action';

export const CLEAR_TRACKER_DEVICE_DATA_ACTION = '[TrackerDevice] Clear TrackerDevice Data Action';

export class FetchAllTrackerDevicesAction implements Action {
  readonly type = FETCH_ALL_TRACKER_DEVICES_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching devices...'
    });
    toast.showLoading();
  }
}

export class FetchAllTrackerDevicesCompleteAction implements Action {
  readonly type = FETCH_ALL_TRACKER_DEVICES_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'TrackerDevice list loaded!'
    });
  }
}

export class FetchAllTrackerDevicesFailedAction implements Action {
  readonly type = FETCH_ALL_TRACKER_DEVICES_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchTrackerDeviceAction implements Action {
  readonly type = FETCH_TRACKER_DEVICE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching device...'
    });
    toast.showLoading();
  }
}

export class FetchTrackerDeviceCompleteAction implements Action {
  readonly type = FETCH_TRACKER_DEVICE_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'TrackerDevice data loaded!'
    });
  }
}

export class FetchTrackerDeviceFailedAction implements Action {
  readonly type = FETCH_TRACKER_DEVICE_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class CreateTrackerDeviceAction implements Action {
  readonly type = CREATE_TRACKER_DEVICE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Adding devices...'
    });
    toast.showLoading();
  }
}

export class CreateTrackerDeviceCompleteAction implements Action {
  readonly type = CREATE_TRACKER_DEVICE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'TrackerDevices added!'
    });
  }
}

export class CreateTrackerDeviceFailedAction implements Action {
  readonly type = CREATE_TRACKER_DEVICE_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class UpdateTrackerDeviceAction implements Action {
  readonly type = UPDATE_TRACKER_DEVICE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Updating device...'
    });
    toast.showLoading();
  }
}

export class UpdateTrackerDeviceCompleteAction implements Action {
  readonly type = UPDATE_TRACKER_DEVICE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'TrackerDevice updated!'
    });
  }
}

export class UpdateTrackerDeviceFailedAction implements Action {
  readonly type = UPDATE_TRACKER_DEVICE_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class DeleteTrackerDeviceAction implements Action {
  readonly type = DELETE_TRACKER_DEVICE_ACTION;
  constructor() {
    toast({
      title: 'Deleting device...'
    });
    toast.showLoading();
  }
}

export class DeleteTrackerDeviceCompleteAction implements Action {
  readonly type = DELETE_TRACKER_DEVICE_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'TrackerDevice deleted!'
    });
  }
}

export class DeleteTrackerDeviceFailedAction implements Action {
  readonly type = DELETE_TRACKER_DEVICE_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class TransferTrackerDevicesAction implements Action {
  readonly type = TRANSFER_TRACKER_DEVICE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Transferring devices...'
    });
    toast.showLoading();
  }
}

export class TransferTrackerDevicesCompleteAction implements Action {
  readonly type = TRANSFER_TRACKER_DEVICE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'TrackerDevices transferred!'
    });
  }
}

export class TransferTrackerDevicesFailedAction implements Action {
  readonly type = TRANSFER_TRACKER_DEVICE_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchTrackerDeviceTransferFormDataAction implements Action {
  readonly type = FETCH_TRACKER_DEVICE_TRANSFER_FORMDATA_ACTION;
  constructor() {
    toast({
      title: 'Fetching device transfer data...'
    });
    toast.showLoading();
  }
}

export class FetchTrackerDeviceTransferFormDataCompleteAction implements Action {
  readonly type = FETCH_TRACKER_DEVICE_TRANSFER_FORMDATA_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'TrackerDevice transfer data loaded!'
    });
  }
}

export class FetchTrackerDeviceTransferFormDataFailedAction implements Action {
  readonly type = FETCH_TRACKER_DEVICE_TRANSFER_FORMDATA_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class ClearTrackerDeviceDataAction implements Action {
  readonly type = CLEAR_TRACKER_DEVICE_DATA_ACTION;
}

export type Actions =
  FetchAllTrackerDevicesAction
  | FetchAllTrackerDevicesCompleteAction
  | FetchAllTrackerDevicesFailedAction
  | FetchTrackerDeviceAction
  | FetchTrackerDeviceCompleteAction
  | FetchTrackerDeviceFailedAction
  | CreateTrackerDeviceAction
  | CreateTrackerDeviceCompleteAction
  | CreateTrackerDeviceFailedAction
  | UpdateTrackerDeviceAction
  | UpdateTrackerDeviceCompleteAction
  | UpdateTrackerDeviceFailedAction
  | DeleteTrackerDeviceAction
  | DeleteTrackerDeviceCompleteAction
  | DeleteTrackerDeviceFailedAction
  | TransferTrackerDevicesAction
  | TransferTrackerDevicesCompleteAction
  | TransferTrackerDevicesFailedAction
  | ClearTrackerDeviceDataAction
  | FetchTrackerDeviceTransferFormDataAction
  | FetchTrackerDeviceTransferFormDataCompleteAction
  | FetchTrackerDeviceTransferFormDataFailedAction;
