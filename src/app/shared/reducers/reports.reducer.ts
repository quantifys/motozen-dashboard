import * as reportActions from '../actions/reports.actions';
import { User } from '../models';

export interface State {
  poSummary: any[];
  poDetails: any[];
  stockSummary: any[];
  distributors: User[]
}

const initialState: State = {
  poSummary: [],
  poDetails: [],
  stockSummary: [],
  distributors: []
};

export function reducer(state = initialState, action: reportActions.Actions): State {
  switch (action.type) {
    case reportActions.FETCH_PO_SUMMARY_MFG_ACTION:
      return Object.assign({}, state, {
        poSummary: []
      });
    case reportActions.FETCH_PO_SUMMARY_MFG_COMPLETE_ACTION:
      return Object.assign({}, state, {
        poSummary: [...action.payload["po_summary"]]
      });
    case reportActions.FETCH_PO_SUMMARY_MFG_FAILED_ACTION:
      return Object.assign({}, state, {
        poSummary: []
      });
    case reportActions.FETCH_PO_SUMMARY_MFG_FORM_DATA_ACTION:
      return Object.assign({}, state, {
        poSummary: [],
        stockSummary: [],
        distributors: []
      });
    case reportActions.PO_SUMMARY_CLEAR_ACTION:
      return Object.assign({}, state, {
        poSummary: [],
        poDetails: [],
        stockSummary: [],
        distributors: []
      });
    case reportActions.FETCH_PO_SUMMARY_MFG_FORM_DATA_COMPLETE_ACTION:
      return Object.assign({}, state, {
        distributors: [...action.payload.distributors.filter(user => new User(user))]
      });
    case reportActions.FETCH_STOCK_SUMMARY_ACTION:
      return Object.assign({}, state, {
        stockSummary: []
      });
    case reportActions.FETCH_STOCK_SUMMARY_FAILED_ACTION:
      return Object.assign({}, state, {
        stockSummary: []
      });
    case reportActions.FETCH_STOCK_SUMMARY_COMPLETE_ACTION:
      return Object.assign({}, state, {
        stockSummary: [...action.payload["stock_summary"]]
      });
    case reportActions.FETCH_PO_DETAILS_REPORT_COMPLETE_ACTION:
      console.log(action.payload);
      return Object.assign({}, state, {
        poDetails: [...action.payload]
      });
    default:
      return state;
  }
}
