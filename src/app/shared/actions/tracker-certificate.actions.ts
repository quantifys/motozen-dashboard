import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

const toast = (swal as any).mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000
});

export const FETCH_ALL_TRACKER_CERTIFICATES_ACTION = '[TrackerCertificate] Fetch All TrackerCertificates Action';
export const FETCH_ALL_TRACKER_CERTIFICATES_COMPLETE_ACTION = '[TrackerCertificate] Fetch All TrackerCertificates Complete Action';
export const FETCH_ALL_TRACKER_CERTIFICATES_FAILED_ACTION = '[TrackerCertificate] Fetch All TrackerCertificates Failed Action';

export const FETCH_TRACKER_CERTIFICATE_ACTION = '[TrackerCertificate] Fetch TrackerCertificate Action';
export const FETCH_TRACKER_CERTIFICATE_COMPLETE_ACTION = '[TrackerCertificate] Fetch TrackerCertificate Complete Action';
export const FETCH_TRACKER_CERTIFICATE_FAILED_ACTION = '[TrackerCertificate] Fetch TrackerCertificate Failed Action';

export const ISSUE_TRACKER_CERTIFICATE_ACTION = '[TrackerCertificate] Issue TrackerCertificate Action';
export const ISSUE_TRACKER_CERTIFICATE_COMPLETE_ACTION = '[TrackerCertificate] Issue TrackerCertificate Complete Action';
export const ISSUE_TRACKER_CERTIFICATE_FAILED_ACTION = '[TrackerCertificate] Issue TrackerCertificate Failed Action';

export const FETCH_CREATE_TRACKER_CERTIFICATE_ACTION = '[TrackerCertificate] Fetch Create TrackerCertificate Action';
export const FETCH_CREATE_TRACKER_CERTIFICATE_COMPLETE_ACTION = '[TrackerCertificate] Fetch Create TrackerCertificate Complete Action';
export const FETCH_CREATE_TRACKER_CERTIFICATE_FAILED_ACTION = '[TrackerCertificate] Fetch Create TrackerCertificate Failed Action';

export const CREATE_TRACKER_CERTIFICATE_ACTION = '[TrackerCertificate] Create TrackerCertificate Action';
export const CREATE_TRACKER_CERTIFICATE_COMPLETE_ACTION = '[TrackerCertificate] Create TrackerCertificate Complete Action';
export const CREATE_TRACKER_CERTIFICATE_FAILED_ACTION = '[TrackerCertificate] Create TrackerCertificate Failed Action';

export const UPDATE_TRACKER_CERTIFICATE_ACTION = '[TrackerCertificate] Update TrackerCertificate Action';
export const UPDATE_TRACKER_CERTIFICATE_COMPLETE_ACTION = '[TrackerCertificate] Update TrackerCertificate Complete Action';
export const UPDATE_TRACKER_CERTIFICATE_FAILED_ACTION = '[TrackerCertificate] Update TrackerCertificate Failed Action';

export const DELETE_TRACKER_CERTIFICATE_ACTION = '[TrackerCertificate] Delete TrackerCertificate Action';
export const DELETE_TRACKER_CERTIFICATE_COMPLETE_ACTION = '[TrackerCertificate] Delete TrackerCertificate Complete Action';
export const DELETE_TRACKER_CERTIFICATE_FAILED_ACTION = '[TrackerCertificate] Delete TrackerCertificate Failed Action';

export const RENEW_TRACKER_CERTIFICATE_ACTION = '[TrackerCertificate] Renew TrackerCertificate Action';
export const RENEW_TRACKER_CERTIFICATE_COMPLETE_ACTION = '[TrackerCertificate] Renew TrackerCertificate Complete Action';
export const RENEW_TRACKER_CERTIFICATE_FAILED_ACTION = '[TrackerCertificate] Renew TrackerCertificate Failed Action';

