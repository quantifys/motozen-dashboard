import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

const toast = (swal as any).mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000
});

export const FETCH_ALL_CERTIFICATES_ACTION = '[Certificate] Fetch All Certificates Action';
export const FETCH_ALL_CERTIFICATES_COMPLETE_ACTION = '[Certificate] Fetch All Certificates Complete Action';
export const FETCH_ALL_CERTIFICATES_FAILED_ACTION = '[Certificate] Fetch All Certificates Failed Action';

export const FETCH_CERTIFICATE_ACTION = '[Certificate] Fetch Certificate Action';
export const FETCH_CERTIFICATE_COMPLETE_ACTION = '[Certificate] Fetch Certificate Complete Action';
export const FETCH_CERTIFICATE_FAILED_ACTION = '[Certificate] Fetch Certificate Failed Action';

export const ISSUE_CERTIFICATE_ACTION = '[Certificate] Issue Certificate Action';
export const ISSUE_CERTIFICATE_COMPLETE_ACTION = '[Certificate] Issue Certificate Complete Action';
export const ISSUE_CERTIFICATE_FAILED_ACTION = '[Certificate] Issue Certificate Failed Action';

export const FETCH_CREATE_CERTIFICATE_ACTION = '[Certificate] Fetch Create Certificate Action';
export const FETCH_CREATE_CERTIFICATE_COMPLETE_ACTION = '[Certificate] Fetch Create Certificate Complete Action';
export const FETCH_CREATE_CERTIFICATE_FAILED_ACTION = '[Certificate] Fetch Create Certificate Failed Action';

export const CREATE_CERTIFICATE_ACTION = '[Certificate] Create Certificate Action';
export const CREATE_CERTIFICATE_COMPLETE_ACTION = '[Certificate] Create Certificate Complete Action';
export const CREATE_CERTIFICATE_FAILED_ACTION = '[Certificate] Create Certificate Failed Action';

export const UPDATE_CERTIFICATE_ACTION = '[Certificate] Update Certificate Action';
export const UPDATE_CERTIFICATE_COMPLETE_ACTION = '[Certificate] Update Certificate Complete Action';
export const UPDATE_CERTIFICATE_FAILED_ACTION = '[Certificate] Update Certificate Failed Action';

export const DELETE_CERTIFICATE_ACTION = '[Certificate] Delete Certificate Action';
export const DELETE_CERTIFICATE_COMPLETE_ACTION = '[Certificate] Delete Certificate Complete Action';
export const DELETE_CERTIFICATE_FAILED_ACTION = '[Certificate] Delete Certificate Failed Action';

export const RENEW_CERTIFICATE_ACTION = '[Certificate] Renew Certificate Action';
export const RENEW_CERTIFICATE_COMPLETE_ACTION = '[Certificate] Renew Certificate Complete Action';
export const RENEW_CERTIFICATE_FAILED_ACTION = '[Certificate] Renew Certificate Failed Action';

export const FETCH_CERTIFICATE_FORMDATA_ACTION = '[Certificate] Fetch Certificate Form Data Action';
export const FETCH_CERTIFICATE_FORMDATA_COMPLETE_ACTION = '[Certificate] Fetch Certificate Form Data Complete Action';
export const FETCH_CERTIFICATE_FORMDATA_FAILED_ACTION = '[Certificate] Fetch Certificate Form Data Failed Action';

export const FETCH_CERTIFICATE_FILTER_FORMDATA_ACTION = '[Certificate] Fetch Certificate Filter Form Data Action';
export const FETCH_CERTIFICATE_FILTER_FORMDATA_COMPLETE_ACTION = '[Certificate] Fetch Certificate Filter Form Data Complete Action';
export const FETCH_CERTIFICATE_FILTER_FORMDATA_FAILED_ACTION = '[Certificate] Fetch Certificate Filter Form Data Failed Action';

export const FETCH_CERTIFICATE_CSV_REPORT_ACTION = '[Certificate] Fetch Certificate CSV Report Action';
export const FETCH_CERTIFICATE_CSV_REPORT_COMPLETE_ACTION = '[Certificate] Fetch Certificate CSV Report Complete Action';
export const FETCH_CERTIFICATE_CSV_REPORT_FAILED_ACTION = '[Certificate] Fetch Certificate CSV Report Failed Action';

