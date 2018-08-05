import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

export const FETCH_ALL_VEHICLES_ACTION = '[Vehicle] Fetch All Vehicles Action';
export const FETCH_ALL_VEHICLES_COMPLETE_ACTION = '[Vehicle] Fetch All Vehicles Complete Action';
export const FETCH_ALL_VEHICLES_FAILED_ACTION = '[Vehicle] Fetch All Vehicles Failed Action';

export const FETCH_VEHICLE_ACTION = '[Vehicle] Fetch Vehicle Action';
export const FETCH_VEHICLE_COMPLETE_ACTION = '[Vehicle] Fetch Vehicle Complete Action';
export const FETCH_VEHICLE_FAILED_ACTION = '[Vehicle] Fetch Vehicle Failed Action';

export const CREATE_VEHICLE_ACTION = '[Vehicle] Create Vehicle Action';
export const CREATE_VEHICLE_COMPLETE_ACTION = '[Vehicle] Create Vehicle Complete Action';
export const CREATE_VEHICLE_FAILED_ACTION = '[Vehicle] Create Vehicle Failed Action';

export const UPDATE_VEHICLE_ACTION = '[Vehicle] Update Vehicle Action';
export const UPDATE_VEHICLE_COMPLETE_ACTION = '[Vehicle] Update Vehicle Complete Action';
export const UPDATE_VEHICLE_FAILED_ACTION = '[Vehicle] Update Vehicle Failed Action';

export const DELETE_VEHICLE_ACTION = '[Vehicle] Delete Vehicle Action';
export const DELETE_VEHICLE_COMPLETE_ACTION = '[Vehicle] Delete Vehicle Complete Action';
export const DELETE_VEHICLE_FAILED_ACTION = '[Vehicle] Delete Vehicle Failed Action';

export class FetchAllVehiclesAction implements Action {
  readonly type = FETCH_ALL_VEHICLES_ACTION;
  constructor(public payload: any) {
  }
}

export class FetchAllVehiclesCompleteAction implements Action {
  readonly type = FETCH_ALL_VEHICLES_COMPLETE_ACTION;
  constructor(public payload: any) {
  }
}

export class FetchAllVehiclesFailedAction implements Action {
  readonly type = FETCH_ALL_VEHICLES_FAILED_ACTION;
  constructor(public payload?: any) { }
}

export class FetchVehicleAction implements Action {
  readonly type = FETCH_VEHICLE_ACTION;
  constructor(public payload: any) { }
}

export class FetchVehicleCompleteAction implements Action {
  readonly type = FETCH_VEHICLE_COMPLETE_ACTION;
  constructor(public payload?: any) { }
}

export class FetchVehicleFailedAction implements Action {
  readonly type = FETCH_VEHICLE_FAILED_ACTION;
  constructor(public payload?: any) { }
}

export class CreateVehicleAction implements Action {
  readonly type = CREATE_VEHICLE_ACTION;
  constructor(public payload: any) { }
}

export class CreateVehicleCompleteAction implements Action {
  readonly type = CREATE_VEHICLE_COMPLETE_ACTION;
  constructor(public payload: any) {
    swal({
      title: "Vehicle Created!",
      type: "success",
      timer: 3000,
      showConfirmButton: false
    });
  }
}

export class CreateVehicleFailedAction implements Action {
  readonly type = CREATE_VEHICLE_FAILED_ACTION;
  constructor(public payload: any) {
    swal("There was an error.", payload, "error");
  }
}

export class UpdateVehicleAction implements Action {
  readonly type = UPDATE_VEHICLE_ACTION;
  constructor(public payload: any) { }
}

export class UpdateVehicleCompleteAction implements Action {
  readonly type = UPDATE_VEHICLE_COMPLETE_ACTION;
  constructor(public payload: any) {
    swal({
      title: "Vehicle Updated!",
      type: "success",
      timer: 3000,
      showConfirmButton: false
    });
  }
}

export class UpdateVehicleFailedAction implements Action {
  readonly type = UPDATE_VEHICLE_FAILED_ACTION;
  constructor(public payload?: any) {
    swal("There was an error.", payload, "error");
  }
}

export class DeleteVehicleAction implements Action {
  readonly type = DELETE_VEHICLE_ACTION;
  constructor(public payload: any) {
  }
}

export class DeleteVehicleCompleteAction implements Action {
  readonly type = DELETE_VEHICLE_COMPLETE_ACTION;
  constructor(public payload: any) {
    swal({
      title: "Vehicle Updated!",
      type: "success",
      timer: 3000,
      showConfirmButton: false
    });
  }
}

export class DeleteVehicleFailedAction implements Action {
  readonly type = DELETE_VEHICLE_FAILED_ACTION;
  constructor(public payload: any) {
    swal("There was an error.", payload, "error");
  }
}

export type Actions =
  FetchAllVehiclesAction
  | FetchAllVehiclesCompleteAction
  | FetchAllVehiclesFailedAction
  | FetchVehicleAction
  | FetchVehicleCompleteAction
  | FetchVehicleFailedAction
  | CreateVehicleAction
  | CreateVehicleCompleteAction
  | CreateVehicleFailedAction
  | UpdateVehicleAction
  | UpdateVehicleCompleteAction
  | UpdateVehicleFailedAction
  | DeleteVehicleAction
  | DeleteVehicleCompleteAction
  | DeleteVehicleFailedAction;