import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

export const FETCH_ALL_DEVICES_ACTION = '[Device] Fetch All Devices Action';
export const FETCH_ALL_DEVICES_COMPLETE_ACTION = '[Device] Fetch All Devices Complete Action';
export const FETCH_ALL_DEVICES_FAILED_ACTION = '[Device] Fetch All Devices Failed Action';

export const FETCH_DEVICE_ACTION = '[Device] Fetch Device Action';
export const FETCH_DEVICE_COMPLETE_ACTION = '[Device] Fetch Device Complete Action';
export const FETCH_DEVICE_FAILED_ACTION = '[Device] Fetch Device Failed Action';

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

export const OPEN_DEVICE_MODAL_ACTION = '[Device] Open Device Modal Action';
export const CLOSE_DEVICE_MODAL_ACTION = '[Device] Close Device Modal Action';

export class FetchAllDevicesAction implements Action {
  readonly type = FETCH_ALL_DEVICES_ACTION;
  constructor(public payload: any) {
  }
}

export class FetchAllDevicesCompleteAction implements Action {
  readonly type = FETCH_ALL_DEVICES_COMPLETE_ACTION;
  constructor(public payload: any) {
  }
}

export class FetchAllDevicesFailedAction implements Action {
  readonly type = FETCH_ALL_DEVICES_FAILED_ACTION;
  constructor(public payload?: any) { }
}

export class FetchDeviceAction implements Action {
  readonly type = FETCH_DEVICE_ACTION;
  constructor(public payload: any) { }
}

export class FetchDeviceCompleteAction implements Action {
  readonly type = FETCH_DEVICE_COMPLETE_ACTION;
  constructor(public payload?: any) { }
}

export class FetchDeviceFailedAction implements Action {
  readonly type = FETCH_DEVICE_FAILED_ACTION;
  constructor(public payload?: any) { }
}

export class CreateDeviceAction implements Action {
  readonly type = CREATE_DEVICE_ACTION;
  constructor(public payload:any) { }
}

export class CreateDeviceCompleteAction implements Action {
  readonly type = CREATE_DEVICE_COMPLETE_ACTION;
  constructor(public payload:any) {
    swal({
      title: "Device Created!",
      type: "success",
      timer: 3000,
      showConfirmButton: false
    });
  }
}

export class CreateDeviceFailedAction implements Action {
  readonly type = CREATE_DEVICE_FAILED_ACTION;
  constructor(public payload:any) {
    swal("There was an error.", payload, "error");
  }
}

export class UpdateDeviceAction implements Action {
  readonly type = UPDATE_DEVICE_ACTION;
  constructor(public payload: any) { }
}

export class UpdateDeviceCompleteAction implements Action {
  readonly type = UPDATE_DEVICE_COMPLETE_ACTION;
  constructor(public payload?: any) { }
}

export class UpdateDeviceFailedAction implements Action {
  readonly type = UPDATE_DEVICE_FAILED_ACTION;
  constructor(public payload?: any) { }
}

export class DeleteDeviceAction implements Action {
  readonly type = DELETE_DEVICE_ACTION;
  constructor(public payload: any) { }
}

export class DeleteDeviceCompleteAction implements Action {
  readonly type = DELETE_DEVICE_COMPLETE_ACTION;
  constructor(public payload?: any) { }
}

export class DeleteDeviceFailedAction implements Action {
  readonly type = DELETE_DEVICE_FAILED_ACTION;
  constructor(public payload?: any) { }
}

export class TransferDeviceAction implements Action {
  readonly type = TRANSFER_DEVICE_ACTION;
  constructor(public payload:any) { }
}

export class TransferDeviceCompleteAction implements Action {
  readonly type = TRANSFER_DEVICE_COMPLETE_ACTION;
  constructor(public payload:any) {
    swal({
      title: "Devices are transferred!",
      type: "success",
      timer: 3000,
      showConfirmButton: false
    });
  }
}

export class TransferDeviceFailedAction implements Action {
  readonly type = TRANSFER_DEVICE_FAILED_ACTION;
  constructor(public payload:any) {
    swal("There was an error transferring the device.", payload, "error");
  }
}

export type Actions =
  FetchAllDevicesAction
  | FetchAllDevicesCompleteAction
  | FetchAllDevicesFailedAction
  | FetchDeviceAction
  | FetchDeviceCompleteAction
  | FetchDeviceFailedAction
  | CreateDeviceAction
  | CreateDeviceCompleteAction
  | CreateDeviceFailedAction
  | UpdateDeviceAction
  | UpdateDeviceCompleteAction
  | UpdateDeviceFailedAction
  | DeleteDeviceAction
  | DeleteDeviceCompleteAction
  | DeleteDeviceFailedAction
  | TransferDeviceAction
  | TransferDeviceCompleteAction
  | TransferDeviceFailedAction;