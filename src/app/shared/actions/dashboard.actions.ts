import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

const toast = (swal as any).mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000
});

export const FETCH_DASHBOARD_ACTION = '[Device] Fetch Dashboard Action';
export const FETCH_DASHBOARD_COMPLETE_ACTION = '[Device] Fetch Dashboard Complete Action';
export const FETCH_DASHBOARD_FAILED_ACTION = '[Device] Fetch Dashboard Failed Action';

export const FETCH_MFG_CERTIFICATE_GRAPH_DASHBOARD_ACTION = '[Device] Fetch MFG Certificate Graph Dashboard Action';
export const FETCH_MFG_CERTIFICATE_GRAPH_DASHBOARD_COMPLETE_ACTION = '[Device] Fetch MFG Certificate Graph Dashboard Complete Action';
export const FETCH_MFG_CERTIFICATE_GRAPH_DASHBOARD_FAILED_ACTION = '[Device] Fetch MFG Certificate Graph Dashboard Failed Action';

export const FETCH_MFG_CERTIFICATE_TABLE_DASHBOARD_ACTION = '[Device] Fetch MFG Certificate Table Dashboard Action';
export const FETCH_MFG_CERTIFICATE_TABLE_DASHBOARD_COMPLETE_ACTION = '[Device] Fetch MFG Certificate Table Dashboard Complete Action';
export const FETCH_MFG_CERTIFICATE_TABLE_DASHBOARD_FAILED_ACTION = '[Device] Fetch MFG Certificate Table Dashboard Failed Action';

export class FetchDashboardDataAction implements Action {
  readonly type = FETCH_DASHBOARD_ACTION;
  constructor() {
    toast({
      title: 'Fetching dashboard...'
    });
    toast.showLoading();
  }
}

export class FetchDashboardDataCompleteAction implements Action {
  readonly type = FETCH_DASHBOARD_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Dashboard data loaded!'
    });
  }
}

export class FetchDashboardDataFailedAction implements Action {
  readonly type = FETCH_DASHBOARD_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchMFGCertificateGraphDashboardDataAction implements Action {
  readonly type = FETCH_MFG_CERTIFICATE_GRAPH_DASHBOARD_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching data...'
    });
    toast.showLoading();
  }
}

export class FetchMFGCertificateGraphDashboardDataCompleteAction implements Action {
  readonly type = FETCH_MFG_CERTIFICATE_GRAPH_DASHBOARD_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Graph refreshed!'
    });
  }
}

export class FetchMFGCertificateGraphDashboardDataFailedAction implements Action {
  readonly type = FETCH_MFG_CERTIFICATE_GRAPH_DASHBOARD_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchMFGCertificateTableDashboardDataAction implements Action {
  readonly type = FETCH_MFG_CERTIFICATE_TABLE_DASHBOARD_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching data...'
    });
    toast.showLoading();
  }
}

export class FetchMFGCertificateTableDashboardDataCompleteAction implements Action {
  readonly type = FETCH_MFG_CERTIFICATE_TABLE_DASHBOARD_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Table refreshed!'
    });
  }
}

export class FetchMFGCertificateTableDashboardDataFailedAction implements Action {
  readonly type = FETCH_MFG_CERTIFICATE_TABLE_DASHBOARD_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export type Actions =
  FetchDashboardDataAction
  | FetchDashboardDataCompleteAction
  | FetchDashboardDataFailedAction
  | FetchMFGCertificateGraphDashboardDataAction
  | FetchMFGCertificateGraphDashboardDataCompleteAction
  | FetchMFGCertificateGraphDashboardDataFailedAction
  | FetchMFGCertificateTableDashboardDataAction
  | FetchMFGCertificateTableDashboardDataCompleteAction
  | FetchMFGCertificateTableDashboardDataFailedAction;