export const FETCH_TRACKER_CERTIFICATE_FORMDATA_ACTION = '[TrackerCertificate] Fetch TrackerCertificate Form Data Action';
export const FETCH_TRACKER_CERTIFICATE_FORMDATA_COMPLETE_ACTION = '[TrackerCertificate] Fetch TrackerCertificate Form Data Complete Action';
export const FETCH_TRACKER_CERTIFICATE_FORMDATA_FAILED_ACTION = '[TrackerCertificate] Fetch TrackerCertificate Form Data Failed Action';

export const FETCH_TRACKER_CERTIFICATE_FILTER_FORMDATA_ACTION
  = '[TrackerCertificate] Fetch TrackerCertificate Filter Form Data Action';
export const FETCH_TRACKER_CERTIFICATE_FILTER_FORMDATA_COMPLETE_ACTION
  = '[TrackerCertificate] Fetch TrackerCertificate Filter Form Data Complete Action';
export const FETCH_TRACKER_CERTIFICATE_FILTER_FORMDATA_FAILED_ACTION
  = '[TrackerCertificate] Fetch TrackerCertificate Filter Form Data Failed Action';

export const FETCH_TRACKER_CERTIFICATE_CSV_REPORT_ACTION = '[TrackerCertificate] Fetch TrackerCertificate CSV Report Action';
export const FETCH_TRACKER_CERTIFICATE_CSV_REPORT_COMPLETE_ACTION
  = '[TrackerCertificate] Fetch TrackerCertificate CSV Report Complete Action';
export const FETCH_TRACKER_CERTIFICATE_CSV_REPORT_FAILED_ACTION = '[TrackerCertificate] Fetch TrackerCertificate CSV Report Failed Action';

export const TRACKER_CERTIFICATE_CHECK_UNIQUE_ACTION = '[TrackerCertificate] TrackerCertificate Check Unique Action';
export const TRACKER_CERTIFICATE_CHECK_UNIQUE_COMPLETE_ACTION = '[TrackerCertificate] TrackerCertificate Check Unique Complete Action';
export const TRACKER_CERTIFICATE_CHECK_UNIQUE_FAILED_ACTION = '[TrackerCertificate] TrackerCertificate Check Unique Failed Action';
export const TRACKER_CERTIFICATE_EDITED_ACTION = '[TrackerCertificate] TrackerCertificate Edited Action';

export const CLEAR_TRACKER_CERTIFICATE_DATA_ACTION = '[TrackerCertificate] Clear TrackerCertificate Data Action';

export class FetchAllTrackerCertificatesAction implements Action {
  readonly type = FETCH_ALL_TRACKER_CERTIFICATES_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching certificates...'
    });
    toast.showLoading();
  }
}

export class FetchAllTrackerCertificatesCompleteAction implements Action {
  readonly type = FETCH_ALL_TRACKER_CERTIFICATES_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'TrackerCertificate list loaded!'
    });
  }
}

export class FetchAllTrackerCertificatesFailedAction implements Action {
  readonly type = FETCH_ALL_TRACKER_CERTIFICATES_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchTrackerCertificateAction implements Action {
  readonly type = FETCH_TRACKER_CERTIFICATE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching certificate...'
    });
    toast.showLoading();
  }
}

export class FetchTrackerCertificateCompleteAction implements Action {
  readonly type = FETCH_TRACKER_CERTIFICATE_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'TrackerCertificate loaded!'
    });
  }
}

export class FetchTrackerCertificateFailedAction implements Action {
  readonly type = FETCH_TRACKER_CERTIFICATE_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class IssueTrackerCertificateAction implements Action {
  readonly type = ISSUE_TRACKER_CERTIFICATE_ACTION;
  constructor(public payload?: any) {
    toast({
      title: 'Issuing certificate...'
    });
    toast.showLoading();
  }
}

export class IssueTrackerCertificateCompleteAction implements Action {
  readonly type = ISSUE_TRACKER_CERTIFICATE_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'TrackerCertificate issued!'
    });
  }
}