export const CERTIFICATE_CHECK_UNIQUE_ACTION = '[Certificate] Certificate Check Unique Action';
export const CERTIFICATE_CHECK_UNIQUE_COMPLETE_ACTION = '[Certificate] Certificate Check Unique Complete Action';
export const CERTIFICATE_CHECK_UNIQUE_FAILED_ACTION = '[Certificate] Certificate Check Unique Failed Action';
export const CERTIFICATE_EDITED_ACTION = '[Certificate] Certificate Edited Action';

export const CLEAR_CERTIFICATE_DATA_ACTION = '[Certificate] Clear Certificate Data Action';

export class FetchAllCertificatesAction implements Action {
  readonly type = FETCH_ALL_CERTIFICATES_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching certificates...'
    });
    toast.showLoading();
  }
}

export class FetchAllCertificatesCompleteAction implements Action {
  readonly type = FETCH_ALL_CERTIFICATES_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Certificate list loaded!'
    });
  }
}

export class FetchAllCertificatesFailedAction implements Action {
  readonly type = FETCH_ALL_CERTIFICATES_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchCertificateAction implements Action {
  readonly type = FETCH_CERTIFICATE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching certificate...'
    });
    toast.showLoading();
  }
}

export class FetchCertificateCompleteAction implements Action {
  readonly type = FETCH_CERTIFICATE_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'Certificate loaded!'
    });
  }
}

export class FetchCertificateFailedAction implements Action {
  readonly type = FETCH_CERTIFICATE_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class IssueCertificateAction implements Action {
  readonly type = ISSUE_CERTIFICATE_ACTION;
  constructor(public payload?: any) {
    toast({
      title: 'Issuing certificate...'
    });
    toast.showLoading();
  }
}

export class IssueCertificateCompleteAction implements Action {
  readonly type = ISSUE_CERTIFICATE_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'Certificate issued!'
    });
  }
}

export class IssueCertificateFailedAction implements Action {
  readonly type = ISSUE_CERTIFICATE_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchCreateCertificateAction implements Action {
  readonly type = FETCH_CREATE_CERTIFICATE_ACTION;
  constructor(public payload?: any) {
    toast({
      title: 'Fetching certificate data...'
    });
    toast.showLoading();
  }
}

export class FetchCreateCertificateCompleteAction implements Action {
  readonly type = FETCH_CREATE_CERTIFICATE_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'Certificate data loaded!'
    });
  }
}

export class FetchCreateCertificateFailedAction implements Action {
  readonly type = FETCH_CREATE_CERTIFICATE_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class CreateCertificateAction implements Action {
  readonly type = CREATE_CERTIFICATE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Creating certificate...'
    });
    toast.showLoading();
  }
}

export class CreateCertificateCompleteAction implements Action {
  readonly type = CREATE_CERTIFICATE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Certificate created!'
    });
  }
}

export class CreateCertificateFailedAction implements Action {
  readonly type = CREATE_CERTIFICATE_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class UpdateCertificateAction implements Action {
  readonly type = UPDATE_CERTIFICATE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Updating certificate...'
    });
    toast.showLoading();
  }
}

export class UpdateCertificateCompleteAction implements Action {
  readonly type = UPDATE_CERTIFICATE_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'Certificate updated!'
    });
  }
}

export class UpdateCertificateFailedAction implements Action {
  readonly type = UPDATE_CERTIFICATE_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class DeleteCertificateAction implements Action {
  readonly type = DELETE_CERTIFICATE_ACTION;
  constructor(public payload?: any) {
    toast({
      title: 'Deleting certificate...'
    });
    toast.showLoading();
  }
}

export class DeleteCertificateCompleteAction implements Action {
  readonly type = DELETE_CERTIFICATE_COMPLETE_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'success',
      title: 'Certificate deleted!'
    });
  }
}

export class DeleteCertificateFailedAction implements Action {
  readonly type = DELETE_CERTIFICATE_FAILED_ACTION;
  constructor(public payload?: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class RenewCertificateAction implements Action {
  readonly type = RENEW_CERTIFICATE_ACTION;
  constructor(public payload?: any) {
    toast({
      title: 'Renewing certificate...'
    });
    toast.showLoading();
  }
}

export class RenewCertificateCompleteAction implements Action {
  readonly type = RENEW_CERTIFICATE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Certificate renewed!'
    });
  }
}

