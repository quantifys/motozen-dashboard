import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

const toast = (swal as any).mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000
});

export const FETCH_ALL_DEVICES_ACTION = '[Device] Fetch All Devices Action';
export const FETCH_ALL_DEVICES_COMPLETE_ACTION = '[Device] Fetch All Devices Complete Action';
export const FETCH_ALL_DEVICES_FAILED_ACTION = '[Device] Fetch All Devices Failed Action';

export const FETCH_DEVICE_ACTION = '[Device] Fetch Device Action';
export const FETCH_DEVICE_COMPLETE_ACTION = '[Device] Fetch Device Complete Action';
export const FETCH_DEVICE_FAILED_ACTION = '[Device] Fetch Device Failed Action';

export const FETCH_DEVICE_NEW_ACTION = '[Device] Fetch Device New Action';
export const FETCH_DEVICE_NEW_COMPLETE_ACTION = '[Device] Fetch Device New Complete Action';
export const FETCH_DEVICE_NEW_FAILED_ACTION = '[Device] Fetch Device New Failed Action';

export const CREATE_DEVICE_ACTION = '[Device] Create Device Action';
export const CREATE_DEVICE_COMPLETE_ACTION = '[Device] Create Device Complete Action';
export const CREATE_DEVICE_FAILED_ACTION = '[Device] Create Device Failed Action';

export const UPDATE_DEVICE_ACTION = '[Device] Update Device Action';
export const UPDATE_DEVICE_COMPLETE_ACTION = '[Device] Update Device Complete Action';
export const UPDATE_DEVICE_FAILED_ACTION = '[Device] Update Device Failed Action';

export const DELETE_DEVICE_ACTION = '[Device] Delete Device Action';
export const DELETE_DEVICE_COMPLETE_ACTION = '[Device] Delete Device Complete Action';
export const DELETE_DEVICE_FAILED_ACTION = '[Device] Delete Device Failed Action';

export const TRANSFER_DEVICE_ACTION = '[Device] Transfer Device Action';
export const TRANSFER_DEVICE_COMPLETE_ACTION = '[Device] Transfer Device Complete Action';
export const TRANSFER_DEVICE_FAILED_ACTION = '[Device] Transfer Device Failed Action';

export const FETCH_DEVICE_TRANSFER_FORMDATA_ACTION = '[Device] Fetch Device Transfer Form Data Action';
export const FETCH_DEVICE_TRANSFER_FORMDATA_COMPLETE_ACTION = '[Device] Fetch Device Transfer Form Data Complete Action';
export const FETCH_DEVICE_TRANSFER_FORMDATA_FAILED_ACTION = '[Device] Fetch Device Transfer Form Data Failed Action';

export const CLEAR_DEVICE_DATA_ACTION = '[Device] Clear Device Data Action';

export class FetchAllDevicesAction implements Action {
  readonly type = FETCH_ALL_DEVICES_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching devices...'
    });
    toast.showLoading();
  }
}

export class FetchAllDevicesCompleteAction implements Action {
  readonly type = FETCH_ALL_DEVICES_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Device list loaded!'
    });
  }
}

export class FetchAllDevicesFailedAction implements Action {
  readonly type = FETCH_ALL_DEVICES_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchDeviceAction implements Action {
  readonly type = FETCH_DEVICE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching device...'
    });
    toast.showLoading();
  }
}

export class FetchDeviceCompleteAction implements Action {
  readonly type = FETCH_DEVICE_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'Device data loaded!'
    });
  }
}

export class FetchDeviceFailedAction implements Action {
  readonly type = FETCH_DEVICE_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchDeviceNewAction implements Action {
  readonly type = FETCH_DEVICE_NEW_ACTION;
  constructor() {
    toast({
      title: 'Fetching form data...'
    });
    toast.showLoading();
  }
}

export class FetchDeviceNewCompleteAction implements Action {
  readonly type = FETCH_DEVICE_NEW_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'Device form data loaded!'
    });
  }
}

export class FetchDeviceNewFailedAction implements Action {
  readonly type = FETCH_DEVICE_NEW_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class CreateDeviceAction implements Action {
  readonly type = CREATE_DEVICE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Adding devices...'
    });
    toast.showLoading();
  }
}

export class CreateDeviceCompleteAction implements Action {
  readonly type = CREATE_DEVICE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Devices added!'
    });
  }
}

export class CreateDeviceFailedAction implements Action {
  readonly type = CREATE_DEVICE_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class UpdateDeviceAction implements Action {
  readonly type = UPDATE_DEVICE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Updating device...'
    });
    toast.showLoading();
  }
}

export class UpdateDeviceCompleteAction implements Action {
  readonly type = UPDATE_DEVICE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Device updated!'
    });
  }
}

export class UpdateDeviceFailedAction implements Action {
  readonly type = UPDATE_DEVICE_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class DeleteDeviceAction implements Action {
  readonly type = DELETE_DEVICE_ACTION;
  constructor() {
    toast({
      title: 'Deleting device...'
    });
    toast.showLoading();
  }
}

export class DeleteDeviceCompleteAction implements Action {
  readonly type = DELETE_DEVICE_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'Device deleted!'
    });
  }
}

export class DeleteDeviceFailedAction implements Action {
  readonly type = DELETE_DEVICE_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class TransferDevicesAction implements Action {
  readonly type = TRANSFER_DEVICE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Transferring devices...'
    });
    toast.showLoading();
  }
}

export class TransferDevicesCompleteAction implements Action {
  readonly type = TRANSFER_DEVICE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Devices transferred!'
    });
  }
}

export class TransferDevicesFailedAction implements Action {
  readonly type = TRANSFER_DEVICE_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchDeviceTransferFormDataAction implements Action {
  readonly type = FETCH_DEVICE_TRANSFER_FORMDATA_ACTION;
  constructor() {
    toast({
      title: 'Fetching device transfer data...'
    });
    toast.showLoading();
  }
}

export class FetchDeviceTransferFormDataCompleteAction implements Action {
  readonly type = FETCH_DEVICE_TRANSFER_FORMDATA_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Device transfer data loaded!'
    });
  }
}

export class FetchDeviceTransferFormDataFailedAction implements Action {
  readonly type = FETCH_DEVICE_TRANSFER_FORMDATA_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class ClearDeviceDataAction implements Action {
  readonly type = CLEAR_DEVICE_DATA_ACTION;
}

export type Actions =
  FetchAllDevicesAction
  | FetchAllDevicesCompleteAction
  | FetchAllDevicesFailedAction
  | FetchDeviceAction
  | FetchDeviceCompleteAction
  | FetchDeviceFailedAction
  | FetchDeviceNewAction
  | FetchDeviceNewCompleteAction
  | FetchDeviceNewFailedAction
  | CreateDeviceAction
  | CreateDeviceCompleteAction
  | CreateDeviceFailedAction
  | UpdateDeviceAction
  | UpdateDeviceCompleteAction
  | UpdateDeviceFailedAction
  | DeleteDeviceAction
  | DeleteDeviceCompleteAction
  | DeleteDeviceFailedAction
  | TransferDevicesAction
  | TransferDevicesCompleteAction
  | TransferDevicesFailedAction
  | ClearDeviceDataAction
  | FetchDeviceTransferFormDataAction
  | FetchDeviceTransferFormDataCompleteAction
  | FetchDeviceTransferFormDataFailedAction;