export class IssueTrackerCertificateFailedAction implements Action {
  readonly type = ISSUE_TRACKER_CERTIFICATE_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchCreateTrackerCertificateAction implements Action {
  readonly type = FETCH_CREATE_TRACKER_CERTIFICATE_ACTION;
  constructor(public payload?: any) {
    toast({
      title: 'Fetching certificate data...'
    });
    toast.showLoading();
  }
}

export class FetchCreateTrackerCertificateCompleteAction implements Action {
  readonly type = FETCH_CREATE_TRACKER_CERTIFICATE_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'TrackerCertificate data loaded!'
    });
  }
}

export class FetchCreateTrackerCertificateFailedAction implements Action {
  readonly type = FETCH_CREATE_TRACKER_CERTIFICATE_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class CreateTrackerCertificateAction implements Action {
  readonly type = CREATE_TRACKER_CERTIFICATE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Creating certificate...'
    });
    toast.showLoading();
  }
}

export class CreateTrackerCertificateCompleteAction implements Action {
  readonly type = CREATE_TRACKER_CERTIFICATE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'TrackerCertificate created!'
    });
  }
}

export class CreateTrackerCertificateFailedAction implements Action {
  readonly type = CREATE_TRACKER_CERTIFICATE_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class UpdateTrackerCertificateAction implements Action {
  readonly type = UPDATE_TRACKER_CERTIFICATE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Updating certificate...'
    });
    toast.showLoading();
  }
}

export class UpdateTrackerCertificateCompleteAction implements Action {
  readonly type = UPDATE_TRACKER_CERTIFICATE_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'TrackerCertificate updated!'
    });
  }
}

export class UpdateTrackerCertificateFailedAction implements Action {
  readonly type = UPDATE_TRACKER_CERTIFICATE_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class DeleteTrackerCertificateAction implements Action {
  readonly type = DELETE_TRACKER_CERTIFICATE_ACTION;
  constructor(public payload?: any) {
    toast({
      title: 'Deleting certificate...'
    });
    toast.showLoading();
  }
}

export class DeleteTrackerCertificateCompleteAction implements Action {
  readonly type = DELETE_TRACKER_CERTIFICATE_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'TrackerCertificate deleted!'
    });
  }
}

export class DeleteTrackerCertificateFailedAction implements Action {
  readonly type = DELETE_TRACKER_CERTIFICATE_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class RenewTrackerCertificateAction implements Action {
  readonly type = RENEW_TRACKER_CERTIFICATE_ACTION;
  constructor(public payload?: any) {
    toast({
      title: 'Renewing certificate...'
    });
    toast.showLoading();
  }
}

export class RenewTrackerCertificateCompleteAction implements Action {
  readonly type = RENEW_TRACKER_CERTIFICATE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'TrackerCertificate renewed!'
    });
  }
}

export class RenewTrackerCertificateFailedAction implements Action {
  readonly type = RENEW_TRACKER_CERTIFICATE_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchTrackerCertificateFormdataAction implements Action {
  readonly type = FETCH_TRACKER_CERTIFICATE_FORMDATA_ACTION;
  constructor(public payload: number) {
    toast({
      title: 'Fetching form data...'
    });
    toast.showLoading();
  }
}

export class FetchTrackerCertificateFormdataCompleteAction implements Action {
  readonly type = FETCH_TRACKER_CERTIFICATE_FORMDATA_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Form data loaded!'
    });
  }
}

export class FetchTrackerCertificateFormdataFailedAction implements Action {
  readonly type = FETCH_TRACKER_CERTIFICATE_FORMDATA_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchTrackerCertificateFilterFormdataAction implements Action {
  readonly type = FETCH_TRACKER_CERTIFICATE_FILTER_FORMDATA_ACTION;
  constructor() {
    toast({
      title: 'Fetching filter data...'
    });
    toast.showLoading();
  }
}

export class FetchTrackerCertificateFilterFormdataCompleteAction implements Action {
  readonly type = FETCH_TRACKER_CERTIFICATE_FILTER_FORMDATA_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Filter data loaded!'
    });
  }
}

