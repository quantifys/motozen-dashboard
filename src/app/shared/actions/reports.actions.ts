import { Action } from '@ngrx/store';
import swal from 'sweetalert2';

const toast = (swal as any).mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000
});

export const FETCH_PO_SUMMARY_MFG_ACTION = '[Inventory] Fetch PO Summary MFG Action';
export const FETCH_PO_SUMMARY_MFG_COMPLETE_ACTION = '[Inventory] Fetch PO Summary MFG Complete Action';
export const FETCH_PO_SUMMARY_MFG_FAILED_ACTION = '[Inventory] Fetch PO Summary MFG Failed Action';

export const FETCH_PO_SUMMARY_MFG_FORM_DATA_ACTION = '[Inventory] Fetch PO Summary MFG Form Data Action';
export const FETCH_PO_SUMMARY_MFG_FORM_DATA_COMPLETE_ACTION = '[Inventory] Fetch PO Summary MFG Form Data Complete Action';
export const FETCH_PO_SUMMARY_MFG_FORM_DATA_FAILED_ACTION = '[Inventory] Fetch PO Summary MFG Form Data Failed Action';

export const FETCH_STOCK_SUMMARY_ACTION = '[Inventory] Fetch Stock Summary Action';
export const FETCH_STOCK_SUMMARY_COMPLETE_ACTION = '[Inventory] Fetch Stock Summary Complete Action';
export const FETCH_STOCK_SUMMARY_FAILED_ACTION = '[Inventory] Fetch Stock Summary Failed Action';

export const FETCH_PO_DETAILS_REPORT_ACTION = '[Inventory] Fetch PO Details Report Action';
export const FETCH_PO_DETAILS_REPORT_COMPLETE_ACTION = '[Inventory] Fetch PO Details Report Complete Action';
export const FETCH_PO_DETAILS_REPORT_FAILED_ACTION = '[Inventory] Fetch PO Details Report Failed Action';

export const PO_SUMMARY_CLEAR_ACTION = '[Inventory] PO Summary Clear Action';

export class FetchPOSummaryMFGAction implements Action {
  readonly type = FETCH_PO_SUMMARY_MFG_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching report...'
    });
    toast.showLoading();
  }
}

export class FetchPOSummaryMFGCompleteAction implements Action {
  readonly type = FETCH_PO_SUMMARY_MFG_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Report loaded!'
    });
  }
}

export class FetchPOSummaryMFGFailedAction implements Action {
  readonly type = FETCH_PO_SUMMARY_MFG_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchPOSummaryMFGFormDataAction implements Action {
  readonly type = FETCH_PO_SUMMARY_MFG_FORM_DATA_ACTION;
  constructor() {
    toast({
      title: 'Fetching form data...'
    });
    toast.showLoading();
  }
}

export class FetchPOSummaryMFGFormDataCompleteAction implements Action {
  readonly type = FETCH_PO_SUMMARY_MFG_FORM_DATA_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Data loaded!'
    });
  }
}

export class FetchPOSummaryMFGFormDataFailedAction implements Action {
  readonly type = FETCH_PO_SUMMARY_MFG_FORM_DATA_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchStockSummaryAction implements Action {
  readonly type = FETCH_STOCK_SUMMARY_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching summary...'
    });
    toast.showLoading();
  }
}

export class FetchStockSummaryCompleteAction implements Action {
  readonly type = FETCH_STOCK_SUMMARY_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: 'Summary loaded!'
    });
  }
}

export class FetchStockSummaryFailedAction implements Action {
  readonly type = FETCH_STOCK_SUMMARY_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class FetchPODetailsReportAction implements Action {
  readonly type = FETCH_PO_DETAILS_REPORT_ACTION;
  constructor(public payload: any) {
    toast({
      title: 'Fetching report...'
    });
    toast.showLoading();
  }
}

export class FetchPODetailsReportCompleteAction implements Action {
  readonly type = FETCH_PO_DETAILS_REPORT_COMPLETE_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'success',
      title: payload.length > 0 ? 'Report data loaded!' : 'No purchase orders found!'
    });
  }
}

export class FetchPODetailsReportFailedAction implements Action {
  readonly type = FETCH_PO_DETAILS_REPORT_FAILED_ACTION;
  constructor(public payload: any) {
    toast({
      type: 'error',
      title: payload
    });
  }
}

export class POSummaryClearAction implements Action {
  readonly type = PO_SUMMARY_CLEAR_ACTION;
  constructor() {
  }
}

export type Actions =
  FetchPOSummaryMFGAction
  | FetchPOSummaryMFGCompleteAction
  | FetchPOSummaryMFGFailedAction
  | FetchPOSummaryMFGFormDataAction
  | FetchPOSummaryMFGFormDataCompleteAction
  | FetchPOSummaryMFGFormDataFailedAction
  | FetchStockSummaryAction
  | FetchStockSummaryCompleteAction
  | FetchStockSummaryFailedAction
  | FetchPODetailsReportAction
  | FetchPODetailsReportCompleteAction
  | FetchPODetailsReportFailedAction
  | POSummaryClearAction;