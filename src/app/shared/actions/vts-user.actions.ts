import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

const toast = (swal as any).mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000
});

export const FETCH_ALL_VTS_USERS_ACTION = '[VtsUser] Fetch All Vts Users Action';
export const FETCH_ALL_VTS_USERS_COMPLETE_ACTION = '[VtsUser] Fetch All Vts Users Complete Action';
export const FETCH_ALL_VTS_USERS_FAILED_ACTION = '[VtsUser] Fetch All Vts Users Failed Action';

export const FETCH_VTS_USER_ACTION = '[VtsUser] Fetch Vts User Action';
export const FETCH_VTS_USER_COMPLETE_ACTION = '[VtsUser] Fetch Vts User Complete Action';
export const FETCH_VTS_USER_FAILED_ACTION = '[VtsUser] Fetch Vts User Failed Action';

export const CREATE_VTS_USER_ACTION = '[VtsUser] Create Vts User Action';
export const CREATE_VTS_USER_COMPLETE_ACTION = '[VtsUser] Create Vts User Complete Action';
export const CREATE_VTS_USER_FAILED_ACTION = '[VtsUser] Create Vts User Failed Action';

export const UPDATE_VTS_USER_ACTION = '[VtsUser] Update Vts User Action';
export const UPDATE_VTS_USER_COMPLETE_ACTION = '[VtsUser] Update Vts User Complete Action';
export const UPDATE_VTS_USER_FAILED_ACTION = '[VtsUser] Update Vts User Failed Action';

export const DELETE_VTS_USER_ACTION = '[VtsUser] Delete Vts User Action';
export const DELETE_VTS_USER_COMPLETE_ACTION = '[VtsUser] Delete Vts User Complete Action';
export const DELETE_VTS_USER_FAILED_ACTION = '[VtsUser] Delete Vts User Failed Action';

export const CLEAR_VTS_USER_ACTION = '[VtsUser] Clear Vts User Action';

export class FetchAllVtsUsersAction implements Action {
  readonly type = FETCH_ALL_VTS_USERS_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching users...'
    });
    toast.showLoading();
  }
}

export class FetchAllVtsUsersCompleteAction implements Action {
  readonly type = FETCH_ALL_VTS_USERS_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'User list loaded!'
    });
  }
}

export class FetchAllVtsUsersFailedAction implements Action {
  readonly type = FETCH_ALL_VTS_USERS_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchVtsUserAction implements Action {
  readonly type = FETCH_VTS_USER_ACTION;
  constructor(public payload?: any) {
    toast({
      title: 'Loading user...'
    });
    toast.showLoading();
  }
}

export class FetchVtsUserCompleteAction implements Action {
  readonly type = FETCH_VTS_USER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'User loaded!'
    });
  }
}

export class FetchVtsUserFailedAction implements Action {
  readonly type = FETCH_VTS_USER_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class CreateVtsUserAction implements Action {
  readonly type = CREATE_VTS_USER_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Adding user...'
    });
    toast.showLoading();
  }
}

export class CreateVtsUserCompleteAction implements Action {
  readonly type = CREATE_VTS_USER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'User added!'
    });
  }
}

export class CreateVtsUserFailedAction implements Action {
  readonly type = CREATE_VTS_USER_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class UpdateVtsUserAction implements Action {
  readonly type = UPDATE_VTS_USER_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Updating user...'
    });
    toast.showLoading();
  }
}

export class UpdateVtsUserCompleteAction implements Action {
  readonly type = UPDATE_VTS_USER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'User updated!'
    });
  }
}

export class UpdateVtsUserFailedAction implements Action {
  readonly type = UPDATE_VTS_USER_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class DeleteVtsUserAction implements Action {
  readonly type = DELETE_VTS_USER_ACTION;
  constructor() {
    toast({
      title: 'Deleting user...'
    });
    toast.showLoading();
  }
}

export class DeleteVtsUserCompleteAction implements Action {
  readonly type = DELETE_VTS_USER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'User deleted!'
    });
  }
}

export class DeleteVtsUserFailedAction implements Action {
  readonly type = DELETE_VTS_USER_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class ClearVtsUserAction implements Action {
  readonly type = CLEAR_VTS_USER_ACTION;
}

export type Actions =
  FetchAllVtsUsersAction
  | FetchAllVtsUsersCompleteAction
  | FetchAllVtsUsersFailedAction
  | FetchVtsUserAction
  | FetchVtsUserCompleteAction
  | FetchVtsUserFailedAction
  | CreateVtsUserAction
  | CreateVtsUserCompleteAction
  | CreateVtsUserFailedAction
  | UpdateVtsUserAction
  | UpdateVtsUserCompleteAction
  | UpdateVtsUserFailedAction
  | DeleteVtsUserAction
  | DeleteVtsUserCompleteAction
  | DeleteVtsUserFailedAction
  | ClearVtsUserAction;
