import { Action } from "@ngrx/store";
import swal from "sweetalert2";
import { User } from "../models/index";

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

export const OPEN_USER_MODAL_ACTION = "[User] Open User Modal Action";
export const CLOSE_USER_MODAL_ACTION = "[User] Close User Modal Action";

export class LoginUserAction implements Action {
  readonly type = LOGIN_USER_ACTION;
  constructor(public payload: any) { }
}

export class LoginUserCompleteAction implements Action {
  readonly type = LOGIN_USER_COMPLETE_ACTION;
  constructor(public payload: User) { }
}

export class LoginUserFailedAction implements Action {
  readonly type = LOGIN_USER_FAILURE_ACTION;
  constructor(public payload: any) {
    swal("Login failed.", "error");
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
    swal("User signed out!", "There was an error connecting to the server.", "info");
  }
}

export class SignoutUserAction implements Action {
  readonly type = SIGNOUT_USER_ACTION;
}

export class SignoutUserCompleteAction implements Action {
  readonly type = SIGNOUT_USER_COMPLETE_ACTION;
  constructor(public payload?: any) {
    swal("Signout Successful", "success");
  }
}

export class SignoutUserFailedAction implements Action {
  readonly type = SIGNOUT_USER_FAILED_ACTION;
  constructor(public payload: any) {
    swal("Signout failed!", "error");
  }
}

export class CreateNewUserAction implements Action {
  readonly type = CREATE_NEW_USER_ACTION;
  constructor(public payload: any) { }
}

export class CreateNewUserCompleteAction implements Action {
  readonly type = CREATE_NEW_USER_COMPLETE_ACTION;
  constructor(public payload: any) {
    swal('Great!', 'User was created!', 'success');
  }
}

export class CreateNewUserFailedAction implements Action {
  readonly type = CREATE_NEW_USER_FAILED_ACTION;
  constructor(public payload: any) {
    swal("Oops!!!", 'New user could not be created', 'error');
  }
}

export class UpdateUserAction implements Action {
  readonly type = UPDATE_USER_ACTION;
  constructor(public payload: any) { }
}

export class UpdateUserCompleteAction implements Action {
  readonly type = UPDATE_USER_COMPLETE_ACTION;
  constructor(public payload: any) {
    swal('Great!', 'User was updated.', 'success');
  }
}

export class UpdateUserFailedAction implements Action {
  readonly type = UPDATE_USER_FAILED_ACTION;
  constructor(public payload: any) {
    swal("There was an error.", payload, 'error');
  }
}

export class DeleteUserAction implements Action {
  readonly type = DELETE_USER_ACTION;
  constructor(public payload: any) { }
}

export class DeleteUserCompleteAction implements Action {
  readonly type = DELETE_USER_COMPLETE_ACTION;
  constructor(public payload: any) {
    swal('Great!', 'User was deleted.', 'success');
  }
}

export class DeleteUserFailedAction implements Action {
  readonly type = DELETE_USER_FAILED_ACTION;
  constructor(public payload: any) {
    swal("There was an error.", payload, 'error');
  }
}

export class FetchAllUsersAction implements Action {
  readonly type = FETCH_ALL_USERS_ACTION;
  constructor(public payload: any) { }
}

export class FetchAllUsersCompleteAction implements Action {
  readonly type = FETCH_ALL_USERS_COMPLETE_ACTION;
  constructor(public payload: any) { }
}

export class FetchAllUsersFailedAction implements Action {
  readonly type = FETCH_ALL_USERS_FAILED_ACTION;
  constructor(public payload: any) { }
}

export class FetchUserAction implements Action {
  readonly type = FETCH_USER_ACTION;
  constructor(public payload: any) { }
}

export class FetchUserCompleteAction implements Action {
  readonly type = FETCH_USER_COMPLETE_ACTION;
  constructor(public payload: any) { }
}

export class FetchUserFailedAction implements Action {
  readonly type = FETCH_USER_FAILED_ACTION;
  constructor(public payload: any) { }
}

export class OpenUserModalAction implements Action {
  readonly type = OPEN_USER_MODAL_ACTION;
}

export class CloseUserModalAction implements Action {
  readonly type = CLOSE_USER_MODAL_ACTION;
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
  | OpenUserModalAction
  | CloseUserModalAction;