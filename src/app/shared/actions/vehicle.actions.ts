import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

const toast = (swal as any).mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000
});

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

export const UPDATE_VEHICLE_ICAT_ACTION = "[Vehicle] Update Vehicle Icat Action";
export const UPDATE_VEHICLE_ICAT_COMPLETE_ACTION = "[Vehicle] Update Vehicle Icat Complete Action";
export const UPDATE_VEHICLE_ICAT_FAILED_ACTION = "[Vehicle] Update Vehicle Icat Failed Action";

export const DELETE_VEHICLE_ICAT_ACTION = "[Vehicle] Delete Vehicle Icat Action";
export const DELETE_VEHICLE_ICAT_COMPLETE_ACTION = "[Vehicle] Delete Vehicle Icat Complete Action";
export const DELETE_VEHICLE_ICAT_FAILED_ACTION = "[Vehicle] Delete Vehicle Icat Failed Action";

export const CLEAR_VEHICLE_DATA_ACTION = "[Vehicle] Clear Vehicle Data Action";

export class FetchAllVehiclesAction implements Action {
  readonly type = FETCH_ALL_VEHICLES_ACTION;
  constructor(public payload?: any) {
    toast({
      title: 'Fetching vehicles...'
    });
    toast.showLoading();
  }
}

export class FetchAllVehiclesCompleteAction implements Action {
  readonly type = FETCH_ALL_VEHICLES_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Vehicle list loaded!'
    });
  }
}

export class FetchAllVehiclesFailedAction implements Action {
  readonly type = FETCH_ALL_VEHICLES_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchVehicleAction implements Action {
  readonly type = FETCH_VEHICLE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching vehicle...'
    });
    toast.showLoading();
  }
}

export class FetchVehicleCompleteAction implements Action {
  readonly type = FETCH_VEHICLE_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'Vehicle loaded!'
    });
  }
}

export class FetchVehicleFailedAction implements Action {
  readonly type = FETCH_VEHICLE_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class CreateVehicleAction implements Action {
  readonly type = CREATE_VEHICLE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Adding vehicle...'
    });
    toast.showLoading();
  }
}

export class CreateVehicleCompleteAction implements Action {
  readonly type = CREATE_VEHICLE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Vehicle added!'
    });
  }
}

export class CreateVehicleFailedAction implements Action {
  readonly type = CREATE_VEHICLE_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class UpdateVehicleAction implements Action {
  readonly type = UPDATE_VEHICLE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Updating vehicle...'
    });
    toast.showLoading();
  }
}

export class UpdateVehicleCompleteAction implements Action {
  readonly type = UPDATE_VEHICLE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Vehicle updated!'
    });
  }
}

export class UpdateVehicleFailedAction implements Action {
  readonly type = UPDATE_VEHICLE_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class DeleteVehicleAction implements Action {
  readonly type = DELETE_VEHICLE_ACTION;
  constructor() {
    toast({
      title: 'Deleting vehicle...'
    });
    toast.showLoading();
  }
}

export class DeleteVehicleCompleteAction implements Action {
  readonly type = DELETE_VEHICLE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Vehicle deleted!'
    });
  }
}

export class DeleteVehicleFailedAction implements Action {
  readonly type = DELETE_VEHICLE_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class DeleteVehicleIcatAction implements Action {
  readonly type = DELETE_VEHICLE_ICAT_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Deleting vehicle ICAT...'
    });
    toast.showLoading();
  }
}

export class DeleteVehicleIcatCompleteAction implements Action {
  readonly type = DELETE_VEHICLE_ICAT_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'Vehicle ICAT deleted!'
    });
  }
}

export class DeleteVehicleIcatFailedAction implements Action {
  readonly type = DELETE_VEHICLE_ICAT_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class UpdateVehicleIcatAction implements Action {
  readonly type = UPDATE_VEHICLE_ICAT_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Updating vehicle ICAT...'
    });
    toast.showLoading();
  }
}

export class UpdateVehicleIcatCompleteAction implements Action {
  readonly type = UPDATE_VEHICLE_ICAT_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Vehicle ICAT updated!'
    });
  }
}

export class UpdateVehicleIcatFailedAction implements Action {
  readonly type = UPDATE_VEHICLE_ICAT_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class ClearVehicleDataAction implements Action {
  readonly type = CLEAR_VEHICLE_DATA_ACTION;
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
  | DeleteVehicleFailedAction
  | DeleteVehicleIcatAction
  | DeleteVehicleIcatCompleteAction
  | DeleteVehicleIcatFailedAction
  | UpdateVehicleIcatAction
  | UpdateVehicleIcatCompleteAction
  | UpdateVehicleIcatFailedAction
  | ClearVehicleDataAction;