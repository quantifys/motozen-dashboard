import { Action } from "@ngrx/store";
import swal from "sweetalert2";
import { User } from "../models/index";

const toast = (swal as any).mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000
});

export const LOGIN_USER_ACTION = "[User] Login User Action";
export const LOGIN_USER_COMPLETE_ACTION = "[User] Login User Complete Action";
export const LOGIN_USER_FAILURE_ACTION = "[User] Login User Failure Action";

export const VALIDATE_USER_TOKEN_ACTION = "[User] Validate User Token Action";
export const VALIDATE_USER_TOKEN_COMPLETE_ACTION = "[User] Validate User Token Complete Action";
export const VALIDATE_USER_TOKEN_FAILED_ACTION = "[User] Validate User Token Failed Action";

export const SIGNOUT_USER_ACTION = "[User] Signout User";
export const SIGNOUT_USER_COMPLETE_ACTION = "[User] Signout User Complete";
export const SIGNOUT_USER_FAILED_ACTION = "[User] Signout User Failed";

export const CREATE_NEW_USER_ACTION = "[User] Create New User Action";
export const CREATE_NEW_USER_COMPLETE_ACTION = "[User] Create New User Complete Action";
export const CREATE_NEW_USER_FAILED_ACTION = "[User] Create New User Failed Action";

export const UPDATE_USER_ACTION = "[User] Update User Action";
export const UPDATE_USER_COMPLETE_ACTION = "[User] Update User Complete Action";
export const UPDATE_USER_FAILED_ACTION = "[User] Update User Failed Action";

export const DELETE_USER_ACTION = "[User] Delete User Action";
export const DELETE_USER_COMPLETE_ACTION = "[User] Delete User Complete Action";
export const DELETE_USER_FAILED_ACTION = "[User] Delete User Failed Action";

export const FETCH_ALL_USERS_ACTION = "[User] Fetch All Users Action";
export const FETCH_ALL_USERS_COMPLETE_ACTION = "[User] Fetch All Users Complete Action";
export const FETCH_ALL_USERS_FAILED_ACTION = "[User] Fetch All Users Failed Action";

export const FETCH_USER_ACTION = "[User] Fetch User Action";
export const FETCH_USER_COMPLETE_ACTION = "[User] Fetch User Complete Action";
export const FETCH_USER_FAILED_ACTION = "[User] Fetch User Failed Action";

export const CLEAR_CURRENT_USER_ACTION = "[User] Clear Current User Action";

export class LoginUserAction implements Action {
  readonly type = LOGIN_USER_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Logging in...'
    });
    toast.showLoading();
  }
}

export class LoginUserCompleteAction implements Action {
  readonly type = LOGIN_USER_COMPLETE_ACTION;
  constructor(public payload: User) {
    toast({
      type: 'success',
      title: 'User logged in!'
    });
  }
}

export class LoginUserFailedAction implements Action {
  readonly type = LOGIN_USER_FAILURE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class ValidateUserTokenAction implements Action {
  readonly type = VALIDATE_USER_TOKEN_ACTION;
}

export class ValidateUserTokenCompleteAction implements Action {
  readonly type = VALIDATE_USER_TOKEN_COMPLETE_ACTION;
  constructor(public payload: any) { }
}

export class ValidateUserTokenFailedAction implements Action {
  readonly type = VALIDATE_USER_TOKEN_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class SignoutUserAction implements Action {
  readonly type = SIGNOUT_USER_ACTION;
  constructor(public payload?: any) {
    toast({
      title: 'Signing out...'
    });
    toast.showLoading();
  }
}

export class SignoutUserCompleteAction implements Action {
  readonly type = SIGNOUT_USER_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'User signed out!'
    });
  }
}

export class SignoutUserFailedAction implements Action {
  readonly type = SIGNOUT_USER_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class CreateNewUserAction implements Action {
  readonly type = CREATE_NEW_USER_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Adding new user...'
    });
    toast.showLoading();
  }
}

export class CreateNewUserCompleteAction implements Action {
  readonly type = CREATE_NEW_USER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'User added!'
    });
  }
}

export class CreateNewUserFailedAction implements Action {
  readonly type = CREATE_NEW_USER_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class UpdateUserAction implements Action {
  readonly type = UPDATE_USER_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Updating user...'
    });
    toast.showLoading();
  }
}

export class UpdateUserCompleteAction implements Action {
  readonly type = UPDATE_USER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'User updated!'
    });
  }
}

export class UpdateUserFailedAction implements Action {
  readonly type = UPDATE_USER_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class DeleteUserAction implements Action {
  readonly type = DELETE_USER_ACTION;
  constructor() {
    toast({
      title: 'Deleting user...'
    });
    toast.showLoading();
  }
}

export class DeleteUserCompleteAction implements Action {
  readonly type = DELETE_USER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'User deleted!'
    });
  }
}

export class DeleteUserFailedAction implements Action {
  readonly type = DELETE_USER_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchAllUsersAction implements Action {
  readonly type = FETCH_ALL_USERS_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching users...'
    });
    toast.showLoading();
  }
}

export class FetchAllUsersCompleteAction implements Action {
  readonly type = FETCH_ALL_USERS_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Users fetched!'
    });
  }
}

export class FetchAllUsersFailedAction implements Action {
  readonly type = FETCH_ALL_USERS_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchUserAction implements Action {
  readonly type = FETCH_USER_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching user...'
    });
    toast.showLoading();
  }
}

export class FetchUserCompleteAction implements Action {
  readonly type = FETCH_USER_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'User fetched!'
    });
  }
}

export class FetchUserFailedAction implements Action {
  readonly type = FETCH_USER_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class ClearCurrentUserAction implements Action {
  readonly type = CLEAR_CURRENT_USER_ACTION;
}

export type Actions =
  LoginUserAction
  | LoginUserCompleteAction
  | LoginUserFailedAction
  | ValidateUserTokenAction
  | ValidateUserTokenCompleteAction
  | ValidateUserTokenFailedAction
  | SignoutUserAction
  | SignoutUserCompleteAction
  | SignoutUserFailedAction
  | CreateNewUserAction
  | CreateNewUserCompleteAction
  | CreateNewUserFailedAction
  | UpdateUserAction
  | UpdateUserCompleteAction
  | UpdateUserFailedAction
  | DeleteUserAction
  | DeleteUserCompleteAction
  | DeleteUserFailedAction
  | FetchAllUsersAction
  | FetchAllUsersCompleteAction
  | FetchAllUsersFailedAction
  | FetchUserAction
  | FetchUserCompleteAction
  | FetchUserFailedAction
  | ClearCurrentUserAction;