import * as dashboardActions from '../actions/dashboard.actions';

export interface State {
  certificateChartData: any,
  certificateTableData: any
}

const initialState: State = {
  certificateChartData: null,
  certificateTableData: null
};

export function reducer(state = initialState, action: dashboardActions.Actions): State {
  switch (action.type) {
    case dashboardActions.FETCH_DASHBOARD_COMPLETE_ACTION:
      return Object.assign({}, state, {
        certificateChartData: action.payload["certificates_graph"],
        certificateTableData: action.payload["certificates_table"]
      });
    case dashboardActions.FETCH_MFG_CERTIFICATE_GRAPH_DASHBOARD_COMPLETE_ACTION:
      return Object.assign({}, state, {
        certificateChartData: action.payload["certificates_graph"],
      });
    default:
      return state;
  }
}