export class FetchTrackerCertificateFilterFormdataFailedAction implements Action {
  readonly type = FETCH_TRACKER_CERTIFICATE_FILTER_FORMDATA_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchTrackerCertificateCSVReportAction implements Action {
  readonly type = FETCH_TRACKER_CERTIFICATE_CSV_REPORT_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching report data...'
    });
    toast.showLoading();
  }
}

export class FetchTrackerCertificateCSVReportCompleteAction implements Action {
  readonly type = FETCH_TRACKER_CERTIFICATE_CSV_REPORT_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: payload.length > 0 ? 'Report data loaded!' : 'No certificates found!'
    });
  }
}

export class FetchTrackerCertificateCSVReportFailedAction implements Action {
  readonly type = FETCH_TRACKER_CERTIFICATE_CSV_REPORT_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class TrackerCertificateCheckUniqueAction implements Action {
  readonly type = TRACKER_CERTIFICATE_CHECK_UNIQUE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Verifying data...'
    });
    toast.showLoading();
  }
}

export class TrackerCertificateCheckUniqueCompleteAction implements Action {
  readonly type = TRACKER_CERTIFICATE_CHECK_UNIQUE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Data verified!'
    });
  }
}

export class TrackerCertificateCheckUniqueFailedAction implements Action {
  readonly type = TRACKER_CERTIFICATE_CHECK_UNIQUE_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class TrackerCertificateEditedAction implements Action {
  readonly type = TRACKER_CERTIFICATE_EDITED_ACTION;
}

export class ClearTrackerCertificateDataAction implements Action {
  readonly type = CLEAR_TRACKER_CERTIFICATE_DATA_ACTION;
}

export type Actions =
  FetchAllTrackerCertificatesAction
  | FetchAllTrackerCertificatesCompleteAction
  | FetchAllTrackerCertificatesFailedAction
  | FetchTrackerCertificateAction
  | FetchTrackerCertificateCompleteAction
  | FetchTrackerCertificateFailedAction
  | IssueTrackerCertificateAction
  | IssueTrackerCertificateCompleteAction
  | IssueTrackerCertificateFailedAction
  | FetchCreateTrackerCertificateAction
  | FetchCreateTrackerCertificateCompleteAction
  | FetchCreateTrackerCertificateFailedAction
  | CreateTrackerCertificateAction
  | CreateTrackerCertificateCompleteAction
  | CreateTrackerCertificateFailedAction
  | UpdateTrackerCertificateAction
  | UpdateTrackerCertificateCompleteAction
  | UpdateTrackerCertificateFailedAction
  | DeleteTrackerCertificateAction
  | DeleteTrackerCertificateCompleteAction
  | DeleteTrackerCertificateFailedAction
  | RenewTrackerCertificateAction
  | RenewTrackerCertificateCompleteAction
  | RenewTrackerCertificateFailedAction
  | FetchTrackerCertificateFormdataAction
  | FetchTrackerCertificateFormdataCompleteAction
  | FetchTrackerCertificateFormdataFailedAction
  | FetchTrackerCertificateFilterFormdataAction
  | FetchTrackerCertificateFilterFormdataCompleteAction
  | FetchTrackerCertificateFilterFormdataFailedAction
  | FetchTrackerCertificateCSVReportAction
  | FetchTrackerCertificateCSVReportCompleteAction
  | FetchTrackerCertificateCSVReportFailedAction
  | TrackerCertificateCheckUniqueAction
  | TrackerCertificateCheckUniqueCompleteAction
  | TrackerCertificateCheckUniqueFailedAction
  | TrackerCertificateEditedAction
  | ClearTrackerCertificateDataAction;
