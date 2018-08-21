import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

const toast = (swal as any).mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000
});

export const FETCH_ALL_RECEIVE_NOTES_ACTION = '[ReceiveNote] Fetch All Receive Notes Action';
export const FETCH_ALL_RECEIVE_NOTES_COMPLETE_ACTION = '[ReceiveNote] Fetch All Receive Notes Complete Action';
export const FETCH_ALL_RECEIVE_NOTES_FAILED_ACTION = '[ReceiveNote] Fetch All Receive Notes Failed Action';

export const FETCH_RECEIVE_NOTE_ACTION = '[ReceiveNote] Fetch Receive Note Action';
export const FETCH_RECEIVE_NOTE_COMPLETE_ACTION = '[ReceiveNote] Fetch Receive Note Complete Action';
export const FETCH_RECEIVE_NOTE_FAILED_ACTION = '[ReceiveNote] Fetch Receive Note Failed Action';

export const FETCH_RECEIVE_NOTE_FORM_DATA_ACTION = '[ReceiveNote] Fetch Receive Note Form Data Action';
export const FETCH_RECEIVE_NOTE_FORM_DATA_COMPLETE_ACTION = '[ReceiveNote] Fetch Receive Note Form Data Complete Action';
export const FETCH_RECEIVE_NOTE_FORM_DATA_FAILED_ACTION = '[ReceiveNote] Fetch Receive Note Form Data Failed Action';

export const CREATE_RECEIVE_NOTE_ACTION = '[ReceiveNote] Create Receive Note Action';
export const CREATE_RECEIVE_NOTE_COMPLETE_ACTION = '[ReceiveNote] Create Receive Note Complete Action';
export const CREATE_RECEIVE_NOTE_FAILED_ACTION = '[ReceiveNote] Create Receive Note Failed Action';

export const UPDATE_RECEIVE_NOTE_ACTION = '[ReceiveNote] Update Receive Note Action';
export const UPDATE_RECEIVE_NOTE_COMPLETE_ACTION = '[ReceiveNote] Update Receive Note Complete Action';
export const UPDATE_RECEIVE_NOTE_FAILED_ACTION = '[ReceiveNote] Update Receive Note Failed Action';

export const DELETE_RECEIVE_NOTE_ACTION = '[ReceiveNote] Delete Receive Note Action';
export const DELETE_RECEIVE_NOTE_COMPLETE_ACTION = '[ReceiveNote] Delete Receive Note Complete Action';
export const DELETE_RECEIVE_NOTE_FAILED_ACTION = '[ReceiveNote] Delete Receive Note Failed Action';

export const CONFIRM_RECEIVE_NOTE_ACTION = '[ReceiveNote] Confirm Receive Note Action';
export const CONFIRM_RECEIVE_NOTE_COMPLETE_ACTION = '[ReceiveNote] Confirm Receive Note Complete Action';
export const CONFIRM_RECEIVE_NOTE_FAILED_ACTION = '[ReceiveNote] Confirm Receive Note Failed Action';

export class FetchAllReceiveNotesAction implements Action {
  readonly type = FETCH_ALL_RECEIVE_NOTES_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Loading vendors...'
    });
    toast.showLoading();
  }
}

export class FetchAllReceiveNotesCompleteAction implements Action {
  readonly type = FETCH_ALL_RECEIVE_NOTES_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Receive Notes fetched!'
    });
  }
}

export class FetchAllReceiveNotesFailedAction implements Action {
  readonly type = FETCH_ALL_RECEIVE_NOTES_FAILED_ACTION;
  constructor(public payload: any) { }
}

export class FetchReceiveNoteAction implements Action {
  readonly type = FETCH_RECEIVE_NOTE_ACTION;
  constructor(public payload: any) { }
}

export class FetchReceiveNoteCompleteAction implements Action {
  readonly type = FETCH_RECEIVE_NOTE_COMPLETE_ACTION;
  constructor(public payload: any) { }
}

export class FetchReceiveNoteFailedAction implements Action {
  readonly type = FETCH_RECEIVE_NOTE_FAILED_ACTION;
  constructor(public payload: any) { }
}