export class RenewCertificateFailedAction implements Action {
  readonly type = RENEW_CERTIFICATE_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchCertificateFormdataAction implements Action {
  readonly type = FETCH_CERTIFICATE_FORMDATA_ACTION;
  constructor(public payload: number) {
    toast({
      title: 'Fetching form data...'
    });
    toast.showLoading();
  }
}

export class FetchCertificateFormdataCompleteAction implements Action {
  readonly type = FETCH_CERTIFICATE_FORMDATA_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Form data loaded!'
    });
  }
}

export class FetchCertificateFormdataFailedAction implements Action {
  readonly type = FETCH_CERTIFICATE_FORMDATA_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchCertificateFilterFormdataAction implements Action {
  readonly type = FETCH_CERTIFICATE_FILTER_FORMDATA_ACTION;
  constructor() {
    toast({
      title: 'Fetching filter data...'
    });
    toast.showLoading();
  }
}

export class FetchCertificateFilterFormdataCompleteAction implements Action {
  readonly type = FETCH_CERTIFICATE_FILTER_FORMDATA_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Filter data loaded!'
    });
  }
}

export class FetchCertificateFilterFormdataFailedAction implements Action {
  readonly type = FETCH_CERTIFICATE_FILTER_FORMDATA_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchCertificateCSVReportAction implements Action {
  readonly type = FETCH_CERTIFICATE_CSV_REPORT_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching report data...'
    });
    toast.showLoading();
  }
}

export class FetchCertificateCSVReportCompleteAction implements Action {
  readonly type = FETCH_CERTIFICATE_CSV_REPORT_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: payload.length > 0 ? 'Report data loaded!' : 'No certificates found!'
    });
  }
}

export class FetchCertificateCSVReportFailedAction implements Action {
  readonly type = FETCH_CERTIFICATE_CSV_REPORT_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class CertificateCheckUniqueAction implements Action {
  readonly type = CERTIFICATE_CHECK_UNIQUE_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Verifying data...'
    });
    toast.showLoading();
  }
}

export class CertificateCheckUniqueCompleteAction implements Action {
  readonly type = CERTIFICATE_CHECK_UNIQUE_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Data verified!'
    });
  }
}

export class CertificateCheckUniqueFailedAction implements Action {
  readonly type = CERTIFICATE_CHECK_UNIQUE_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class CertificateEditedAction implements Action {
  readonly type = CERTIFICATE_EDITED_ACTION;
}

export class ClearCertificateDataAction implements Action {
  readonly type = CLEAR_CERTIFICATE_DATA_ACTION;
}

export type Actions =
  FetchAllCertificatesAction
  | FetchAllCertificatesCompleteAction
  | FetchAllCertificatesFailedAction
  | FetchCertificateAction
  | FetchCertificateCompleteAction
  | FetchCertificateFailedAction
  | IssueCertificateAction
  | IssueCertificateCompleteAction
  | IssueCertificateFailedAction
  | FetchCreateCertificateAction
  | FetchCreateCertificateCompleteAction
  | FetchCreateCertificateFailedAction
  | CreateCertificateAction
  | CreateCertificateCompleteAction
  | CreateCertificateFailedAction
  | UpdateCertificateAction
  | UpdateCertificateCompleteAction
  | UpdateCertificateFailedAction
  | DeleteCertificateAction
  | DeleteCertificateCompleteAction
  | DeleteCertificateFailedAction
  | RenewCertificateAction
  | RenewCertificateCompleteAction
  | RenewCertificateFailedAction
  | FetchCertificateFormdataAction
  | FetchCertificateFormdataCompleteAction
  | FetchCertificateFormdataFailedAction
  | FetchCertificateFilterFormdataAction
  | FetchCertificateFilterFormdataCompleteAction
  | FetchCertificateFilterFormdataFailedAction
  | FetchCertificateCSVReportAction
  | FetchCertificateCSVReportCompleteAction
  | FetchCertificateCSVReportFailedAction
  | CertificateCheckUniqueAction
  | CertificateCheckUniqueCompleteAction
  | CertificateCheckUniqueFailedAction
  | CertificateEditedAction
  | ClearCertificateDataAction;
