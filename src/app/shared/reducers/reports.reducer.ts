import * as reportActions from '../actions/reports.actions';
import { User } from '../models';

export interface State {
  poSummary: any[];
  distributors: User[]
}

const initialState: State = {
  poSummary: [],
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
        distributors: []
      });
    case reportActions.FETCH_PO_SUMMARY_MFG_FORM_DATA_COMPLETE_ACTION:
      return Object.assign({}, state, {
        distributors: [...action.payload.distributors.filter(user => new User(user))]
      });
    default:
      return state;
  }
}