export class FetchReceiveNoteFormDataAction implements Action {
  readonly type = FETCH_RECEIVE_NOTE_FORM_DATA_ACTION;
  constructor(public payload?: any) {
    toast({
      title: 'Loading form data...'
    });
    toast.showLoading();
  }
}

export class FetchReceiveNoteFormDataCompleteAction implements Action {
  readonly type = FETCH_RECEIVE_NOTE_FORM_DATA_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Form data loaded!'
    });
  }
}

export class FetchReceiveNoteFormDataFailedAction implements Action {
  readonly type = FETCH_RECEIVE_NOTE_FORM_DATA_FAILED_ACTION;
  constructor(public payload: any) { }
}

export class CreateReceiveNoteAction implements Action {
  readonly type = CREATE_RECEIVE_NOTE_ACTION;
  constructor(public payload: any) { }
}

export class CreateReceiveNoteCompleteAction implements Action {
  readonly type = CREATE_RECEIVE_NOTE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Receive Note added!'
    });
  }
}

export class CreateReceiveNoteFailedAction implements Action {
  readonly type = CREATE_RECEIVE_NOTE_FAILED_ACTION;
  constructor(public payload: any) {
    swal("There was an error.", payload, "error");
  }
}

export class UpdateReceiveNoteAction implements Action {
  readonly type = UPDATE_RECEIVE_NOTE_ACTION;
  constructor(public payload: any) { }
}

export class UpdateReceiveNoteCompleteAction implements Action {
  readonly type = UPDATE_RECEIVE_NOTE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Receive Note updated!'
    });
  }
}

export class UpdateReceiveNoteFailedAction implements Action {
  readonly type = UPDATE_RECEIVE_NOTE_FAILED_ACTION;
  constructor(public payload?: any) {
    swal("There was an error.", payload, "error");
  }
}

export class DeleteReceiveNoteAction implements Action {
  readonly type = DELETE_RECEIVE_NOTE_ACTION;
}

export class DeleteReceiveNoteCompleteAction implements Action {
  readonly type = DELETE_RECEIVE_NOTE_COMPLETE_ACTION;
  constructor() {
    toast({
      type: 'success',
      title: 'Receive Note deleted!'
    });
  }
}

export class DeleteReceiveNoteFailedAction implements Action {
  readonly type = DELETE_RECEIVE_NOTE_FAILED_ACTION;
  constructor(public payload: any) {
    swal("There was an error.", payload, "error");
  }
}

export class ConfirmReceiveNoteAction implements Action {
  readonly type = CONFIRM_RECEIVE_NOTE_ACTION;
}

export class ConfirmReceiveNoteCompleteAction implements Action {
  readonly type = CONFIRM_RECEIVE_NOTE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Receive Note confirmed!'
    });
  }
}

export class ConfirmReceiveNoteFailedAction implements Action {
  readonly type = CONFIRM_RECEIVE_NOTE_FAILED_ACTION;
  constructor(public payload: any) {
    swal("There was an error.", payload, "error");
  }
}

export type Actions =
  FetchAllReceiveNotesAction
  | FetchAllReceiveNotesCompleteAction
  | FetchAllReceiveNotesFailedAction
  | FetchReceiveNoteAction
  | FetchReceiveNoteCompleteAction
  | FetchReceiveNoteFailedAction
  | FetchReceiveNoteFormDataAction
  | FetchReceiveNoteFormDataCompleteAction
  | FetchReceiveNoteFormDataFailedAction
  | CreateReceiveNoteAction
  | CreateReceiveNoteCompleteAction
  | CreateReceiveNoteFailedAction
  | UpdateReceiveNoteAction
  | UpdateReceiveNoteCompleteAction
  | UpdateReceiveNoteFailedAction
  | DeleteReceiveNoteAction
  | DeleteReceiveNoteCompleteAction
  | DeleteReceiveNoteFailedAction
  | ConfirmReceiveNoteAction
  | ConfirmReceiveNoteCompleteAction
  | ConfirmReceiveNoteFailedAction;